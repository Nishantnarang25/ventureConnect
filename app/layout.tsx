import "./globals.css";
import Navbar from "./components/navbar"; 
import Footer from "./components/footer"; 
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers> {/* ✅ Wrap everything inside Providers */}
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
