"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { LogOut, User } from "lucide-react";
import LogoutButton from "./logout-button";
import { useCurrentUser } from "@/hooks/use-current-user";

const UserButton = () => {

  const user = useCurrentUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className={cn("relative rounded-full ring-2 ring-cyan-500/20 hover:ring-cyan-400/40 transition-all duration-200")}>
          <Avatar className="border-2 border-cyan-500/30">
            <AvatarImage src={user?.image!} alt={user?.name!} />
            <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
              <User className="text-white" />
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>

    <DropdownMenuContent className="mr-4 bg-gray-900/95 border-cyan-500/30 backdrop-blur-xl">
      <DropdownMenuItem className="text-gray-200 focus:bg-cyan-500/10 focus:text-cyan-300">
        <span>
          {user?.email}
        </span>
      </DropdownMenuItem>
      <DropdownMenuSeparator className="bg-cyan-500/20"/>
        <LogoutButton>
            <DropdownMenuItem className="text-gray-200 focus:bg-red-500/10 focus:text-red-300">
                <LogOut className="h-4 w-4 mr-2"/>
                LogOut
            </DropdownMenuItem>
        </LogoutButton>
    </DropdownMenuContent>

    </DropdownMenu>
  );
};

export default UserButton;
