import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from './styles/layout.module.scss'
import Header from './components/Header'

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
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/shq4xoc.css" />
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        <footer>
            <picture>
              <source srcSet="dark/m.svg" media="(prefers-color-scheme: dark)" />
              <img src="light/m.svg" alt="" className={styles.logo} />
            </picture>
            <div className={styles.network}>
              <a href="https://layers.to/brett">
                <picture>
                  <source srcSet="dark/layers.svg" media="(prefers-color-scheme: dark)" />
                  <img src="light/layers.svg" alt="" />
                </picture>
              </a>
              <a href="https://read.cv/brettmcm">
                <picture>
                  <source srcSet="dark/readcv.svg" media="(prefers-color-scheme: dark)" />
                  <img src="light/readcv.svg" alt="" />
                </picture>
              </a>
              <a href="https://instagram.com/brettmcm">
                <picture>
                  <source srcSet="dark/insta.svg" media="(prefers-color-scheme: dark)" />
                  <img src="light/insta.svg" alt="" />
                </picture>
              </a>
            </div>
            <div className={styles.brand}>
              <h4>Brett McM Design</h4>
              <p>Branding, Graphic Design, Product Design, Creative Consulting</p>
            </div>
        </footer>
      </body>
    </html>
  );
}
