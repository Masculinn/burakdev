import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { EMAIL_REG, RATE_LIMIT_ENDLINE } from "@/constants/email.config";
import { useEmail } from "@/hooks/use-email";
import clientService from "@/utils/db";
import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function SubscribeForm() {
  const { attempt, count, reset, saveAttempt } = useEmail();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (!EMAIL_REG.test(email))
        throw new Error("Please enter a valid email address.|400");

      if (attempt > 0 && count !== RATE_LIMIT_ENDLINE)
        throw new Error(
          `Calm down champ — wait ${count} seconds before trying again.|429`,
        );

      const { error } = await clientService()
        .from("users")
        .insert({ email: email.toLowerCase() })
        .single();

      if (error) {
        throw new Error(`${error.message}|${error.code}`);
      }

      setEmail("");
      saveAttempt(attempt + 1);
      reset();

      return toast.success(
        `You have been successfully registered to the newsletter 🎉`,
        {
          position: "top-center",
          richColors: true,
        },
      );
    } catch (err) {
      const [msg, code] = (err as Error).message.trim().split("|");

      if (code === "23505") {
        return toast.warning("You are already in man, take it easy..", {
          position: "top-center",
          richColors: true,
        });
      }

      if (code === "400") {
        return toast.warning(msg, {
          position: "top-center",
          richColors: true,
        });
      }

      if (code === "429") {
        return toast.warning(msg, { position: "top-center", richColors: true });
      }

      return toast.warning("Operation failed due to internal server error.", {
        position: "top-center",
        richColors: true,
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex **:focus-visible:outline-none **:focus-visible:ring-0 md:flex-row flex-col md:px-0 px-4 md:gap-0 gap-2"
    >
      <Input
        value={email}
        required
        disabled={loading}
        about="email"
        id="email"
        onChange={({ target }) => setEmail(target.value)}
        placeholder="Type your email and get instant updates.."
        type="email"
        className="text-sm  md:rounded-r-none md:border-r-0"
      />
      <Button
        aria-label="submit button"
        type="submit"
        disabled={loading}
        className="mx-auto md:px-0 md:mt-0 px-4 mt-2 md:w-auto w-full md:rounded-l-none md:border-r-0"
      >
        {loading ? <Spinner /> : <Mail className="size-4" />}
        SUBMIT
      </Button>
    </form>
  );
}
