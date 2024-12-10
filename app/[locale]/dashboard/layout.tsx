import { Sidebar } from "@/components/sidebar/Sidebar";
import { ToggleSidebarProvider } from "@/context/ToggleSidebar";
import { CommonTools } from "./common/CommonTools";
import { MeetingsProvider } from "@/context/MeetingsContext";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToggleSidebarProvider>
      <MeetingsProvider>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-col w-full">
            <div className="flex flex-1 w-full flex-col h-full relative overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-background">
              {children}
            </div>
            <CommonTools />
          </div>
        </div>
      </MeetingsProvider>
    </ToggleSidebarProvider>
  );
};

export default DashboardLayout;
