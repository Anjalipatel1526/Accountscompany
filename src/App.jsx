import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { Layout } from "./components/layout/Layout";
import { Toast } from "./components/ui/Toast";
import { Dashboard } from "./pages/Dashboard";
import { Expenses } from "./pages/Expenses";
import { Departments } from "./pages/Departments";
import { DepartmentDetail } from "./pages/DepartmentDetail";
import { Budget } from "./pages/Budget";
import { Ledger } from "./pages/Ledger";
import { Reports } from "./pages/Reports";
import { Settings } from "./pages/Settings";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="departments" element={<Departments />} />
            <Route path="departments/:label" element={<DepartmentDetail />} />
            <Route path="budget" element={<Budget />} />
            <Route path="ledger" element={<Ledger />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
        <Toast />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
