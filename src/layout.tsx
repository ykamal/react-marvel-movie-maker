import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Logo from "./components/header/Logo";
import MenuLinks from "@components/header/MenuLinks";

export default function Layout() {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);
  return (
    <>
      <header className="bg-purple-900/10 rounded-xl">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex py-2.5 sm:py-3 md:py-4 justify-between gap-4 md:gap-12">
            <div
              onClick={() => setShowMenu(false)}
              className="logo-wrapper flex justify-center items-end"
            >
              <Logo />
            </div>

            <div className="flex md:gap-12">
              {/* mobile btn */}
              <div
                className="btn xs:hidden"
                onClick={() => setShowMenu(!showMenu)}
              >
                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
              <div className="links hidden xs:inline-block">
                <MenuLinks />
              </div>
            </div>
          </div>
          {/* mobile */}
          <div
            className={`mobile-links xs:hidden transition-all duration-300 overflow-hidden ${
              showMenu ? "h-[90px]" : "h-0"
            }`}
          >
            <MenuLinks />
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}
