"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { editBill } from "@/app/actions/billActions";
import { FormSchema, FormSchemaType } from "@/lib/formSchema";
import { useToast } from "@/hooks/use-toast";
// ... keep your existing formSchema and FormData type definitions

interface EditBillProps {
  bill: {
    id: number;
    name: string;
    amount: number;
    dueDate: Date;
    payee: string;
  };
}

type FormDataEdit = FormSchemaType & { id: number };

export default function EditBill({ bill }: EditBillProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<FormDataEdit>({
    //type
    resolver: zodResolver(FormSchema), //schema
    defaultValues: {
      name: bill.name,
      amount: bill.amount,
      dueDate: format(bill.dueDate, "yyyy-MM-dd"),
      payee: bill.payee,
    },
  });

  const onSubmit = async (data: FormDataEdit) => {
    //type
    const formData = new FormData();
    formData.append("id", bill.id.toString());
    formData.append("name", data.name);
    formData.append("amount", data.amount.toString());
    formData.append("dueDate", data.dueDate);
    formData.append("payee", data.payee);

    const result = await editBill(formData);
    if (result.success) {
      form.reset();
      setOpen(false);
      toast({
        title: "Success",
        description: "Bill edited successfully",
        variant: "default",
      });
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to edit bill",
        variant: "destructive",
      });
      console.error("EditBill Error: ", result.error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="hover:bg-secondary-foreground/10 transition-colors duration-200"
        >
          <span className="text-primary">Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Bill</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Add your form fields here, similar to AddBill */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bill Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter bill name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? "" : parseFloat(value));
                      }}
                      step="0.01"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => field.onChange(date?.toISOString())}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="payee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payee</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter payee information" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save Changes</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
