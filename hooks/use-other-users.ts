import { FullConversationType } from "@/types/chats";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUsers = (
  conversation:
    | FullConversationType
    | {
        participants: User[];
      }
) => {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session.data?.user.email;
    const otherUser = conversation.participants.filter(
      (user) => user.email !== currentUserEmail
    );

    return otherUser;
  }, [session.data?.user.email, conversation.participants]);

  return otherUser;
};

export default useOtherUsers;
