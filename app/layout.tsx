import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from './styles/layout.module.scss'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brett McMillin | Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head><link rel="stylesheet" href="https://use.typekit.net/shq4xoc.css" /></head>
      <body className={inter.className}>
        <a href="mailto:brettmcm@me.com" className={styles.email}>Contact</a>
        {children}
      </body>
    </html>
  );
}
