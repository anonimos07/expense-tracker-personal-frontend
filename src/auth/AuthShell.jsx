const rows = [
  ["Groceries", "- 48.20"],
  ["Jeepney fare", "- 1.10"],
  ["Electric bill", "- 92.00"],
  ["Coffee", "- 3.75"],
  ["Freelance payment", "+ 450.00"],
];

export default function AuthShell({ title, subtitle, children }) {
  return (
    <main className="auth">
      <aside className="auth__receipt" aria-hidden="true">
        <div className="receipt">
          {/* <p className="receipt__head">Expense Tracker</p> */}
          {/* <ul>
            {rows.map(([label, amount]) => (
              <li key={label}>
                <span>{label}</span>
                <span className={amount.startsWith("+") ? "in" : ""}>{amount}</span>
              </li>
            ))}
          </ul> */}
          {/* <p className="receipt__total">
            <span>Balance</span>
            <span>304.95</span>
          </p> */}
        </div>
        {/* <p className="auth__tagline">Know where every peso goes.</p> */}
      </aside>

      <section className="auth__panel">
        <div className="auth__form-wrap">
          <h1>{title}</h1>
          <p className="auth__sub">{subtitle}</p>
          {children}
        </div>
      </section>
    </main>
  );
}