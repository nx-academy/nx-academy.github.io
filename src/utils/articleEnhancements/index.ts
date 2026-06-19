// Comportements client de la page de lecture d'article :
//  • bouton « copier » injecté dans chaque bloc de code,
//  • barre de progression fine en haut + barre à segments du sommaire + %.
// Adapté de la référence de design `article-shared.js`, en TypeScript.

function addCopyButtons(): void {
  document
    .querySelectorAll<HTMLPreElement>("[data-prose] pre")
    .forEach((pre) => {
      if (pre.querySelector(".nx-copy")) return;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "nx-copy";
      btn.textContent = "Copier";

      btn.addEventListener("click", () => {
        const code = pre.querySelector("code") ?? pre;
        if (!navigator.clipboard) return;

        navigator.clipboard
          .writeText((code.textContent ?? "").trim())
          .then(() => {
            btn.textContent = "Copié ✓";
            btn.classList.add("copied");
            setTimeout(() => {
              btn.textContent = "Copier";
              btn.classList.remove("copied");
            }, 1600);
          });
      });

      pre.appendChild(btn);
    });
}

function pageProgress(): number {
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  return max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
}

function initProgress(): void {
  const bars = document.querySelectorAll<HTMLElement>("[data-progress]");
  const pct = document.querySelector<HTMLElement>(".outline-pct");
  const segs = Array.from(
    document.querySelectorAll<HTMLElement>(".outline-seg"),
  );

  if (!bars.length && !pct && !segs.length) return;

  function update() {
    const p = pageProgress();

    bars.forEach((bar) => bar.style.setProperty("--p", p.toFixed(4)));

    if (pct) pct.textContent = `${Math.round(p * 100)}%`;

    if (segs.length) {
      const lit = Math.round(p * segs.length);
      segs.forEach((seg, i) => seg.classList.toggle("on", i < lit));
    }
  }

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

export default function initArticleEnhancements(): void {
  function boot() {
    addCopyButtons();
    initProgress();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
}
