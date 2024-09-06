import AddBill from "@/app/components/AddBill";
import Bills from "@/app/components/Bills";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page =
    typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Bill Management App</h1>

      <Bills page={page} />
    </main>
  );
}
