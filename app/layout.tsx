import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bothell Way Garage | Premium Automotive Service",
  description: "Experience the next generation of car repair in Bothell, WA. Precision diagnostics, engine repair, and elite maintenance for foreign and domestic vehicles.",
  keywords: ["Bothell Way Garage", "Car Repair Bothell", "Diagnostics Bothell", "Engine Repair WA", "Premium Auto Service"],
  openGraph: {
    title: "Bothell Way Garage | Engineering Excellence",
    description: "The most advanced repair shop in Washington. Book your service today.",
    images: ["/hero.png"],
  },
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
