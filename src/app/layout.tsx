import "./globals.css";
// import styles from "./layout.module.css";

import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import { Box, CssBaseline } from "@mui/material";

// const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_gallery_address as string),
  title: {
    default: "Drive Gallery",
    template: "%s | Drive Gallery",
  },
  description: "A image gallery hosted at Google Drive",
  openGraph: {
    title: {
      default: "Drive Gallery",
      template: "%s | Drive Gallery",
    },
    description: "A image gallery hosted at Google Drive",
    url: "/",
    siteName: "Drive Gallery",
    images: [
      {
        url: "/app-image.png",
        width: 604,
        height: 603,
      },
      //     {
      //       url: "/image1200x630.jpeg",
      //       width: 1200,
      //       height: 630,
      //     },
    ],
    type: "website",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AppRouterCacheProvider>
          <CssBaseline enableColorScheme />
          <Box
            // className={styles.container}
            sx={{
              bgcolor: "background.default",
              color: "text.primary",
              width: "100%",
              height: "100%"
            }}
          >
            {children}
          </Box>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
