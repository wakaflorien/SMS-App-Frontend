/* eslint-disable @next/next/no-sync-scripts */
"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@material-tailwind/react";
// import Providers from "@/components/Providers/Providers";
import "../public/styles/globals.css";
import { Suspense } from "react";
import { NavigationEvents } from "@/components/navigation-events";
import { AuthContextProvider } from "./context/AuthContext";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import ThemeConfig from "@/theme/themeConfig";

const queryClient = new QueryClient();

const metadata = {
  title: "Infotext Messaging",
  description: "Infotext Messaging",
};

export default function RootLayout({ children }) {
  return (
    <ConfigProvider theme={ThemeConfig}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <html lang="en">
            <body>
              <AntdRegistry>
                {/* <Providers> */}
                <AuthContextProvider>
                  {children}
                  <Suspense fallback={null}>
                    <NavigationEvents />
                  </Suspense>
                </AuthContextProvider>
                {/* </Providers> */}
              </AntdRegistry>
            </body>
          </html>
        </ThemeProvider>
      </QueryClientProvider>
    </ConfigProvider>
  );
}
