"use client";

import useRoutes from "@/hooks/useRoutes";
import ChatsItem from "./chats-item";

const ChatsSidebar = () => {
  const routes = useRoutes();

  return (
    <div className="shadow-md flex-col justify-between w-[4%] h-full rounded-md">
      <nav className="p-4 flex flex-col justify-between">
        <ul role="list" className="flex flex-col items-center space-y-1">
          {routes.map((item) => (
            <ChatsItem
              key={item.label}
              href={item.href}
              label={item.label}
              Icon={item.Icon}
              active={item.active}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ChatsSidebar;
