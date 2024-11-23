import { Toaster } from "sonner";
// eslint-disable-next-line camelcase
import { Host_Grotesk } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SessionProvider from "../components/SessionProvider";

const hostgrotesk = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-hostgrotesk",
});

export const metadata = {
  title: "Visivo - Multimodal AI Assistant",
  description:
    "An innovative AI assistant for visual analysis and speech synthesis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={`${hostgrotesk.variable} font-sans`}>
          <Toaster
            className="toaster"
            expand={true}
            position="bottom-right"
            visibleToasts={5}
            toastOptions={{
              unstyled: true,
              classNames: {
                icon: "mr-4",
                loading:
                  "ml-16 flex items-center rounded-lg border border-white/20 bg-white/10 px-3 py-3 text-white backdrop-blur-md",
                error:
                  "ml-16 flex items-center rounded-lg border border-red-600 bg-red-200 px-4 py-3 text-red-900 shadow-md",
                success:
                  "ml-16 flex items-center rounded-lg border border-green-600 bg-green-200 px-4 py-3 text-green-900 shadow-md",
                warning:
                  "ml-16 flex items-center rounded-lg border border-yellow-600 bg-yellow-200 px-4 py-3 text-yellow-900 shadow-md",
                info: "ml-16 flex items-center rounded-lg border border-gray-600 bg-gray-200 px-4 py-3 text-gray-900 shadow-md",
              },
            }}
          />
          <Header />
          <main className="mx-auto">{children}</main>
          <Footer />
        </body>
      </SessionProvider>
    </html>
  );
}
