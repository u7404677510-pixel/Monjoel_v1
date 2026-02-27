// Joel Homepage Test — Architecture inspired by Uber.com — Built with Cursor
import { Inter } from "next/font/google";
import { Metadata } from "next";
import JoelUberHomepage from "@/components/test/JoelUberHomepage";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "[TEST] Joël — Architecture Uber",
  description: "Page de test — Architecture et DA inspirées de Uber.fr, adaptée à monjoel.fr.",
  robots: { index: false, follow: false },
};

export default function TestJoelUber() {
  return (
    <div className={inter.variable}>
      <JoelUberHomepage />
    </div>
  );
}
