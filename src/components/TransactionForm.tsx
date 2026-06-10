"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  date: string;
}

const INCOME_CATEGORIES = [
  "Salary",
  "Freelance",
  "Investments",
  "Business",
  "Rental",
  "Other Income",
];

const EXPENSE_CATEGORIES = [
  "Food & Dining",
  "Transportation",
  "Housing",
  "Utilities",
  "Healthcare",
  "Entertainment",
  "Shopping",
  "Education",
  "Travel",
  "Other Expense",
];

interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void;
}

export function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);

  const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);
    if (!description.trim() || isNaN(parsedAmount) || parsedAmount <= 0 || !category || !date) {
      return;
    }

    const transaction: Transaction = {
      id: crypto.randomUUID(),
      description: description.trim(),
      amount: parsedAmount,
      category,
      type,
      date,
    };

    onAddTransaction(transaction);

    // Reset form
    setDescription("");
    setAmount("");
    setCategory("");
    setDate(new Date().toISOString().split("T")[0]);
  };

  const handleTypeChange = (newType: "income" | "expense") => {
    setType(newType);
    setCategory(""); // Reset category when type changes
  };

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Plus className="size-5 text-primary" />
          Add Transaction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type Toggle */}
          <div className="flex gap-2">
            <Button
              type="button"
              variant={type === "income" ? "default" : "outline"}
              className={
                type === "income"
                  ? "flex-1 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20"
                  : "flex-1"
              }
              onClick={() => handleTypeChange("income")}
            >
              <ArrowUpCircle className="size-4" />
              Income
            </Button>
            <Button
              type="button"
              variant={type === "expense" ? "default" : "outline"}
              className={
                type === "expense"
                  ? "flex-1 bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20"
                  : "flex-1"
              }
              onClick={() => handleTypeChange("expense")}
            >
              <ArrowDownCircle className="size-4" />
              Expense
            </Button>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-muted-foreground">
              Description
            </label>
            <Input
              placeholder="e.g. Monthly rent payment"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-background/50"
            />
          </div>

          {/* Amount */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-muted-foreground">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                ₹
              </span>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0.01"
                step="0.01"
                className="pl-7 bg-background/50"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-muted-foreground">
              Category
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full bg-background/50">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-muted-foreground">
              Date
            </label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-background/50"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className={`w-full font-semibold transition-all duration-200 ${
              type === "income"
                ? "bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20"
                : "bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/20"
            } text-white`}
          >
            <Plus className="size-4" />
            Add {type === "income" ? "Income" : "Expense"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
