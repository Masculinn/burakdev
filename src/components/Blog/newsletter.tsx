import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleX, Loader2 } from "lucide-react";
import MotionQueue from "../MotionProvider/motion-queue";
import { AnimationQueueAnimationProps } from "../MotionProvider/types";
import { useState } from "react";
import { db } from "@/db";
import { toast } from "sonner";

const title = "Stop Wasting Time. Get Code That Matters.".split(/\s+/);

const Newsletter = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubscribe = async () => {
    let res;
    setLoading(true);

    if (!isValidEmail(email)) {
      toast("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const { error: dbError } = await db.from("users").insert({ email });
      if (dbError) {
        console.error("Error subscribing:", dbError);
        res = "There was an error subscribing. Please try again later.";
      } else {
        res = "Success! Now you will get #justcodesession updates.";
        onClose();
        setEmail("");
      }
    } catch (err) {
      console.error("Unexpected error subscribing:", err);
      res = "There was an unexpected error. Please try again later.";
    } finally {
      setLoading(false);
      toast(res);
      return;
    }
  };

  return (
    <div
      className="relative lg:py-12 lg:px-16 lg:h-auto h-full bg-gray-50 flex items-center justify-center overflow-hidden rounded-xl lg:bg-center bg-bottom bg-no-repeat"
      style={{
        backgroundImage: "url(/assets/projects/nft-tree1.png)",
      }}
    >
      <button
        onClick={onClose}
        className="absolute z-[50] top-4 right-6 text-black"
      >
        <CircleX />
      </button>
      <div className="max-w-4xl mx-auto text-center relative">
        <div className="flex flex-wrap gap-1 max-w-xl self-center justify-center text-center mx-auto w-full">
          <MotionQueue
            elementType={"h2"}
            animations={
              Array.from({ length: title.length }).fill({
                mode: ["filterBlurIn", "fadeRight"],
                duration: 1,
                configView: { once: false, amount: 0.5 },
              }) as AnimationQueueAnimationProps[]
            }
            isDynamicallyQueued
            children={title}
            delayLogic="linear"
            className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight"
            duration={0.5}
          />
        </div>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          No fluff. No tutorials you’ve seen 100x. Just actionable code for devs
          who care. Get email updates on the latest tools and resources.{" "}
          <span className="font-bold">Totally free-forever.</span>
        </p>

        <div className="text-center mx-auto mb-12 max-w-lg px-4">
          <div className="relative">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Type your email"
              className="h-12 bg-white text-black border-none"
            />
            <Button
              size="sm"
              onClick={handleSubscribe}
              className="absolute  top-[6px] right-1 "
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
    </div>
  );
};

export default Newsletter;
