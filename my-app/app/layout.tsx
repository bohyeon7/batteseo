import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// head 요소
export const metadata: Metadata = {
  title: "봉화밭에서",
  description: "봉화에서 직접 생산한 들깨",
  keywords: "봉화, 들깨, 들기름, 들깨가루",
  verification: {
    other: {
      "naver-site-verification" : "1fce1f4d7e78df2357b056f4399500e74df4bc0f"
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
