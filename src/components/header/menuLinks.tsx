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
    {
      title: "About",
      href: "/about",
    },
  ];

  const links = menuLinks.map((link) => (
    <li>
      <a
        className="text-gray-500 transition hover:text-gray-500/75"
        href={link.href}
      >
        {link.title}
      </a>
    </li>
  ));

  return (
    <nav aria-label="Global" className="hidden md:block">
      <ul className="flex items-center gap-6 text-sm">{links}</ul>
    </nav>
  );
}
