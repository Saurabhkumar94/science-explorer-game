import type { Metadata } from "next";
import React from "react";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Science Explorer Game",
  description: "An interactive science learning game for curiosity exploration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}