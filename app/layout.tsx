import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './styles/layout.module.scss'
import Header from './components/Header'
import SocialLinks from './components/SocialLinks'

const inter = Inter({ subsets: ["latin"] });
const ibmPlexSans = IBM_Plex_Sans({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans"
});

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
        <link rel="micropub" href="/api/micropub" />
        <link rel="authorization_endpoint" href="https://indieauth.com/auth" />
        <link rel="token_endpoint" href="https://tokens.indieauth.com/token" />
        <link href="https://x.com/brettmcmillin" rel="me"></link>
        <link href="https://github.com/brettmcm" rel="me"></link>

        
      </head>
      <body className={`${inter.className} ${ibmPlexSans.variable}`}>
        <Header />
        {children}
        <footer>
            <picture>
              <source srcSet="light/m.svg" media="(prefers-color-scheme: dark)" />
              <img src="light/m.svg" alt="" className={styles.logo} />
            </picture>
            <SocialLinks 
              links={[
                { href: 'https://instagram.com/brettmcm', iconName: 'insta', alt: 'Instagram' },
                { href: 'https://x.com/brettmcmillin', iconName: 'x', alt: 'X' }
              ]} 
            />
            <div className={styles.brand}>
              <h4>Brett McM Design</h4>
              <p><span>Branding</span><span>Design Systems</span><span>Graphic Design</span></p>
            </div>
        </footer>
      </body>
    </html>
  );
}
