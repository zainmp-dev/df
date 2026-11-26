import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/ReadyProvider";
import { profile } from "@/data/portfolio";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const title = `${profile.name} — ${profile.role}`;
const description =
  "Portfolio of Diya Fathima M, a Junior MIS Executive in Kozhikode, Kerala — MIS reporting, audit support, SAP and Excel data analysis, Power BI and Tableau.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${profile.name}` },
  description,
  keywords: [
    "Diya Fathima M",
    "Junior MIS Executive",
    "MIS reporting",
    "audit support",
    "SAP",
    "Advanced Excel",
    "Power BI",
    "Tableau",
    "SQL",
    "Kozhikode",
    "Kerala",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    title,
    description,
    siteName: profile.name,
    locale: "en_IN",
    images: [
      {
        url: "/images/og.jpg",
        width: 800,
        height: 800,
        alt: `Portrait of ${profile.name}`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/images/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#fcece2",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kozhikode",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "St. Joseph's College (Autonomous), Devagiri",
  },
  sameAs: [profile.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <noscript>
          <style>{"[data-preloader]{display:none!important}"}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
