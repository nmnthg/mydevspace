import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/context/user.context";
import Head from 'next/head';

export const metadata = {
  title: "MyDevSpace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {children}
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
