import type { Metadata } from "next";
import { instrumentSerif, inter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Playbill Picks",
  description: "Automatic daily entries for all Broadway lotteries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <div className="dotted-bg">
          <div className="blue-frame">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
