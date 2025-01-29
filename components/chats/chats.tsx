import ChatsSidebar from "./components/chats-sidebar";
import ChatsTitles from "./components/chats-titles";

const Chats = () => {
  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <ChatsTitles />
      <div className="flex justify-between items-start gap-4 w-full h-full">
        <ChatsSidebar />
        <div className="w-full flex justify-center h-full shadow-md rounded-md">
          Chats
        </div>
      </div>
    </div>
  );
};

export default Chats;
