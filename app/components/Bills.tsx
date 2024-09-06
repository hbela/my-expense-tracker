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
import { deleteBill } from "@/app/actions/billActions";

interface BillsProps {
  page?: number;
  pageSize?: number;
}

interface Bill {
  id: number;
  name: string;
  amount: number;
  dueDate: Date;
  payee: string;
}

export default async function Bills({ page = 1, pageSize = 10 }: BillsProps) {
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
      <div className="flex justify-between mt-4">
        <Button disabled={currentPage <= 1} asChild>
          <Link href={`/bills?page=${currentPage - 1}`}>Previous</Link>
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button disabled={currentPage >= totalPages} asChild>
          <Link href={`/bills?page=${currentPage + 1}`}>Next</Link>
        </Button>
      </div>
    </div>
  );
}
