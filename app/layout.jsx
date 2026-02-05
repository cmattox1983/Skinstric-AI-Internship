import "./globals.css";
import { roobert } from "./fonts";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roobert.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
