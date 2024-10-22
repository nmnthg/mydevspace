import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "MyDevSpace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
