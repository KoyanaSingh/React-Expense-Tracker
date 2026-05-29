import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  const handleAdd = () => {
    if (!name || !amount) return;
    const newExpense = { id: Date.now(), name: name, amount: Number(amount) };
    setExpenses([...expenses, newExpense]);
    setName("");
    setAmount("");
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div style={{ maxWidth: "480px", margin: "2.5rem auto", fontFamily: "'Segoe UI', sans-serif", padding: "0 1rem" }}>

      {/* Total */}
      <div style={{ background: "#0f0f0f", borderRadius: "16px", padding: "1.5rem 1.75rem", marginBottom: "1rem" }}>
        <div style={{ fontSize: "12px", color: "#888", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" }}>Total Spent</div>
        <div style={{ fontSize: "36px", fontWeight: "600", color: "#fff" }}>₹{total.toLocaleString("en-IN")}</div>
        <div style={{ fontSize: "13px", color: "#555", marginTop: "6px" }}>
          {expenses.length === 0 ? "No expenses yet" : `${expenses.length} expense${expenses.length > 1 ? "s" : ""}`}
        </div>
      </div>

      {/* Form */}
      <div style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: "16px", padding: "1.25rem 1.5rem", marginBottom: "1rem" }}>
        <div style={{ fontSize: "12px", color: "#999", marginBottom: "10px", letterSpacing: "0.04em" }}>New expense</div>
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            placeholder="What did you spend on?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            style={{ flex: 1, height: "38px", padding: "0 12px", borderRadius: "10px", border: "1px solid #e8e8e8", fontSize: "14px", background: "#fafafa", outline: "none" }}
          />
          <input
            type="number"
            placeholder="₹"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            style={{ width: "80px", height: "38px", padding: "0 12px", borderRadius: "10px", border: "1px solid #e8e8e8", fontSize: "14px", background: "#fafafa", outline: "none" }}
          />
          <button
            onClick={handleAdd}
            style={{ height: "38px", padding: "0 18px", borderRadius: "10px", border: "none", background: "#0f0f0f", color: "#fff", fontSize: "14px", cursor: "pointer", fontWeight: "500" }}
          >
            Add
          </button>
        </div>
      </div>

      {/* List */}
      <div style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: "16px", overflow: "hidden" }}>
        {expenses.length === 0 ? (
          <div style={{ padding: "2rem 1.5rem", color: "#ccc", fontSize: "14px", textAlign: "center" }}>
            Your expenses will show up here
          </div>
        ) : (
          <>
            <div style={{ padding: "10px 1.5rem", fontSize: "11px", color: "#bbb", borderBottom: "1px solid #f5f5f5", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {expenses.length} expense{expenses.length > 1 ? "s" : ""}
            </div>
            {expenses.map((expense) => (
              <div
                key={expense.id}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 1.5rem", borderBottom: "1px solid #f5f5f5" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#e0e0e0" }} />
                  <span style={{ fontSize: "14px", color: "#1a1a1a" }}>{expense.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "14px", fontWeight: "500", color: "#1a1a1a" }}>
                    ₹{expense.amount.toLocaleString("en-IN")}
                  </span>
                  <button
                    onClick={() => handleDelete(expense.id)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#ccc", fontSize: "18px", lineHeight: 1, padding: "2px 4px" }}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

    </div>
  );
}

export default App;