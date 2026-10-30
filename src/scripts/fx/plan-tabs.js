// Comparison table plan tabs (tablet/phone). Design page variables "Plan
// Starter/Growth/Enterprise" show one plan column at a time; the choice is
// written to data-plan on the table and CSS hides the other columns.
// Instant swap, by design.
export function mount(table) {
  const tabs = [...table.querySelectorAll('button[data-plan-tab]')];
  for (const tab of tabs) {
    tab.addEventListener('click', () => {
      table.dataset.plan = tab.dataset.planTab;
      for (const t of tabs) t.setAttribute('aria-pressed', String(t === tab));
    });
  }
}
