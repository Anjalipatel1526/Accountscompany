export const mockBudget = {
    total: 500000,
    spent: 125430,
};

export const mockDepartments = [
    "Technical",
    "Salary",
    "Marketing",
    "Employee Expenses",
    "Political"
];

export const mockExpenses = [
    { id: "EXP-001", date: "2026-02-23", department: "Technical Bills", description: "AWS Cloud Hosting - Jan", amount: 45000, status: "Paid", uploader: "Admin" },
    { id: "EXP-002", date: "2026-02-22", department: "Salary Bills", description: "Contractor Payout - Rajesh", amount: 35000, status: "Pending", uploader: "Admin" },
    { id: "EXP-003", date: "2026-02-20", department: "Marketing Bills", description: "Google Ads Campaign", amount: 20000, status: "Paid", uploader: "Admin" },
    { id: "EXP-004", date: "2026-02-18", department: "Political Bills", description: "Event Sponsorship", amount: 15000, status: "Paid", uploader: "Admin" },
    { id: "EXP-005", date: "2026-02-15", department: "Employee Expenses", description: "Team Lunch - Q1", amount: 10430, status: "Rejected", uploader: "Admin" },
    { id: "EXP-006", date: "2026-02-12", department: "Technical Bills", description: "Software Licenses", amount: 5000, status: "Paid", uploader: "Admin" },
];

export const mockLedger = [
    { id: "L-001", date: "2026-02-23", department: "Technical Bills", type: "Debit", amount: 45000, balance: 374570, remarks: "AWS Payment" },
    { id: "L-002", date: "2026-02-22", department: "Budget Add", type: "Credit", amount: 100000, balance: 419570, remarks: "Q1 Top up" },
    { id: "L-003", date: "2026-02-20", department: "Marketing Bills", type: "Debit", amount: 20000, balance: 319570, remarks: "Ad spend" },
    { id: "L-004", date: "2026-02-18", department: "Political Bills", type: "Debit", amount: 15000, balance: 339570, remarks: "Sponsorship" },
    { id: "L-005", date: "2026-02-15", department: "Salary Bills", type: "Debit", amount: 35000, balance: 354570, remarks: "Contractor" },
];

export const expenseChartData = [
    { name: '1 Feb', expenses: 15000 },
    { name: '5 Feb', expenses: 32000 },
    { name: '10 Feb', expenses: 20000 },
    { name: '15 Feb', expenses: 45000 },
    { name: '20 Feb', expenses: 20000 },
    { name: '25 Feb', expenses: 10000 },
];

export const departmentPieData = [
    { name: 'Technical', value: 45000, fill: '#ff8c38' },
    { name: 'Salary', value: 35000, fill: '#ffc291' },
    { name: 'Marketing', value: 20000, fill: '#ffd4b2' },
    { name: 'Employee', value: 10430, fill: '#ffe5d0' },
    { name: 'Political', value: 15000, fill: '#f26f16' },
];
