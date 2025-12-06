// FILE: src/app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kids Clothing Store",
  description: "Shop the latest kids fashion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer position="top-center" />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
