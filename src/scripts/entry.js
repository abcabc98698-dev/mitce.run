/**
 * Every effect is a small ES module that enhances markup already on the page.
 * An element opts in with data-fx="name" (space-separated for several).
 * Modules load on demand, so a page only downloads the effects it uses.
 * Without JavaScript every section renders complete at its resting state.
 */
// Every file in ./fx is a lazily loaded effect, named after its file.
const modules = import.meta.glob('./fx/*.js');
const loaders = Object.fromEntries(
  Object.entries(modules).map(([path, load]) => [path.replace('./fx/', '').replace('.js', ''), load]),
);

export const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function boot() {
  const byName = new Map();
  for (const el of document.querySelectorAll('[data-fx]')) {
    for (const name of el.dataset.fx.split(/\s+/)) {
      if (!name) continue;
      if (!byName.has(name)) byName.set(name, []);
      byName.get(name).push(el);
    }
  }
  for (const [name, els] of byName) {
    const load = loaders[name];
    if (!load) { console.warn('[fx] no module for', name); continue; }
    load().then((m) => els.forEach((el) => { try { m.mount(el, { reduced }); } catch (e) { console.error('[fx]', name, e); } }));
  }
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
