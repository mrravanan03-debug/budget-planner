"use client";

import { useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Dashboard } from "@/components/Dashboard";
import { TransactionForm, type Transaction } from "@/components/TransactionForm";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: "sample-1",
    description: "Monthly Salary",
    amount: 75000,
    category: "Salary",
    type: "income",
    date: "2026-06-01",
  },
  {
    id: "sample-2",
    description: "Freelance Web Project",
    amount: 25000,
    category: "Freelance",
    type: "income",
    date: "2026-06-05",
  },
  {
    id: "sample-3",
    description: "House Rent",
    amount: 18000,
    category: "Housing",
    type: "expense",
    date: "2026-06-01",
  },
  {
    id: "sample-4",
    description: "Grocery Shopping",
    amount: 4500,
    category: "Food & Dining",
    type: "expense",
    date: "2026-06-03",
  },
  {
    id: "sample-5",
    description: "Electricity Bill",
    amount: 2800,
    category: "Utilities",
    type: "expense",
    date: "2026-06-04",
  },
  {
    id: "sample-6",
    description: "Investment Dividend",
    amount: 12000,
    category: "Investments",
    type: "income",
    date: "2026-05-15",
  },
  {
    id: "sample-7",
    description: "Netflix & Spotify",
    amount: 1200,
    category: "Entertainment",
    type: "expense",
    date: "2026-05-20",
  },
  {
    id: "sample-8",
    description: "April Salary",
    amount: 75000,
    category: "Salary",
    type: "income",
    date: "2026-04-01",
  },
  {
    id: "sample-9",
    description: "Car Service",
    amount: 6500,
    category: "Transportation",
    type: "expense",
    date: "2026-04-10",
  },
  {
    id: "sample-10",
    description: "Online Course",
    amount: 3500,
    category: "Education",
    type: "expense",
    date: "2026-05-12",
  },
  {
    id: "sample-11",
    description: "March Salary",
    amount: 75000,
    category: "Salary",
    type: "income",
    date: "2026-03-01",
  },
  {
    id: "sample-12",
    description: "Dining Out",
    amount: 3200,
    category: "Food & Dining",
    type: "expense",
    date: "2026-03-15",
  },
  {
    id: "sample-13",
    description: "February Salary",
    amount: 75000,
    category: "Salary",
    type: "income",
    date: "2026-02-01",
  },
  {
    id: "sample-14",
    description: "Medical Checkup",
    amount: 5000,
    category: "Healthcare",
    type: "expense",
    date: "2026-02-18",
  },
  {
    id: "sample-15",
    description: "January Salary",
    amount: 75000,
    category: "Salary",
    type: "income",
    date: "2026-01-01",
  },
  {
    id: "sample-16",
    description: "New Clothes",
    amount: 7000,
    category: "Shopping",
    type: "expense",
    date: "2026-01-20",
  },
];

export default function Home() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
    "budget-planner-transactions",
    SAMPLE_TRANSACTIONS
  );

  const handleAddTransaction = useCallback(
    (transaction: Transaction) => {
      setTransactions((prev) => [...prev, transaction]);
    },
    [setTransactions]
  );

  const handleDeleteTransaction = useCallback(
    (id: string) => {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    },
    [setTransactions]
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Sparkles className="size-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground tracking-tight">
                  Budget Planner
                </h1>
                <p className="text-xs text-muted-foreground">
                  Track your finances effortlessly
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs font-normal text-muted-foreground border-border/50">
              {transactions.length} transactions
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Dashboard - Left / Main area */}
          <div className="lg:col-span-8">
            <Dashboard
              transactions={transactions}
              onDeleteTransaction={handleDeleteTransaction}
            />
          </div>

          {/* Transaction Form - Right sidebar */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <TransactionForm onAddTransaction={handleAddTransaction} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-xs text-muted-foreground/60">
            Budget Planner — Your data is stored locally in the browser
          </p>
        </div>
      </footer>
    </div>
  );
}
