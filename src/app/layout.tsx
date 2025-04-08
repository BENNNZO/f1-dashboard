import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "F1 Realtime Dashboard",
    description: "Real-time Formula 1 dashboard providing live race updates, driver stats, and track positions. Get instant access to F1 data and insights.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${jetBrainsMono.className} antialiased bg-zinc-950 text-white`}>
                    {children}
            </body>
        </html>
    );
}
