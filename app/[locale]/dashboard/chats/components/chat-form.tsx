"use client";

import { FC } from "react";
import useConversation from "@/hooks/use-conversation";
import axios from "axios";
import { Image, Send } from "lucide-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ChatMessageInput from "./chat-message-input";
import { Button } from "@/components/ui/button";
import { CldUploadButton } from "next-cloudinary";

interface ChatFormProps {
  recipientId: string | null;
}

const ChatForm: FC<ChatFormProps> = ({ recipientId }) => {
  const { conversationId, setConversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      let currentConversationId: string | null = conversationId;

      if (!currentConversationId && recipientId) {
        const conversationResponse = await axios.post("/api/conversations", {
          userId: recipientId,
          isGroup: false,
        });

        currentConversationId = conversationResponse.data.id;
        setConversationId(currentConversationId);
      }

      if (currentConversationId) {
        await axios.post("/api/messages", {
          ...data,
          conversationId: currentConversationId,
        });

        setValue("message", "", { shouldValidate: true });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <div className="py-4 px-4 border-t flex items-center gap-2 w-full absolute bottom-0">
      <CldUploadButton
        uploadPreset="rywdq0a7"
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
      >
        <Image className="text-sky-300 w-5 h-5" />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center w-full gap-2"
      >
        <ChatMessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <Button type="submit" size={"sm"} variant={"secondary"}>
          <Send />
        </Button>
      </form>
    </div>
  );
};

export default ChatForm;
