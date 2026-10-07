import type { Metadata, Viewport } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import Script from "next/script";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsappFloat } from "@/components/layout/whatsapp-float";
import { JsonLd } from "@/components/seo/json-ld";
import { keywords, OG_IMAGE, schoolJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { GTM_NOSCRIPT_URL, GTM_SCRIPT_URL } from "@/lib/tracking";
import "./globals.css";

// Nunito: arredondada e amigável para as crianças, mas firme no peso 800/900
const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"], weight: ["700", "800", "900"] });
const nunitoSans = Nunito_Sans({ variable: "--font-nunito-sans", subsets: ["latin"] });

const defaultTitle = "Colégio CPPEM | Escola cristã e militarizada em Caruaru-PE";

// o endereço canônico é definido em cada página; aqui ele seria herdado por todas
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: { default: defaultTitle, template: `%s | ${siteConfig.name}` },
  description: siteConfig.longDescription,
  keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "education",
  openGraph: {
    title: defaultTitle,
    description: siteConfig.shortDescription,
    siteName: siteConfig.name,
    locale: "pt_BR",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: siteConfig.shortDescription, images: [OG_IMAGE.url] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  formatDetection: { email: false, address: false, telephone: false },
  other: { "geo.region": "BR-PE", "geo.placename": "Caruaru" },
};

// o menu de eventos e os banners vêm do Notion: todas as páginas se renovam a cada 5 min,
// para um evento com "Exibir até" sumir no horário mesmo nas páginas estáticas
export const revalidate = 300;

export const viewport: Viewport = { themeColor: "#0a2356" };

// loader do GTM server-side: o ID do container está embutido no caminho /metrics/
const gtmLoader = `(function(w,d,s,l){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'?l='+l:'';j.async=true;j.src='${GTM_SCRIPT_URL}'+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer');`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className={`${nunito.variable} ${nunitoSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Script id="gtm" strategy="afterInteractive">
          {gtmLoader}
        </Script>
        <noscript>
          <iframe src={GTM_NOSCRIPT_URL} height="0" width="0" style={{ display: "none", visibility: "hidden" }} title="Google Tag Manager" />
        </noscript>
        <JsonLd data={schoolJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <WhatsappFloat />
      </body>
    </html>
  );
}
