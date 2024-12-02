import { UserPermission, Workspace } from "@prisma/client";

export interface SubscriptionUser {
  userRole: UserPermission;
  user: {
    id: string;
    image?: string | null;
    username: string;
  };
}

export interface SettingsWorkspace extends Workspace {
  subscribers: SubscriptionUser[];
}

export interface ShortTask {
  id: string;
  emoji: string;
  title: string;
}

export interface ShortMindMap {
  id: string;
  title: string;
}

export interface WorkspaceShortcuts extends Workspace {
  tasks: ShortTask[];
  mindMaps: ShortMindMap[];
}

export interface UserInfo {
  id: string;
  username: string;
  image?: string | null;
  name?: string | null;
  surname?: string | null;
}

export interface AssignedToTaskUser {
  user: {
    id: string;
    image: string | null;
    username: string;
    assignedToTask: {
      userId: string;
    }[];
  };
}

export interface UsersAssignedToTaskInfo extends Workspace {
  subscribers: AssignedToTaskUser[];
}

export interface AssignedToMindMapUser {
  user: {
    id: string;
    image: string | null;
    username: string;
    assignedToMindMap: {
      userId: string;
    }[];
  };
}

export interface UsersAssignedToMindMapInfo extends Workspace {
  subscribers: AssignedToMindMapUser[];
}

export type AssignedItemType = "task" | "mindMap";

export interface AssignedToMeDataItem {
  id: string;
  title: string;
  emoji: string;
  link: string;
  workspaceName: string;
  createdAt: Date;
  type: AssignedItemType;
  updated: {
    at: Date;
    by?: UserInfo | null;
  };
  workspaceId: string;
  starred: boolean;
}

export interface AssignedToMeTaskAndMindMaps {
  tasks: AssignedToMeDataItem[];
  mindMaps: AssignedToMeDataItem[];
}

export interface UserActiveItemList {
  id: string;
  username: string;
  image: string | null;
  userRole: UserPermission;
}

export interface HomePageImage {
  src: string;
  alt: string;
}

export interface UserNotification extends Notification {
  notifyCreator: {
    id: string;
    username: string;
    image: string | null;
  };
  workspace: {
    id: string;
    name: string;
  } | null;
}

export interface HomeRecentActivity extends AssignedToMeDataItem {
  starred: boolean;
}

export interface HomeRecentTasksAndMindMapsActivity
  extends AssignedToMeTaskAndMindMaps {}

export interface FilterUser {
  id: string;
  username: string;
  image: string | null;
}

export interface WorkspaceRecentActivityAssignedToItem {
  user: {
    id: string;
    image: string | null;
    username: string;
  };
  id: string;
  userId: string;
  mindMapId?: string;
  taskId?: string;
}

export interface ExtendedWorkspace extends Workspace {
  conversation: {
    id: string;
  };
}
