import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";
import Link from "next/link";

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
        <div
          style={{
            minHeight: "100vh",
            background: "#f4f6f9",
            fontFamily: "'Segoe UI', Arial, sans-serif",
          }}
        >
          <nav
            style={{
              background: "#1a3a5c",
              padding: "14px 32px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Link href="/" style={{ textDecoration: "none" }}>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>
                State Health Explorer
              </div>
            </Link>
            <div
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 13,
                marginLeft: 8,
              }}
            >
              CDC PLACES Data 2023
            </div>
          </nav>
          <main
            style={{ maxWidth: 800, margin: "0 auto", padding: "32px 16px" }}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
