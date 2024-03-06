import Link from "next/link";
import "./Navbar.css";
export default function NavBar({ links }) {
  return (
    <>
      <ul className="navbar">
        <Link href='/' className="text-2xl font-bold">Navbar</Link>
        {/* <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/store">Store</Link>
        </li> */}
        <nav className="flex gap-4 items-center">
          {links.map((link) => {
            return (
              <li key={link.name}>
                <Link href={`/${link.href}`}>{link.name}</Link>
              </li>
            );
          })}
        </nav>
      </ul>
    </>
  );
}
