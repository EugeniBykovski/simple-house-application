export interface HomeUsersCageProps {
  className?: string;
  workspaceId: string;
}

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  username: string;
  image: string;
}

export interface Apartment {
  apartmentNumber: number;
  users: User[];
}

export interface Entrance {
  entranceNumber: number;
  apartments: Apartment[];
}

export interface House {
  entrances: Entrance[];
  street: string;
  houseNumber: string;
}

export interface Workspace {
  subscribers: { user: User }[];
}
