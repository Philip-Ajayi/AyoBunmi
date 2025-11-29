import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "OA Affairs",
  description: "The Holy Matrimony of Fadekemi Oluwabunmi and Ayobami Akorede",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
