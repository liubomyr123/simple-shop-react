import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

import Header from "./Header";
import Footer from "./Footer";

export const Layout = (): JSX.Element => {
  return (
    <>
      <Header />
      <Outlet />
      <Toaster
        richColors
        theme="dark"
        toastOptions={{
          duration: 1_000,
        }}
      />
      <Footer />
    </>
  );
};
