import type { Metadata } from "next";

import BootstrapClient from "@/app/_components/bootstrap";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

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
      <body>
        {children}
        <ToastContainer />
      </body>
      <BootstrapClient />
    </html>
  );
}
