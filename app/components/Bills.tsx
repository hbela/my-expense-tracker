import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/lib/prisma";
import AddBill from "./AddBill";
import EditBill from "./EditBill";
import DeleteBillDialog from "./DeleteBillDialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

//import { useTranslations } from "next-intl";
//import { unstable_setRequestLocale } from "next-intl/server";

interface BillsProps {
  page?: number;
  pageSize?: number;
  locale: string;
}

interface Bill {
  id: number;
  name: string;
  amount: number;
  dueDate: Date;
  payee: string;
}

export default async function Bills({
  page = 1,
  pageSize = 3,
  locale,
}: BillsProps) {
  // unstable_setRequestLocale(locale);
  // const t = useTranslations();
  const skip = (page - 1) * pageSize;
  const bills = await prisma.bill.findMany({
    skip,
    take: pageSize,
    orderBy: { dueDate: "asc" },
  });
  const currentPage = Number(page);
  const totalBills = await prisma.bill.count();
  const totalPages = Math.ceil(totalBills / pageSize);

  return (
    <div>
      <AddBill />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-1">
        {bills.map((bill: Bill) => (
          <Card key={bill.id}>
            <CardHeader>
              <CardTitle>{bill.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Amount: ${bill.amount}</p>
              <p>Due Date: {bill.dueDate.toLocaleDateString()}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <EditBill bill={bill} />
              <DeleteBillDialog billId={bill.id} billName={bill.name} />
            </CardFooter>
          </Card>
        ))}
      </div>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`/?page=${currentPage - 1}`}
              aria-disabled={currentPage <= 1}
              tabIndex={currentPage <= 1 ? -1 : undefined}
              className={
                currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
              }
            />
          </PaginationItem>

          {/* Add page numbers here if needed */}
          <PaginationItem>
            <PaginationLink href={`/?page=${currentPage}`} isActive>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href={`/?page=${currentPage + 1}`}
              aria-disabled={currentPage >= totalPages}
              tabIndex={currentPage >= totalPages ? -1 : undefined}
              className={
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
