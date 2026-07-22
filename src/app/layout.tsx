import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Chakra_Petch } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import BlueprintGrid from './components/BlueprintGrid';
import SmoothScrollProvider from './components/SmoothScrollProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const chakraPetch = Chakra_Petch({
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ethan Saba - Computer Science Student & Developer",
  description: "Portfolio of Ethan Saba, Computer Science student at University of Michigan with interests in technology, real estate, and creative projects.",
  keywords: ["Ethan Saba", "Computer Science", "University of Michigan", "Developer", "Real Estate", "Portfolio"],
  authors: [{ name: "Ethan Saba" }],
  creator: "Ethan Saba",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
  },
  openGraph: {
    title: "Ethan Saba - Computer Science Student & Developer",
    description: "Portfolio of Ethan Saba, Computer Science student at University of Michigan with interests in technology, real estate, and creative projects.",
    url: "https://ethansaba.com",
    siteName: "Ethan Saba Portfolio",
    type: "website",
    images: [
      {
        url: "/logo.svg",
        width: 200,
        height: 200,
        alt: "Ethan Saba Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethan Saba - Computer Science Student & Developer",
    description: "Portfolio of Ethan Saba, Computer Science student at University of Michigan with interests in technology, real estate, and creative projects.",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${chakraPetch.variable} antialiased`}
      >
        <BlueprintGrid />
        <Navbar/>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <Footer/>
      </body>
    </html>
  );
}
