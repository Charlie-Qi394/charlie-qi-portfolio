const directory = `${import.meta.env.BASE_URL}projects/formulation-supply-planner/`;

export function SupplyPlannerPreview() {
  return <div className="planner-preview">
    <span className="eyebrow">EXCEL / VBA / CONSTRAINED OPTIMISATION</span>
    <h3>Plan around stock.<br/>See the cost impact.</h3>
    <div className="planner-metrics">
      <div><span>Two independent modes</span><strong>Supply + cost</strong></div>
      <div><span>Saved scenarios</span><strong>5 snapshots</strong></div>
    </div>
    <p>Original vs optimised ingredient demand. Stock limits stay binding in both workflows.</p>
    <a className="text-link" href={directory + 'Formulation-Supply-Planner-Demo.xlsm'} download>Download fictional-data demo ↓</a>
    <small>Desktop Excel + Solver. Entered stock today; no live inventory feed.</small>
  </div>;
}

export default function SupplyPlannerShowcase() {
  return <section className="planner-showcase" aria-label="Supply planner demo">
    <div className="planner-download">
      <div><span className="eyebrow">TRY THE PUBLIC DEMO</span><h2>A planning interface, not a formulation worksheet.</h2>
        <p>Enter production MT and available stock, calculate ingredient demand, then compare up to five saved scenarios. Cost mode uses independent stock inputs and ingredient prices.</p></div>
      <a className="planner-download-button" href={directory + 'Formulation-Supply-Planner-Demo.xlsm'} download>Download Excel demo ↓</a>
    </div>
    <p className="planner-notice">All quantities, compositions, targets, prices and stock are fictional. Requires desktop Excel for Windows, macros and Solver. Not for manufacturing.</p>
    <figure className="planner-screenshot">
      <a href={directory + 'cost-preview.png'} target="_blank" rel="noreferrer" aria-label="Open full-size fictional cost planner screenshot"><img src={directory + 'cost-preview.png'} alt="Fictional Excel cost planner showing separate stock inputs, cost saving per MT and total saving, and original versus optimised ingredient quantities." loading="lazy" width="1344" height="1435"/></a>
      <figcaption>Illustrative cost scenario only. The Supply Plan tab has its own production and availability inputs.</figcaption>
    </figure>
    <div className="planner-boundary">
      <div><h3>Available today</h3><p>Manual inventory entry, availability-constrained linear optimisation, ingredient-demand forecasts and saved scenario comparison.</p></div>
      <div><h3>Live-inventory roadmap</h3><p>Timestamped ERP/WMS stock feeds, receipts, issues and reservations could trigger replanning. No live connection or stock-movement tracking is implemented in this release.</p></div>
    </div>
  </section>;
}
