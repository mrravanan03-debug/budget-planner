"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Trash2,
  ArrowUpCircle,
  ArrowDownCircle,
  Receipt,
} from "lucide-react";
import type { Transaction } from "./TransactionForm";

interface DashboardProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Custom tooltip for the bar chart — declared outside render
function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border rounded-lg px-4 py-3 shadow-xl">
        <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export function Dashboard({ transactions, onDeleteTransaction }: DashboardProps) {
  // Summary calculations
  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
    };
  }, [transactions]);

  // Chart data: Income vs Expenses over the last 6 months
  const chartData = useMemo(() => {
    const now = new Date();
    const months: { key: string; label: string; income: number; expenses: number }[] = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const year = d.getFullYear();
      const month = d.getMonth();
      const key = `${year}-${String(month + 1).padStart(2, "0")}`;
      const label = d.toLocaleDateString("en-IN", {
        month: "short",
        year: "2-digit",
      });

      const monthIncome = transactions
        .filter((t) => {
          const tDate = new Date(t.date + "T00:00:00");
          return t.type === "income" && tDate.getFullYear() === year && tDate.getMonth() === month;
        })
        .reduce((sum, t) => sum + t.amount, 0);

      const monthExpenses = transactions
        .filter((t) => {
          const tDate = new Date(t.date + "T00:00:00");
          return t.type === "expense" && tDate.getFullYear() === year && tDate.getMonth() === month;
        })
        .reduce((sum, t) => sum + t.amount, 0);

      months.push({ key, label, income: monthIncome, expenses: monthExpenses });
    }

    return months;
  }, [transactions]);

  // Recent transactions (sorted by date, newest first)
  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);
  }, [transactions]);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Balance */}
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Total Balance</p>
                <p className={`text-2xl font-bold tracking-tight ${balance >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {formatCurrency(balance)}
                </p>
              </div>
              <div className="size-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Wallet className="size-6 text-emerald-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Income */}
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-green-400" />
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Total Income</p>
                <p className="text-2xl font-bold tracking-tight text-emerald-400">
                  {formatCurrency(totalIncome)}
                </p>
              </div>
              <div className="size-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="size-6 text-emerald-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Expenses */}
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-rose-400" />
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold tracking-tight text-red-400">
                  {formatCurrency(totalExpenses)}
                </p>
              </div>
              <div className="size-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                <TrendingDown className="size-6 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bar Chart - Income vs Expenses */}
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Receipt className="size-5 text-primary" />
            Income vs Expenses — Last 6 Months
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis
                  dataKey="label"
                  tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value: number) =>
                    `₹${value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}`
                  }
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}
                />
                <Bar
                  dataKey="income"
                  name="Income"
                  fill="#10b981"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={48}
                />
                <Bar
                  dataKey="expenses"
                  name="Expenses"
                  fill="#ef4444"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={48}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Receipt className="size-5 text-primary" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="size-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                <Receipt className="size-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm font-medium">No transactions yet</p>
              <p className="text-muted-foreground/70 text-xs mt-1">
                Add your first transaction using the form
              </p>
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-background/40 hover:bg-background/70 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className={`size-9 rounded-lg flex items-center justify-center shrink-0 ${
                        transaction.type === "income"
                          ? "bg-emerald-500/10"
                          : "bg-red-500/10"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <ArrowUpCircle className="size-4 text-emerald-500" />
                      ) : (
                        <ArrowDownCircle className="size-4 text-red-500" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.category} &middot; {formatDate(transaction.date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`text-sm font-semibold ${
                        transaction.type === "income"
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                      onClick={() => onDeleteTransaction(transaction.id)}
                      aria-label={`Delete transaction: ${transaction.description}`}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
