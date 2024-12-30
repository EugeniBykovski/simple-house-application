"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

const AdvertsBlock = () => {
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [_, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/session");
        if (!res.ok) {
          throw new Error("Failed to fetch session");
        }
        const session = await res.json();
        setUserId(session?.user?.id || null);
      } catch (err) {
        console.error("Error fetching session:", err);
        setError("Failed to load session");
      }
    };

    fetchSession();
  }, []);

  const handleSubmit = async () => {
    if (!message || !userId) {
      setError("User is not authenticated or message is empty");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/adverts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, content: message }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit message");
      }

      setMessage("");
      setError(null);

      setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch (error) {
      console.error("Failed to submit message:", error);
      setError("Failed to submit message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="py-2 px-3">
        <div className="flex flex-col justify-start text-left">
          <div className="mb-4">
            <h3 className="font-bold text-xl text-zinc-600">
              Here you can add your advert:
            </h3>
            <p className="text-xs text-zinc-400">
              (it will be available after moderation)
            </p>
          </div>
          <div className="flex justify-between items-center gap-4 w-[50%]">
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message..."
              disabled={loading}
            />
            <Button onClick={handleSubmit}>Send</Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdvertsBlock;
