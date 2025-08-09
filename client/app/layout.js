import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            className: "bg-gray-800 text-white"
          }}
        />
        {children}
        </SessionProvider>
      </body>
    </html>
  );
}
