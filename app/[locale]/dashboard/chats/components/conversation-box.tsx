"use client";

import { FC, useEffect, useState } from "react";
import { FullMessageType } from "@/types/chats";
import MessageBox from "./message-box";

interface ConversationBoxProps {
  initialMessages: FullMessageType[];
}

const ConversationBox: FC<ConversationBoxProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState<FullMessageType[]>(
    initialMessages || []
  );

  useEffect(() => {
    setMessages(initialMessages || []);
  }, [initialMessages]);

  return (
    <div className="w-full flex flex-col p-4 space-y-2 overflow-auto h-[37rem]">
      {messages.length > 0 ? (
        messages.map((msg, i) => (
          <MessageBox
            data={msg}
            key={msg.id}
            isLast={i === messages.length - 1}
          />
        ))
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500 text-sm">No messages in this chat.</p>
        </div>
      )}
    </div>
  );
};

export default ConversationBox;
