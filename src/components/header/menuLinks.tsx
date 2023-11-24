import { Link, useLocation, useRoutes } from "react-router-dom";

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
        className={`text-gray-500 transition hover:text-gray-500/75 ${
          pathname === link.href ? "text-purple-900 font-bold" : ""
        }`}
        to={link.href}
      >
        {link.title}
      </Link>
    </li>
  ));

  return (
    <nav aria-label="Global" className="hidden md:block">
      <ul className="flex items-center gap-6 text-sm">{links}</ul>
    </nav>
  );
}
