import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/context/user.context";

export const metadata = {
  title: "MyDevSpace",
  icons: {
    icon: '@\public\logo.png'
  }
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
