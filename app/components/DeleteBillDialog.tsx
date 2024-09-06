"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { deleteBill } from "@/app/actions/billActions";

interface DeleteBillDialogProps {
  billId: number;
  billName: string;
}

function DeleteBillDialog({ billId, billName }: DeleteBillDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteBill(billId);
    if (result.success) {
      console.log(`Bill ${billId} deleted.`);
      // Show success message and potentially refresh the bills list
    } else {
      console.error("DeleteBill Error: ", result.error);
      // Show error message
    }
    setIsDeleting(false);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="secondary"
          className="hover:bg-secondary-foreground/10 transition-colors duration-200"
        >
          {" "}
          <span className="text-destructive">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your bill
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : `Delete ${billName}`}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteBillDialog;
