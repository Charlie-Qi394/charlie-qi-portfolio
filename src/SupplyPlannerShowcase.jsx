import {useState} from 'react';

export function SupplyPlannerPreview() {
  return <div className="planner-preview">
    <span className="eyebrow">EXCEL / VBA / CONSTRAINED OPTIMISATION</span>
    <h3>Plan around stock.<br/>See the cost impact.</h3>
    <div className="planner-metrics">
      <div><span>Two independent modes</span><strong>Supply + cost</strong></div>
      <div><span>Saved scenarios</span><strong>5 snapshots</strong></div>
    </div>
    <p>Original vs optimised ingredient demand. Stock limits stay binding in both workflows.</p>
    <small>Confidential tool. Anonymised workflow preview only; no workbook download or formulation data.</small>
  </div>;
}

function AnonymisedWorkflow() {
  const [mode,setMode]=useState('Supply availability');
  const [calculated,setCalculated]=useState(false);
  return <div className="planner-private-preview">
    <div className="planner-preview-tabs" role="group" aria-label="Illustrative workflow selection">
      {['Supply availability','Cost optimisation'].map(name=><button key={name} aria-pressed={mode===name} onClick={()=>{setMode(name);setCalculated(false);}}>{name}</button>)}
    </div>
    <div className="planner-preview-heading"><h3>{mode}</h3><span>ANONYMISED PREVIEW</span></div>
    <div className="planner-redacted-inputs">
      <div><span>Planned production (MT)</span><strong>Withheld</strong></div>
      <div><span>Material A availability</span><strong>Withheld</strong></div>
      <div><span>Material B availability</span><strong>Withheld</strong></div>
    </div>
    <button className="planner-preview-calculate" onClick={()=>setCalculated(true)}>Preview {mode==='Cost optimisation'?'cost optimisation':'calculation'} →</button>
    <p className="planner-preview-status" role="status">{calculated?'Preview complete — output layout shown below. No formulation has been calculated.':'Illustrative interface only. All formulation and commercial values are withheld.'}</p>
    {calculated?<div className="planner-redacted-results">
      {mode==='Cost optimisation'?<div className="planner-redacted-inputs"><div><span>Saving ($/MT)</span><strong>Withheld</strong></div><div><span>Total saving ($)</span><strong>Withheld</strong></div></div>:null}
      <table><caption>Ingredient demand comparison — values intentionally withheld</caption><thead><tr><th scope="col">Material</th><th scope="col">Original</th><th scope="col">Optimised</th><th scope="col">Difference</th></tr></thead><tbody>{['A','B','C'].map(id=><tr key={id}><th scope="row">Material {id}</th><td>—</td><td>—</td><td>—</td></tr>)}</tbody></table>
      <p>Save scenario → compare latest and selected previous scenarios. Formulation checks run privately.</p>
    </div>:null}
  </div>;
}

export default function SupplyPlannerShowcase() {
  return <section className="planner-showcase" aria-label="Anonymised supply planner workflow">
    <span className="eyebrow">WORKFLOW SHOWCASE / DETAILS WITHHELD</span>
    <h2>A planning interface, not a formulation worksheet.</h2>
    <p className="planner-notice">The workbook, source code and formulation data are not distributed. Ingredient identities, quantities, compositions, targets, prices, stock and calculated results are intentionally withheld to protect confidentiality and intellectual property.</p>
    <AnonymisedWorkflow/>
    <p className="planner-notice">This interactive preview changes only the displayed workflow. It does not run the optimiser, accept business data or reproduce a recipe.</p>
    <div className="planner-boundary">
      <div><h3>Available in the private tool</h3><p>Independent supply and cost inputs, stock-constrained optimisation, ingredient-demand forecasting and compact saved-scenario comparison.</p></div>
      <div><h3>Live-inventory roadmap</h3><p>Inventory feeds and stock-movement-driven replanning are potential future extensions. The current tool uses manually entered availability.</p></div>
    </div>
  </section>;
}

