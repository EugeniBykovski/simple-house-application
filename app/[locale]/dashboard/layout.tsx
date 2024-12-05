import { DraggablePanel } from "@/components/dashboard/DraggablePanel/DraggablePanel";
import MeetingsPanel from "@/components/dashboard/MeetingsPanel/MeetingsPanel";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { ToggleSidebarProvider } from "@/context/ToggleSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToggleSidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col w-full">
          <div className="flex flex-1 w-full flex-col h-full relative overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-background">
            {children}
          </div>
          <DraggablePanel />
          <MeetingsPanel />
        </div>
      </div>
    </ToggleSidebarProvider>
  );
};

export default DashboardLayout;
