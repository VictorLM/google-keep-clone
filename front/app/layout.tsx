import type { Metadata } from "next";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import BootstrapClient from "@/app/_components/bootstrap";

export const metadata: Metadata = {
  title: process.env.BUSINESS_NAME,
  description: process.env.BUSINESS_DESCRIPTION,
  icons: ["/images/icon.png"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
      <BootstrapClient />
    </html>
  );
}
