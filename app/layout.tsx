import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://sevasamarpan.org"),
  title: {
    default: "Seva Samarpan – Free Library & Old Age Home in Pune",
    template: "%s | Seva Samarpan",
  },
  description: "Seva Samarpan runs a free library and study room for students and an old age home for elders in Pune, Maharashtra. Donate or volunteer to support our work.",
  keywords: ["Seva Samarpan", "NGO Pune", "free library Pune", "old age home Pune", "donate to NGO Pune", "volunteer Pune", "student education support Pune", "elder care Pune"],
  authors: [{ name: "Seva Samarpan" }],
  creator: "Seva Samarpan",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    title: "Seva Samarpan – Free Library & Old Age Home in Pune",
    description: "We run a free study room for students and a home for elders in Pune. See how you can help.",
    siteName: "Seva Samarpan",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Seva Samarpan")}&description=${encodeURIComponent("Free library for students & old age home in Pune.")}`,
        width: 1200,
        height: 630,
        alt: "Seva Samarpan – NGO in Pune"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Seva Samarpan – Free Library & Old Age Home in Pune",
    description: "We run a free study room for students and a home for elders in Pune. See how you can help.",
    images: [`/api/og?title=${encodeURIComponent("Seva Samarpan")}&description=${encodeURIComponent("Free library for students & old age home in Pune.")}`],
  },
  verification: {
    google: "BwI_9JRy2KhlYRbLuy3laTHKkfMfq_bSRsFlNv0WDSo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased`}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-38P6B1K054"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-38P6B1K054');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NGO",
              "@id": "https://sevasamarpan.org/#organization",
              "name": "Seva Samarpan",
              "url": "https://sevasamarpan.org",
              "logo": "https://sevasamarpan.org/logo/logo_high.png",
              "description": "Seva Samarpan is a registered NGO in Pune, Maharashtra, running a free library and study room for students and an old age home for elders.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Pune district",
                "addressLocality": "Pune",
                "addressRegion": "Maharashtra",
                "postalCode": "411001",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-9422262499",
                "contactType": "General inquiries",
                "email": "sevasamarpanngo@gmail.com"
              },
              "sameAs": [
                "https://www.facebook.com/sevasamarpan",
                "https://www.instagram.com/sevasamarpan"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://sevasamarpan.org/#website",
              "url": "https://sevasamarpan.org",
              "name": "Seva Samarpan",
              "publisher": { "@id": "https://sevasamarpan.org/#organization" }
            })
          }}
        />
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >

            {children}
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
