import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "DedxDebt - Debt Tracker",
    template: "%s - DedxDebt",
  },
  description: "DedxDebt is a simple debt tracker.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="w-full sticky top-0 left-0 backdrop-filter backdrop-blur-lg bg-opacity-30 border-b z-10">
            {/* <Navbar /> */}
            Navbar
          </div>
          <main className="max-w-3xl mx-auto px-4 min-h-full">{children}</main>
          <div className="w-full border-t mt-16">{/* <Footer /> */} Footer</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
