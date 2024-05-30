import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";

const font = DM_Sans({ subsets: ["latin"] });

const title = "Fuzzie | Automation tool for slack, discord, notion and drive";

const description = "Try open source automation tool with simple and modern ui";

export const metadata: Metadata = {
  metadataBase: new URL("https://fuzzie.milindjamnekar.dev"),
  title:
    "Fuzzie | Open source automation tool for slack, discord, notion and drive",
  description: "Automate Your Work With Fuzzie.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  // twitter: {
  //   card: "summary_large_image",
  //   title,
  //   description,
  //   creator: "@MilindJamnekar",
  //   images: ["/flow.png"],
  // },
  openGraph: {
    type: "website",
    siteName: "Fuzzie",
    url: new URL("https://fuzzie.milindjamnekar.dev"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            storageKey="theme"
            disableTransitionOnChange
          >
            {children}
            <SpeedInsights />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
