import type { Metadata } from "next";
import { inter } from "@/config/fonts";

import "./globals.css";
import { AuthProvider } from "@/components";

// export const metadata: Metadata = {
//   title: "Teslo | Shop",
//   description: "Una tienda virtual de productos - Ecommerce",
// };

export const metadata: Metadata = {
  // Para que en todos las rutas se muestre este template en el titulo de la pagina
  title: {
    template: "%s - Teslo | Shop",
    default: "Home - Teslo | Shop",
  },
  description: "Una tienda virtual de productos - Ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
