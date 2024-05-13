import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNavbar from "@/components/BottomNavbar";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "DedxDebt - Debt Manager",
    template: "%s - DedxDebt",
  },
  description: "DedxDebt is a simple debt manager.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="w-full sticky top-0 left-0 backdrop-filter backdrop-blur-lg bg-opacity-30 border-b z-20">
              <Navbar />
            </div>
            <main className="max-w-3xl mx-auto my-5 px-4 min-h-[100vh] mb-20 sm:mb-0">
              {children}
            </main>
            <Toaster richColors position="top-right" closeButton />
            <div className="fixed bottom-0 w-full z-10 backdrop-filter backdrop-blur-lg bg-opacity-30 border-t sm:hidden">
              <BottomNavbar />
            </div>
            <div className="w-full border-t mt-16 hidden sm:block">
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
