import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronRight, Contact, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
const DropdownUser = () => {
  return (
    <DropdownMenu>
          <DropdownMenuTrigger>
            <Button>
              <span className="hidden text-right lg:mr-2 lg:block">
                <span className="block text-sm font-medium text-black dark:text-white">
                  Thomas Anree
                </span>
                <span className="block text-xs">UX Designer</span>
              </span>
              <Image width={200} height={200} className='w-8 h-8 rounded-full' alt='User Profile' src="/Avatar.png"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='rounded-xl bg-white text-black dark:bg-slate-700 dark:text-white mr-8'>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button className='flex items-center space-x-2'>
                <Contact className="" />
                <span>My Contacts</span>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button className='flex items-center space-x-2'>
                <User className="" />
                <span>Edit Profile</span>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button className='flex items-center space-x-2'>
                <LogOut className="" />
                <span>Logout</span>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
  );
};

export default DropdownUser;
