import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";
import Link from "next/link";

const JALLENG_APP_LINK = process.env.JALLENG_APP_LINK ?? "";

export const metadata: Metadata = {
  title: {
    template: "%s | State Health Explorer",
    default: "State Health Explorer",
  },
  description: "An explorer that allows you to view health data by state.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-[#f4f6f9]">
          <nav className="bg-[#1a3a5c] px-8 py-[14px] flex items-center gap-3">
            <Link href="/" className="no-underline">
              <div className="text-white font-extrabold text-[18px]">
                State Health Explorer
              </div>
            </Link>
            <div className="text-white/50 text-[13px] ml-2">
              CDC PLACES Data 2023
            </div>
            <a
              className="ml-auto text-white/40 text-[13px] italic"
              href={JALLENG_APP_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              A Jalleng App
            </a>
          </nav>
          <main className="max-w-[800px] mx-auto px-4 py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
