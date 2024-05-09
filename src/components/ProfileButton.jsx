"use client";

import { CircleUserRound, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";

export default function ProfileButton({ userImage, currentUserName }) {
  const router = useRouter();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
              src={userImage}
              alt={`Profile image of ${currentUserName}`}
            />
            <AvatarFallback>{"AB"}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className={`font-bold`}>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            className={`cursor-pointer flex items-center space-x-2`}
            onClick={() => router.push(`/profile`)}
          >
            <CircleUserRound className="w-4 h-4" />
            <span>Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className={`cursor-pointer flex items-center space-x-2`}
          >
            <LogOut className="w-4 h-4 text-primary" />
            <SignOutButton>Sign out</SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
