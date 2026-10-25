import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"

import { mergeClasses } from "@/utils/mergeClasses"

const jetBrainsMono = JetBrains_Mono({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "Live F1 | Realtime F1 Data",
    description:
        "Real-time Formula 1 dashboard providing live race updates, driver stats, and track positions. Get instant access to F1 data and insights.",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={mergeClasses(jetBrainsMono.className, "bg-zinc-950 text-white antialiased")}>
                {children}
            </body>
        </html>
    )
}
