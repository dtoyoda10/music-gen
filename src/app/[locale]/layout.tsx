import AppAuth from "@/components/global/app-auth";
import AppChat from "@/components/global/app-chat";
import { AppClickMonitor } from "@/components/global/app-click-monitor";
import AppClient from "@/components/global/app-client";
import AppFooter from "@/components/global/app-footer";
import AppHeader from "@/components/global/app-header";
import AppJotai from "@/components/global/app-jotai";
import AppMessage from "@/components/global/app-message";
import AppTheme from "@/components/global/app-theme";
import AppTooltip from "@/components/global/app-tooltip";
import { GLOBAL, SEO_DATA } from "@/constants";
import "@/styles/globals.css";
import { getServerTheme } from "@/utils/theme";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next/types";
import { ReactNode } from "react";

// SEO metadata
export async function generateMetadata(
  { params }: { params: { locale: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } = params;
  const hostname = headers().get("host") ?? "";
  const previousImages = (await parent).openGraph?.images ?? [];

  // Get SEO data for the current language, using optional chaining and nullish coalescing
  const currentSEO = SEO_DATA.languages?.[locale] ?? {
    title: "302 AI TOOL",
    description: "This is a tool for 302 AI",
    image: "/default-image.jpg",
  };

  const images = [currentSEO.image, ...previousImages].filter(Boolean);
  const baseUrl = `https://${hostname}`;

  // Generate URL mapping for other language versions
  const languageAlternates = GLOBAL.LOCALE.SUPPORTED.reduce<
    Record<string, string>
  >((acc, lang) => {
    if (lang !== locale) {
      acc[lang] = `/${lang}`;
    }
    return acc;
  }, {});

  return {
    title: currentSEO.title,
    description: currentSEO.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: languageAlternates,
    },
    openGraph: {
      url: `/${locale}`,
      images,
    },
    twitter: {
      site: `${baseUrl}/${locale}`,
      images,
    },
  };
}

export default async function RootLayout({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: ReactNode;
}) {
  // Ensure theme is set on server side, to avoid hydration error
  const theme = getServerTheme(cookies);

  if (!GLOBAL.LOCALE.SUPPORTED.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={theme} style={{ colorScheme: theme }}>
      <body className="antialiased">
        <AppTheme theme={theme}>
          <AppJotai>
            <NextIntlClientProvider messages={messages}>
              <AppClient>
                <AppTooltip>
                  <div className="grid h-screen grid-rows-[auto_1fr_auto] overflow-hidden">
                    <AppHeader className="flex-none" />
                    <main className="flex min-h-0 flex-col overflow-y-auto overflow-x-hidden">
                      {children}
                    </main>
                    <AppFooter className="flex-none" />
                  </div>
                </AppTooltip>
                <AppAuth />
                <AppChat />
                <AppClickMonitor />
              </AppClient>
              <AppMessage />
            </NextIntlClientProvider>
          </AppJotai>
        </AppTheme>
      </body>
    </html>
  );
}
