import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AutofuseProvider } from "autofusecss/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AutofuseCSS Next.js Example",
  description: "Fluid responsive design with AutofuseCSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AutofuseProvider theme="base">{children}</AutofuseProvider>
      </body>
    </html>
  );
}
