import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "../components/Header"; // Import Header

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "MediCompare AI",
  description: "Discover and compare the real cost of medical procedures — powered by BigQuery, Fivetran, and Vertex AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        {/* <Header /> */} {/* Navbar is not needed as per user request */}
        {children}
      </body>
    </html>
  );
}
