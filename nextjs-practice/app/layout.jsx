import NavBar from "../components/NavBar";
import { Roboto } from 'next/font/google'
import './global.css'

// next nos recomienda esta manera para trabajar con metadatos
export const metadata = {
  title: "Next.js Titulo",
  description: "Page layout app",
  keywords: ['page', 'app']
};

const roboto = Roboto({
  weight: ['300','400','500'],
  style: ["italic","normal"],
  subsets: ["latin"]
})

export default function RootLayout({ children }) {
  const links = [
    { href: "", name: "Home" },
    { href: "about", name: "About" },
    { href: "store", name: "Store" },
    { href: "posts", name: "Posts" }
  ];

  return (
    <html lang="en">
      <body className={roboto.className}>
        <header className="p-16 py-4 border-b-2">
          <NavBar links={links} />
        </header>
        <main className="max-w-[800px] m-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
