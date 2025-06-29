"use client";

import { FC } from "react";
import { SubscribeProps } from "./types/interfaces";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { db } from "@/db";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema for the email field
const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type SubscribeForm = z.infer<typeof subscribeSchema>;

const Subscribe: FC<SubscribeProps> = ({ className }) => {
  const isMobile = useIsMobile();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SubscribeForm>({
    resolver: zodResolver(subscribeSchema),
  });

  const onSubmit = async (data: SubscribeForm) => {
    try {
      const { count, error: countError } = await db
        .from("users")
        .select("id", { count: "exact", head: true })
        .eq("email", data.email);

      if (countError) {
        console.error("Error checking existing email:", countError);
        throw countError;
      }

      if (count && count > 0) {
        toast("This email is already registered.", {
          position: "bottom-right",
          richColors: true,
        });
        return;
      }

      const { error: insertError } = await db
        .from("users")
        .insert({ email: data.email });

      if (insertError) {
        console.error("Error inserting email:", insertError);
        throw insertError;
      }

      toast("Success! Now you will get #justcodesession updates.", {
        position: "bottom-right",
        richColors: true,
      });
      reset();
    } catch (err) {
      console.error("Unexpected error in subscribe flow:", err);
      toast("There was an error subscribing. Please try again later.", {
        position: "bottom-right",
        richColors: true,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`
        w-full 
        h-auto 
        flex 
        flex-col 
        items-center 
        justify-center 
        border 
        text-center 
        translate-y-4
        rounded-xl 
        md:p-8  p-6 py-16
        max-w-4xl 
        mx-auto 
        relative 
        dark:bg-gradient-to-b 
        bg-gradient-to-br  
        from-sky-100 
        via-transparent
        to-sky-50 
        dark:from-stone-900 
        dark:via-transparent  
        dark:to-sky-800 
        my-4
        ${className}
      `}
    >
      <h2 className="text-3xl font-bold tracking-tight">
        Stop Wasting Time. Get Code That Matters.
      </h2>
      <p className="pt-2 tracking-tighter max-w-xl">
        No fluff. No tutorials you’ve seen 100x. Just actionable code for devs
        who care. Get email updates on the latest tools and resources. Totally
        free-forever.
      </p>
      <div className="text-center mx-auto my-12 w-full px-4">
        <div className="relative">
          <Input
            {...register("email")}
            type="email"
            placeholder="Type your email address ex@gmail.com ..."
            className="h-12 bg-white ring-2  w-full dark:bg-transparent dark:text-white text-black lg:text-base text-xs border-none"
          />
          <Button
            size={isMobile ? "sm" : "lg"}
            type="submit"
            className="lg:absolute lg:top-[6px] right-1 w-full lg:w-auto mt-2 py-4 lg:mt-0 dark:bg-stone-800"
            variant="outline"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Subscribe Emails"
            )}
          </Button>
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm text-start mt-2">
            {errors.email.message}
          </p>
        )}
      </div>
    </form>
  );
};

export { Subscribe };
