import { getAuthSession } from "@/lib/auth";
import { SidebarContainer } from "./SidebarContainer";
import { getUserAdminWorkspaces, getWorkspaces } from "@/lib/api";

export const Sidebar = async () => {
  let session = await getAuthSession();

  if (!session) {
    session = {
      expires: new Date().toISOString(),
      user: {
        id: "fake-user-id",
        username: "Guest",
        name: "Guest",
        surname: "User",
        email: "guest@example.com",
        completedOnboarding: false,
      },
    };
  }

  const [userWorkspaces, userAdminWorkspaces] = await Promise.all([
    session.user.id !== "fake-user-id" ? getWorkspaces(session.user.id) : [],
    session.user.id !== "fake-user-id"
      ? getUserAdminWorkspaces(session.user.id)
      : [],
  ]);

  return (
    <SidebarContainer
      userWorkspaces={userWorkspaces}
      userAdminWorkspaces={userAdminWorkspaces}
      userId={session.user.id}
    />
  );
};
