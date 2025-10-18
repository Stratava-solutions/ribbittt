// FILE: src/app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kids Clothing Store",
  description: "Shop the latest kids fashion",
};

// Toggle this to show/hide coming soon page
const IS_UNDER_DEVELOPMENT = true;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {IS_UNDER_DEVELOPMENT ? (
          <main className="min-h-screen">{children}</main>
        ) : (
          <>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}