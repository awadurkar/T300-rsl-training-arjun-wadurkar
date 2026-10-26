import type { Metadata } from "next";
import { Topbar } from "@/components/topbar";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "ProjectSpace — Project Explorer", template: "%s | ProjectSpace" },
  description: "A calm, collaborative home for your team's projects."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Topbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
