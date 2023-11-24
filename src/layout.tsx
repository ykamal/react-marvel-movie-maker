import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "./components/header/Logo";
import MenuLinks from "./components/header/MenuLinks";
import HamburgerIcon from "./components/header/Hamburger";

export default function Layout() {
  return (
    <>
      <header className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <Logo />
            </div>

            <div className="md:flex md:items-center md:gap-12">
              <MenuLinks />
              <HamburgerIcon />
            </div>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}
