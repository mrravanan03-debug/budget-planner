# 💰 Budget Planner

A minimalist, dark-mode Budget Planner app that helps you track income and expenses with real-time visualizations. All data is stored locally in your browser — no sign-up, no server, no tracking.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)
![Recharts](https://img.shields.io/badge/Recharts-3-ff7300?logo=recharts)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

- **Dashboard Summary Cards** — Total Balance, Income, and Expenses at a glance with color-coded indicators
- **Interactive Bar Chart** — Compare Income vs Expenses over the last 6 months using Recharts
- **Transaction Management** — Add new transactions with description, amount, category, and date; delete with one click
- **Income / Expense Toggle** — Switch between income and expense types with dynamic category dropdowns
- **LocalStorage Persistence** — All data is saved in the browser and survives page refreshes
- **Dark Mode Aesthetic** — Sleek dark theme with emerald green for income and red for expenses
- **Mobile Responsive** — Fully responsive layout that works on desktop, tablet, and mobile
- **Sample Data** — Comes pre-loaded with sample transactions so you can explore immediately

---

## 🖼️ Screenshots

### Dashboard View
- Summary cards with gradient top bars showing Balance, Income, and Expenses
- Bar chart visualizing monthly income vs expenses
- Recent transactions list with hover-to-delete functionality

### Transaction Form
- Income/Expense toggle with color-coded buttons
- Category dropdown that changes based on transaction type
- Date picker defaulting to today

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 16** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling |
| **shadcn/ui** | Pre-built accessible UI components |
| **Recharts 3** | Data visualization (bar charts) |
| **Lucide Icons** | Clean, consistent icon set |
| **LocalStorage** | Client-side data persistence |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles + dark mode CSS variables
│   ├── layout.tsx           # Root layout with dark mode
│   └── page.tsx             # Main page composing Dashboard + Form
├── components/
│   ├── ui/                  # shadcn/ui components (Card, Button, Input, Select, etc.)
│   ├── Dashboard.tsx        # Summary cards, bar chart, transaction list
│   └── TransactionForm.tsx  # Add transaction form with type toggle
├── hooks/
│   └── useLocalStorage.ts   # Custom hook for localStorage persistence
└── lib/
    └── utils.ts             # Utility functions (cn helper)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ or **Bun** runtime
- **npm**, **yarn**, or **bun** package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/mrravanan03-debug/budget-planner.git

# Navigate to the project directory
cd budget-planner

# Install dependencies
npm install
# or
bun install

# Start the development server
npm run dev
# or
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

## 📖 How It Works

### Adding a Transaction

1. Choose **Income** or **Expense** using the toggle buttons
2. Enter a **description** (e.g., "Monthly Salary")
3. Enter the **amount** in INR (₹)
4. Select a **category** from the dropdown (categories change based on type)
5. Pick a **date** (defaults to today)
6. Click **"Add Income"** or **"Add Expense"**

### Deleting a Transaction

- Hover over any transaction in the list
- Click the **trash icon** that appears on the right
- The transaction is immediately removed and totals update

### Data Persistence

- All transactions are stored in the browser's **LocalStorage**
- Data persists across page refreshes and browser restarts
- Clearing browser data will reset to sample transactions

---

## 🎨 Design System

| Element | Color |
|---------|-------|
| **Income** | Emerald Green (`#10b981`) |
| **Expenses** | Red (`#ef4444`) |
| **Background** | Deep Dark (`oklch(0.12)`) |
| **Cards** | Dark Elevated (`oklch(0.17)`) |
| **Text** | Near White (`oklch(0.985)`) |
| **Muted Text** | Gray (`oklch(0.65)`) |

---

## 📂 Categories

### Income Categories
Salary, Freelance, Investments, Business, Rental, Other Income

### Expense Categories
Food & Dining, Transportation, Housing, Utilities, Healthcare, Entertainment, Shopping, Education, Travel, Other Expense

---

## 🔧 Customization

### Changing Currency

Edit the `formatCurrency` function in `src/components/Dashboard.tsx`:

```typescript
const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {  // Change locale
    style: "currency",
    currency: "USD",                 // Change currency code
  }).format(amount);
```

### Adding Categories

Edit the category arrays in `src/components/TransactionForm.tsx`:

```typescript
const INCOME_CATEGORIES = ["Salary", "Freelance", "Your New Category"];
const EXPENSE_CATEGORIES = ["Food & Dining", "Your New Category"];
```

### Switching to Light Mode

Remove `className="dark"` from `<html>` in `src/app/layout.tsx`.

---

## 📄 License

This project is licensed under the MIT License — feel free to use, modify, and distribute.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/mrravanan03-debug">Ramanan P</a>
</p>
