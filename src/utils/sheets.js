// Google Sheets integration utility via Google Apps Script Web App
// Replace SHEET_URL with your deployed Google Apps Script Web App URL
const SHEET_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

export async function addBillToSheet(billData) {
    try {
        const res = await fetch(SHEET_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "addBill", ...billData }),
        });
        return { success: true };
    } catch (e) {
        console.error("Sheet write error:", e);
        return { success: false, error: e.message };
    }
}

export async function getBillsFromSheet() {
    try {
        const res = await fetch(`${SHEET_URL}?action=getBills`);
        const data = await res.json();
        return { success: true, data };
    } catch (e) {
        console.error("Sheet read error:", e);
        return { success: false, error: e.message };
    }
}

export async function updateBudgetInSheet(budgetData) {
    try {
        await fetch(SHEET_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "updateBudget", ...budgetData }),
        });
        return { success: true };
    } catch (e) {
        return { success: false, error: e.message };
    }
}

// --- CSV Export Utility ---
export function exportToCSV(rows, filename = "export.csv") {
    if (!rows || rows.length === 0) return;
    const headers = Object.keys(rows[0]);
    const csvContent = [
        headers.join(","),
        ...rows.map(row =>
            headers.map(h => `"${String(row[h] ?? "").replace(/"/g, '""')}"`).join(",")
        ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// --- PDF Export using printable HTML iframe ---
export function exportToPDF(title, rows, columns) {
    if (!rows || rows.length === 0) return;
    const headerRow = columns.map(c => `<th style="padding:8px 14px;background:#fff4ec;border-bottom:2px solid #ffddbf;font-size:12px;text-transform:uppercase;color:#c05500;font-weight:700;text-align:left;">${c.label}</th>`).join("");
    const bodyRows = rows.map((row, i) =>
        `<tr style="background:${i % 2 === 0 ? "#fff" : "#fff9f5"};">${columns.map(c => `<td style="padding:9px 14px;border-bottom:1px solid #f5e6d5;font-size:13px;color:#262626;">${row[c.key] ?? ""}</td>`).join("")
        }</tr>`
    ).join("");

    const grandTotal = columns.find(c => c.isAmount)
        ? `<tr style="background:#fff4ec;font-weight:700;"><td colspan="${columns.length - 1}" style="padding:10px 14px;font-size:13px;color:#262626;text-align:right;">Grand Total</td><td style="padding:10px 14px;font-size:13px;color:#c05500;">₹${rows.reduce((s, r) => s + (Number(r[columns.find(c => c.isAmount).key]) || 0), 0).toLocaleString()}</td></tr>`
        : "";

    const html = `
    <html>
    <head>
      <title>${title}</title>
      <style>
        body { font-family: 'Inter', Arial, sans-serif; margin: 40px; color: #262626; }
        h1 { color: #ff8c38; font-size: 24px; margin-bottom: 4px; }
        p { color: #737373; font-size: 13px; margin-bottom: 24px; }
        table { width: 100%; border-collapse: collapse; }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <p>Generated on ${new Date().toLocaleDateString("en-IN", { dateStyle: "long" })} &nbsp;|&nbsp; FinAd Expense Management</p>
      <table>
        <thead><tr>${headerRow}</tr></thead>
        <tbody>${bodyRows}${grandTotal}</tbody>
      </table>
    </body>
    </html>`;

    const w = window.open("", "_blank");
    w.document.write(html);
    w.document.close();
    w.focus();
    setTimeout(() => { w.print(); }, 500);
}
