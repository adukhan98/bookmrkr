import { QuickSaveForm } from "@/components/dashboard/quick-save-form";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  return (
    <div className="flex flex-1 items-center justify-center py-10">
      <QuickSaveForm />
    </div>
  );
}
