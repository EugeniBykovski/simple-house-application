"use client";

import { FC, useState } from "react";
import { Label } from "@/components/ui/label";
import { useEventStore } from "@/store/store";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { UserAvatar } from "@/components/ui/user-avatar";

interface User {
  id: string;
  username: string;
  email: string | null;
  image: string | null;
}

interface CalendarSearchProps {
  users: User[];
}

const CalendarSearch: FC<CalendarSearchProps> = ({ users }) => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const { addUserToCall } = useEventStore();

  const toggleUserSelection = (user: User) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.some((u) => u.id === user.id)
        ? prevSelected.filter((u) => u.id !== user.id)
        : [...prevSelected, user]
    );
  };

  const handleAddUsers = () => {
    selectedUsers.forEach((user) => addUserToCall(user));
    setSelectedUsers([]);
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-2">
      <Label>Select people:</Label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select users" />
        </SelectTrigger>
        <SelectContent>
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => toggleUserSelection(user)}
              >
                <div className="flex items-center justify-start gap-3">
                  <Checkbox
                    checked={selectedUsers.some((u) => u.id === user.id)}
                    onCheckedChange={() => toggleUserSelection(user)}
                    onClick={handleAddUsers}
                  />
                  <span className="text-sm text-zinc-500">{user.username}</span>
                </div>
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.username}
                    className="w-8 h-8 rounded-full object-cover"
                    width={30}
                    height={30}
                  />
                ) : (
                  <UserAvatar className="w-8 h-8" />
                )}
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-sm p-2">No users found</div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CalendarSearch;
