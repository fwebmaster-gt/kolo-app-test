import type { Metadata } from "next";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/constants/theme";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kolo App",
  description: "Prueba tecnica de kolo-app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="root" lang="es">
      <body suppressHydrationWarning={true} className="app_layout">
        <Toaster />
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <NextTopLoader showSpinner={false} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
