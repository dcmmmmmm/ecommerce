import Link from "next/link";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import { AlignJustify, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-30 flex w-full bg-white drop-shadow-1 dark:bg-slate-900 dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <Button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-30 block rounded-sm  bg-white p-1.5 shadow-sm  dark:bg-slate-900 lg:hidden"
          >
            <AlignJustify className="text-black"/>
          </Button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" href="/">
            <Image
              width={100}
              height={50}
              src={"/WhiteLogo.png"}
              alt="Logo"
            />
          </Link>
        </div>

        <div className="hidden sm:block">
          <form>
            <div className="relative">
              <Button className="absolute left-0 top-1/2 -translate-y-1/2">
                <Search className="text-black dark:text-white"/>
              </Button>

              <input
                type="text"
                placeholder="Type to search..."
                className="w-full bg-transparent pl-12 pr-4 font-medium text-black dark:text-white focus:outline-none xl:w-125"
              />
            </div>
          </form>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <ThemeSwitcher/>
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            {/* <DropdownMessage /> */}
            {/* <!-- Chat Notification Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
