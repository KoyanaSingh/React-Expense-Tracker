import { useState } from "react";

function pickIcon(name) {
  const n = name.toLowerCase();
  if (/food|lunch|dinner|breakfast|eat|meal|resto|restaurant|pizza|burger|biryani|dosa|chai|tea|coffee|snack|sweets|mithai/.test(n)) return "🍽️";
  if (/auto|cab|uber|ola|bus|metro|train|travel|ride|petrol|fuel|parking|flight|ticket/.test(n)) return "🚗";
  if (/grocery|groceries|vegetables|sabzi|milk|dairy|fruit|kirana/.test(n)) return "🛒";
  if (/mobile|phone|recharge|internet|wifi|data|broadband/.test(n)) return "📱";
  if (/shopping|clothes|shirt|jeans|shoes|amazon|flipkart|mall|dress/.test(n)) return "🛍️";
  if (/rent|house|flat|pg|maintenance|electricity|bill|water|gas/.test(n)) return "🏠";
  if (/medicine|medical|doctor|pharmacy|hospital|chemist|health/.test(n)) return "💊";
  if (/movie|netflix|spotify|subscription|ott|show|game/.test(n)) return "🎬";
  if (/salon|haircut|grooming|spa|parlour/.test(n)) return "✂️";
  if (/gym|fitness|yoga|sport/.test(n)) return "💪";
  if (/book|course|class|tuition|education|stationery/.test(n)) return "📚";
  return "💸";
}
function fmt(n) { return "₹" + Math.round(n).toLocaleString("en-IN"); }

function App() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  const handleAdd = () => {
    if (!name || !amount || Number(amount) <= 0) return;
    setExpenses([...expenses, { id: Date.now(), name, amount: Number(amount), icon: pickIcon(name) }]);
    setName("");
    setAmount("");
  };

  const handleDelete = (id) => setExpenses(expenses.filter((e) => e.id !== id));
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const inputStyle = {
    height: "40px", padding: "0 12px", borderRadius: "10px",
    border: "1.5px solid #F0F0F0", background: "#FAFAFA",
    fontSize: "14px", outline: "none",
  };

  return (
    <div style={{ maxWidth: "460px", margin: "2.5rem auto", fontFamily: "'Segoe UI', sans-serif", padding: "0 1rem" }}>

      {/* Total card */}
      <div style={{ background: "#4F46E5", borderRadius: "20px", padding: "1.75rem", marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: "8px" }}>Total Spent</div>
            <div style={{ fontSize: "42px", fontWeight: "500", color: "#fff", lineHeight: 1 }}>{fmt(total)}</div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginTop: "8px" }}>
              {expenses.length === 0 ? "No expenses yet" : `${expenses.length} expense${expenses.length > 1 ? "s" : ""}`}
            </div>
          </div>
          <div style={{ width: "44px", height: "44px", background: "rgba(255,255,255,0.15)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>
            👛
          </div>
        </div>
      </div>

      {/* Form */}
      <div style={{ background: "#fff", border: "1px solid #EBEBEB", borderRadius: "16px", padding: "1.25rem", marginBottom: "1rem" }}>
        <div style={{ fontSize: "12px", color: "#999", marginBottom: "10px" }}>Add a new expense</div>
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            placeholder="What did you spend on?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            style={{ ...inputStyle, flex: 1 }}
          />
          <input
            type="number"
            placeholder="₹ Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            style={{ ...inputStyle, width: "100px" }}
          />
          <button
            onClick={handleAdd}
            aria-label="Add expense"
            style={{ height: "40px", width: "40px", borderRadius: "10px", border: "none", background: "#4F46E5", color: "#fff", fontSize: "22px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
          >
            +
          </button>
        </div>
      </div>

      {/* List */}
      <div style={{ background: "#fff", border: "1px solid #EBEBEB", borderRadius: "16px", overflow: "hidden" }}>
        <div style={{ padding: "11px 1.25rem", borderBottom: "1px solid #F5F5F5", fontSize: "11px", color: "#bbb", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          {expenses.length ? `Expenses · ${expenses.length}` : "Expenses"}
        </div>
        {expenses.length === 0 ? (
          <div style={{ padding: "2.5rem 1.25rem", textAlign: "center" }}>
            <div style={{ fontSize: "32px", marginBottom: "8px" }}>🧾</div>
            <div style={{ fontSize: "14px", color: "#ccc" }}>Your expenses will appear here</div>
          </div>
        ) : (
          expenses.map((e) => (
            <div key={e.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 1.25rem", borderBottom: "1px solid #F7F7F7" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: "#F3F2FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>
                  {e.icon}
                </div>
                <span style={{ fontSize: "14px", color: "#1a1a1a" }}>{e.name}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "14px", fontWeight: "500", color: "#1a1a1a" }}>{fmt(e.amount)}</span>
                <button
                  onClick={() => handleDelete(e.id)}
                  aria-label={`Delete ${e.name}`}
                  style={{ width: "30px", height: "30px", borderRadius: "8px", border: "none", background: "#FEF2F2", color: "#F87171", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default App;