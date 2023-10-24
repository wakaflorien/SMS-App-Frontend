/* eslint-disable @next/next/no-sync-scripts */
"use client";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@/utils/material_tailwind";
import Script from "next/script";

const queryClient = new QueryClient();

const metadata = {
  title: "Infotext Messaging",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <html lang="en">
        <body>
          {children}
          <Script src="../path/to/flowbite/dist/flowbite.min.js"></Script>
        </body>
      </html>
    </ThemeProvider>
    </QueryClientProvider>
  );
}
