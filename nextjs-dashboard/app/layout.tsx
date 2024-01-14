import { monserrat } from "./ui/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* con antialiased lo que nos ayuda es a renderizar de mejor manera la fuente en monitores que fueran un poco anitguos */}
      <body className={ `${monserrat.className} antialiased` }>
        {/* <h1>Esto es parte del layout principal</h1> 
        <hr />*/}        
        {children}
        <footer className="mt-2 mb-2 flex justify-center align-center">
          Soy un footer
        </footer>
      </body>
    </html>
  );
}
