import { Sidebar } from "@/components/sidebar/Sidebar";
import { ToggleSidebarProvider } from "@/context/ToggleSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToggleSidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 w-full flex-col relative p-4 md:p-6 lg:px-10 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-background">
          {children}
        </div>
      </div>
    </ToggleSidebarProvider>
  );
};

export default DashboardLayout;
