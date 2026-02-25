import { createContext, useContext, useState, useCallback } from "react";
import { mockExpenses, mockDepartments, mockLedger } from "../utils/mockData";
import { addBillToSheet } from "../utils/sheets";

const AppContext = createContext(null);

const DEPT_COLORS = {
    "Technical Bills": "#ff8c38",
    "Salary Bills": "#f26f16",
    "Marketing Bills": "#ffc291",
    "Employee Expenses": "#ffd4b2",
    "Political Bills": "#ffe5d0",
};

const initialDeptBudgets = {
    "Technical Bills": 200000,
    "Salary Bills": 150000,
    "Marketing Bills": 80000,
    "Employee Expenses": 50000,
    "Political Bills": 50000,
};

const initialCompanies = [
    {
        id: "comp-001",
        name: "UNAI Technologies Pvt. Ltd.",
        address: "Mumbai, Maharashtra, India",
        phone: "+91 98765 43210",
        email: "accounts@unaitech.in",
        industry: "Technology",
        financialYear: "2025-2026",
        loginId: "",
        password: "",
        accountantName: "",
        accountantEmail: "",
        accountantPhone: "",
        accountantRole: "Accountant",
        companyRole: "Company Owner", // role for the company login user
    }
];

export function AppProvider({ children }) {
    const [expenses, setExpenses] = useState(mockExpenses);
    const [ledger, setLedger] = useState(mockLedger);
    const [departments, setDepartments] = useState(
        mockDepartments.map(d => ({
            id: d,
            name: d,
            label: d + " Bills",
            color: DEPT_COLORS[d + " Bills"] || "#ff8c38",
        }))
    );
    const [deptBudgets, setDeptBudgets] = useState(initialDeptBudgets);
    const [totalBudget, setTotalBudget] = useState(500000);
    const [toast, setToast] = useState(null);
    const [companies, setCompanies] = useState(initialCompanies);
    const [activeCompanyId, setActiveCompanyId] = useState("comp-001");
    const [currentRole, setCurrentRole] = useState("Company"); // Company | Accountant | Viewer

    const showToast = useCallback((message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }, []);

    const addExpense = useCallback(async (billData) => {
        const newId = `EXP-${String(expenses.length + 1).padStart(3, "0")}`;
        const newBill = { id: newId, ...billData, uploader: "Admin" };
        setExpenses(prev => [newBill, ...prev]);

        // Add running balance ledger entry
        const lastBalance = ledger[0]?.balance || totalBudget;
        const newLedgerEntry = {
            id: `L-${String(ledger.length + 1).padStart(3, "0")}`,
            date: billData.date,
            department: billData.department,
            type: "Debit",
            amount: billData.amount,
            balance: lastBalance - billData.amount,
            remarks: billData.description,
        };
        setLedger(prev => [newLedgerEntry, ...prev]);

        // Push to Google Sheets (fires in background)
        await addBillToSheet(newBill);
        showToast("Bill added successfully!", "success");
        return newBill;
    }, [expenses, ledger, totalBudget, showToast]);

    const deleteExpense = useCallback((id) => {
        setExpenses(prev => prev.filter(e => e.id !== id));
        showToast("Bill deleted.", "info");
    }, [showToast]);

    const updateExpense = useCallback((id, updates) => {
        setExpenses(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
        showToast("Bill updated.", "success");
    }, [showToast]);

    const addDepartment = useCallback((name) => {
        const label = name.trim().endsWith("Bills") ? name.trim() : name.trim() + " Bills";
        setDepartments(prev => [...prev, {
            id: label,
            name: name.trim(),
            label,
            color: "#ff8c38",
        }]);
        setDeptBudgets(prev => ({ ...prev, [label]: 0 }));
        showToast(`Department "${name}" added.`, "success");
    }, [showToast]);

    const deleteDepartment = useCallback((id) => {
        setDepartments(prev => prev.filter(d => d.id !== id));
        showToast("Department removed.", "info");
    }, [showToast]);

    const updateDeptBudget = useCallback((deptLabel, amount) => {
        setDeptBudgets(prev => ({ ...prev, [deptLabel]: Number(amount) }));
    }, []);

    const addCompany = useCallback((data) => {
        const id = `comp-${Date.now()}`;
        setCompanies(prev => [...prev, { id, ...data }]);
        showToast(`Company "${data.name}" added.`, "success");
        return id;
    }, [showToast]);

    const updateCompany = useCallback((id, updates) => {
        setCompanies(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
        showToast("Company details saved.", "success");
    }, [showToast]);

    const deleteCompany = useCallback((id) => {
        setCompanies(prev => {
            const remaining = prev.filter(c => c.id !== id);
            if (activeCompanyId === id && remaining.length > 0) setActiveCompanyId(remaining[0].id);
            return remaining;
        });
        showToast("Company removed.", "info");
    }, [activeCompanyId, showToast]);

    const totalSpent = expenses.reduce((s, e) => s + Number(e.amount), 0);
    const activeCompany = companies.find(c => c.id === activeCompanyId) || companies[0] || null;

    // Permission helpers
    const canDelete = currentRole === "Company";
    const canAdd = currentRole === "Company" || currentRole === "Accountant";
    const canView = true;

    return (
        <AppContext.Provider value={{
            expenses, ledger, departments, deptBudgets, totalBudget,
            totalSpent, toast,
            addExpense, deleteExpense, updateExpense,
            addDepartment, deleteDepartment,
            updateDeptBudget, setTotalBudget,
            companies, activeCompanyId, activeCompany,
            addCompany, updateCompany, deleteCompany, setActiveCompanyId,
            currentRole, setCurrentRole,
            canDelete, canAdd, canView,
            showToast,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export const useApp = () => useContext(AppContext);
