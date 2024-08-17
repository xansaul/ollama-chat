
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils";
import { FormChat, Navbar, TooltipProvider } from "@/presentation/components";
import { ThemeProvider } from "@/presentation/providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Ollama Chat",
  description: "Chatting with ollama",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body
        className={cn(
          "sm:min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>

            <Navbar />
            <div className="lg:pl-56 lg:pt-0 pt-3">
              <div className="sm:px-2 sm:h-screen h-auto flex flex-col justify-start lg:justify-center items-center">

                <div className="w-11/12 2xl:w-8/12">
                  {children}
                  <FormChat />
                </div>
              </div>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
