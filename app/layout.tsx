import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "modern-normalize";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { Toaster } from "react-hot-toast";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NotesHub",
  description: "Write, edit and search your notes. ",
  openGraph: {
    title: "NoteHub",
    description: "Write, edit and search your notes. ",
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interSans.variable}`}>
        <div className="wrapper">
          <TanStackProvider>
            <AuthProvider>
              <div>
                <Toaster />
              </div>
              <Header />
              <main className="main">
                {children}
                {modal}
              </main>
              <Footer />
            </AuthProvider>
          </TanStackProvider>
        </div>
      </body>
    </html>
  );
}
