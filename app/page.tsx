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
    <main className="container mx-auto p-4 flex flex-col items-center">
      <Bills page={page} />
    </main>
  );
}
