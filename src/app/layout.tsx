
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar, TooltipProvider } from "@/presentation/components";
import { ThemeProvider } from "@/presentation/providers";
import { getChats } from "@/actions/get-chats.action";

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

  const chats = await getChats();
  
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
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

            <Navbar chats={chats} />
            <div className="pl-56">

              {children}


            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
