import { usePathname } from "next/navigation";
import useConversation from "./use-conversation";
import { useMemo } from "react";
import { MessageCircle } from "lucide-react";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chats",
        href: "/conversation",
        Icon: MessageCircle,
        active: pathname === "/conversations" || !!conversationId,
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
