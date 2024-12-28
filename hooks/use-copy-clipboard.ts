import { useState } from "react";

export const useCopyToClipboard = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 1000);
    } catch (error) {
      console.error("Failed to copy text to clipboard:", error);
    }
  };

  return { copyToClipboard, copiedField };
};
