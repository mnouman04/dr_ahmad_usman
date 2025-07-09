import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dr. Ahmad Usman - Internal Medicine Specialist",
  description:
    "Professional medical portfolio and appointment booking for Dr. Ahmad Usman, Internal Medicine Specialist with over 8 years of experience.",
  keywords: "doctor, internal medicine, healthcare, medical consultation, appointment booking",
  authors: [{ name: "Dr. Ahmad Usman" }],
  metadataBase: new URL("http://localhost:3000"), // Add this line
  openGraph: {
    title: "Dr. Ahmad Usman - Internal Medicine Specialist",
    description: "Professional medical portfolio and appointment booking",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Ahmad Usman - Internal Medicine Specialist",
    description: "Professional medical portfolio and appointment booking",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
     <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
