import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";

import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";

const dm = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fuzzie",
  description: "Automate your work with fuzzie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dm.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
