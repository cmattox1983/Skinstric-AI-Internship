import "./globals.css";
import { roobert } from "./fonts";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
        <SpeedInsights />
      </body>
    </html>
  );
}
