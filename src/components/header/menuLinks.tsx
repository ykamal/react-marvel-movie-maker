import { Link, useLocation } from "react-router-dom";

export default function MenuLinks() {
  const menuLinks: { title: string; href: string }[] = [
    {
      title: "Movies",
      href: "/",
    },
    {
      title: "Add New",
      href: "/new",
    },
  ];

  const location = useLocation();
  const { pathname } = location;

  const links = menuLinks.map((link) => (
    <li key={link.href}>
      <Link
        className={`text-gray-500 transition  py-2 flex w-full hover:text-gray-500/75 text-lg ${
          pathname === link.href ? "text-purple-900 font-bold" : ""
        }`}
        to={link.href}
      >
        {link.title}
      </Link>
    </li>
  ));

  return (
    <nav aria-label="Global">
      <ul className="flex flex-col xs:flex-row xs:items-center xs:gap-6 text-sm xs:ml-4">
        {links}
      </ul>
    </nav>
  );
}
