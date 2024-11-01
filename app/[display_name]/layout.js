import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/context/user.context";
import Navbar from "@/components/navbar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <UserProvider>
        <Navbar />
        {children}
        <Toaster />
      </UserProvider>
    </>
  );
}
