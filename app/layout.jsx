/* eslint-disable @next/next/no-sync-scripts */
"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "@material-tailwind/react";
import "../public/styles/globals.css";
import { Suspense } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

const metadata = {
  title: "Infotext Messaging",
  description: "Infotext Messaging",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <Suspense fallback={null}>
                <AntdRegistry>
                  {children}
                </AntdRegistry>
              </Suspense>
            </ThemeProvider>
          </QueryClientProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
