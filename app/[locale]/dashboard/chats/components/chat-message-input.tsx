"use client";

import { FC } from "react";
import { Input } from "@/components/ui/input";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface ChatMessageInputProps {
  id: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const ChatMessageInput: FC<ChatMessageInputProps> = ({
  id,
  placeholder,
  type,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      <Input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id)}
        required
        placeholder={placeholder}
        className="text-zinc-800 font-light py-2 px-4 bg-neutral-100 w-full rounded-full"
      />
    </div>
  );
};

export default ChatMessageInput;
