import { DashboardSidebar } from "@/components/dashboard-sidebar";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-[1280px] grid-cols-1 md:grid-cols-[225px_minmax(0,1fr)]">
      <DashboardSidebar />
      <div className="min-w-0 px-[18px] py-[27px] md:px-6 md:py-[37px] xl:px-[58px] xl:pb-[70px]">{children}</div>
    </div>
  );
}
