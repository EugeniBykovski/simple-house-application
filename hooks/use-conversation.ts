import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

const useConversation = () => {
  const params = useParams();
  const [conversationId, setConversationId] = useState<string | null>(null);

  const resolvedConversationId = useMemo(() => {
    if (Array.isArray(params?.conversationId)) {
      return params.conversationId[0];
    }
    return params?.conversationId || conversationId || null;
  }, [params.conversationId, conversationId]);

  const isOpen = useMemo(
    () => !!resolvedConversationId,
    [resolvedConversationId]
  );

  return {
    isOpen,
    conversationId: resolvedConversationId,
    setConversationId,
  };
};

export default useConversation;
