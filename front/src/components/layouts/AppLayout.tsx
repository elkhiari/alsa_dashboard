import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./sideBar/app-sidebar";

export function Applayout() {
  return (
    <SidebarProvider>
      <Header />
      <AppSidebar />
      <SidebarInset className="mt-[4rem]">
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
