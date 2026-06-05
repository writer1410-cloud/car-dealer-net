import { CustomerHeader } from "@/components/CustomerHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function CustomerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-full flex flex-col flex-1">
      <CustomerHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
