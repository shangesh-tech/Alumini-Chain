import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Alumini Chain",
  description: "Web3 Alumni Portal",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-900`}
      >
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col md:ml-64"> 
            <Header />
            <main className="flex-1 overflow-y-auto px-4 py-6 md:px-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
