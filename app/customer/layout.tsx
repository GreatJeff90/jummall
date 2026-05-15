import CustomerSidebar from ".././components/dashboard/CustomerSidebar";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#F8FBFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <CustomerSidebar />
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}