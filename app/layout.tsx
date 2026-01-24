// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer"; // ← import

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Public Archive",
  description: "A daily product of what people are wearing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <NavBar />
        {children}
        <Footer /> {/* ← render */}
      </body>
    </html>
  );
}
