"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AdvertsTextSliderProps {
  className?: string;
}

export const AdvertsTextSlider: FC<AdvertsTextSliderProps> = ({
  className,
}) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [_, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/adverts");
      if (!res.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await res.json();
      setMessages(data.map((msg: { content: string }) => msg.content));
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError("Failed to load messages");
    }
  }, []);

  useEffect(() => {
    fetchMessages();

    const interval = setInterval(fetchMessages, 60000);

    return () => clearInterval(interval);
  }, [fetchMessages]);

  return (
    <div
      className={`[mask-image:linear-gradient(to_right,transparent,black,transparent)] ${className}`}
    >
      <div className="flex overflow-hidden">
        <motion.div
          className="flex gap-4 flex-none pr-8"
          animate={{ translateX: "-50%" }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        >
          {messages.concat(messages).map((message, idx) => (
            <span key={idx} className="text-zinc-600 text-lg">
              {message}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
