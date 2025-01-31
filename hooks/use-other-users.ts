import { Conversation, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUsers = (
  conversation: Conversation & { participants: User[] }
): User[] => {
  const { data: session } = useSession();
  const otherUsers = useMemo(() => {
    const currentUserEmail = session?.user?.email;
    if (!currentUserEmail || !conversation?.participants) return [];

    return conversation.participants.filter(
      (user) => user.email !== currentUserEmail
    );
  }, [session?.user?.email, conversation.participants]);

  return otherUsers;
};

export default useOtherUsers;
