/* eslint-disable @next/next/no-sync-scripts */
"use client";
import "./globals.css";
import {QueryClient, QueryClientProvider} from "react-query";
import {ThemeProvider} from "@material-tailwind/react";
import Script from "next/script";
import Providers from "@/components/Providers/Providers";

const queryClient = new QueryClient();

const metadata = {
    title: "Infotext Messaging", description: "",
};

export default function RootLayout({children}) {
    return (<QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <html lang="en">
                <body>
                <Providers>
                    {children}
                </Providers>
                <Script src="../path/to/flowbite/dist/flowbite.min.js"></Script>
                </body>
                </html>
            </ThemeProvider>
        </QueryClientProvider>);
}
