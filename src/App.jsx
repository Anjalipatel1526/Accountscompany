import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
// Pages (Placeholders for now, will be implemented next)
import { Dashboard } from "./pages/Dashboard";
import { Expenses } from "./pages/Expenses";
import { Budget } from "./pages/Budget";
import { Ledger } from "./pages/Ledger";
import { Reports } from "./pages/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="departments" element={<Navigate to="/expenses" replace />} /> {/* Included in Expenses */}
          <Route path="budget" element={<Budget />} />
          <Route path="ledger" element={<Ledger />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<div className="p-8"><h1 className="text-2xl font-bold">Settings</h1><p className="mt-4 text-neutral-500">Settings placeholder</p></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
