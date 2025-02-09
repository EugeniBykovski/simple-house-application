export interface UserProps {
  profileImage?: string | null;
  username: string;
  email: string;
  isOnline?: boolean;
  apartments: any[];
}

export interface UserData {
  id: string;
  username: string;
  image: string | null;
}
