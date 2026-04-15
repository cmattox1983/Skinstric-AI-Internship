import "./globals.css";
import { roobert } from "./fonts";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Skinstric",
  description: "Skinstric AI Internship",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roobert.variable} antialiased`}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
