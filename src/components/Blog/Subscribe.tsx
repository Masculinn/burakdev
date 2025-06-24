import { FC, useState } from "react";
import { SubscribeProps } from "./types/interfaces";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { db } from "@/db";
import { toast, useSonner } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

const Subscribe: FC<SubscribeProps> = ({ className }) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleEmailChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(target.value);
  };

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const { error } = await db.from("users").insert({ email });
      alert(JSON.stringify(error));
      if (error) {
        throw error;
      } else {
        toast("Success! Now you will get #justcodesession updates.", {
          position: "bottom-right",
          richColors: true,
        });
        setEmail("");
      }
    } catch (error) {
      console.error("Unexpected error subscribing:", error);
    } finally {
      setLoading(false);
    }
  };
  const isMobile = useIsMobile();

  return (
    <div
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
            value={email}
            onChange={handleEmailChange}
            type="email"
            placeholder="Type your email address ex@gmail.com ..."
            className="h-12 bg-white border-none w-full dark:bg-transparent dark:text-white text-black lg:text-base text-xs"
          />
          <Button
            size={isMobile ? "sm" : "lg"}
            onClick={handleSubscribe}
            className="lg:absolute lg:top-[6px] right-1  w-full lg:w-auto mt-2 py-4 lg:mt-0"
            variant={"outline"}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Subscribe Emails"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export { Subscribe };
