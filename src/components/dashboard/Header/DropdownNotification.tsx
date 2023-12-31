import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Bell, X } from 'lucide-react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
const DropdownNotification = () => {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger>
        <Button type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center rounded-xl">
          <Bell/>
          <span className="sr-only ">Notifications</span>
        </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className='rounded-xl bg-white dark:bg-slate-700 dark:text-white text-black mr-4 ml-1 '>
      <DropdownMenuLabel>Notifications</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <div className='flex items-center space-x-2'>
          <Image width={200} height={200} className='w-8 h-8 rounded-full' alt='User Profile' src="/Avatar.png"/>
          <div className='flex flex-col space-y-1'>
            <p>Test Paragaph Stock out</p>
            <div className='flex items-center space-x-2'>
              <p className='bg-red-700 px-3 py-0.5 text-white rounded-xl text-sm'>Stock Out</p>
              <p>Dec 12 2021 - 12:40PM</p>
            </div>
          </div>
          <div>
            <Button>
              <X/>
            </Button>
          </div>
        </div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu> 
  );
};

export default DropdownNotification;
