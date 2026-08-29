/* Effets au scroll de /feed — trois pistes, portées du handoff « Refonte de la
   page Feed » (Claude Design, août 2026). La cale d'aperçu et le commutateur
   d'arbitrage de la maquette ne sont pas repris : ils n'existaient que pour
   l'outil de design.

   Règles tenues :
     • l'état par défaut EST l'état final. Sans JS, en reduced-motion ou sous
       768 px, les classes fx* ne sont jamais posées, donc aucune règle d'effet
       n'existe et la page est complète et identique en contenu.
     • couleur et opacité seulement, 500 ms, courbe douce. Aucune translation.
     • IntersectionObserver uniquement, aucun écouteur de scroll.

   Note d'implémentation : l'observer sert de DÉCLENCHEUR, jamais de mesure. Les
   champs de l'enregistrement (rootBounds, boundingClientRect) sont ignorés —
   rootBounds est nullable par spec. L'état est recalculé au moment du rappel à
   partir d'un getBoundingClientRect() frais : une fonction pure de la position.
   C'est ce qui rend la piste 1 symétrique gratuitement.

   Chargé en tête du corps de la page, donc APRÈS le script de thème de
   BaseLayout — qui fait `documentElement.className = …` et écraserait les
   classes fx* s'il passait après. Le bascule de thème du header, lui, utilise
   classList.add/remove : les classes fx* y survivent. */
(function () {
  const root = document.documentElement;
  const wide = () => window.innerWidth >= 768;

  /* Sous 768 px le viewport est trop court : les blocs entreraient et
     sortiraient en permanence, l'effet deviendrait du clignotement. */
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !wide()
  ) {
    return;
  }

  const vh = () => window.innerHeight || root.clientHeight;
  const obs = [];
  let records = 0;

  /* Repli de sûreté : si l'observer ne délivre QUE ses enregistrements initiaux
     (un par cible, livré à l'observation) sans jamais rien livrer ensuite, les
     effets ne peuvent pas fonctionner — on rend alors l'état final, sinon un
     label LECTURE resterait gris pour toujours, ce qui contredirait la règle
     « l'état par défaut est l'état final ». */
  function finalState() {
    obs.splice(0).forEach((io) => io.disconnect());
    root.classList.remove("fx1", "fx2", "fx3");
    document
      .querySelectorAll(".feed .ctx.read, .feed .lbl.on, .feed .mark.on")
      .forEach((el) => el.classList.remove("read", "on"));
  }

  /* piste, sélecteur, bande de déclenchement, règle d'état */
  const PISTES = [
    /* 1 — le contexte se retire quand il est entièrement passé au-dessus des
       12 % hauts du viewport. Le seuil n'est pas « touche le bord haut » : un
       bloc qu'on lit encore ne doit pas s'éteindre. Symétrique : il revient en
       remontant, sinon la relecture deviendrait impossible. */
    {
      n: 1,
      sel: ".feed .ctx",
      margin: "-12% 0px 0px 0px",
      apply(el) {
        el.classList.toggle(
          "read",
          el.getBoundingClientRect().bottom <= vh() * 0.12,
        );
      },
    },
    /* 2 — le label s'allume quand son bloc occupe la bande 22 %–60 %, pas au
       premier pixel visible. Verrouillé ensuite : sur une lecture courte, un
       retour au gris en sortie de bande donnerait un clignotement. */
    {
      n: 2,
      sel: ".feed .lec",
      margin: "-22% 0px -40% 0px",
      apply(el) {
        const r = el.getBoundingClientRect();
        const h = vh();

        if (r.top < h * 0.6 && r.bottom > h * 0.22) {
          const label = el.querySelector(".lbl");

          if (label) label.classList.add("on");
        }
      },
    },
    /* 3 — appui sur la ligne de frontière à l'entrée à l'écran. Verrouillé :
       c'est une annonce, elle n'a pas à se répéter. */
    {
      n: 3,
      sel: ".feed .mark",
      margin: "-10% 0px -25% 0px",
      apply(el) {
        const r = el.getBoundingClientRect();
        const h = vh();

        if (r.top < h * 0.75 && r.bottom > h * 0.1) el.classList.add("on");
      },
    },
  ];

  [1, 2, 3].forEach((n) => root.classList.add("fx" + n));

  function init() {
    let targets = 0;

    PISTES.forEach((piste) => {
      const els = [...document.querySelectorAll(piste.sel)];

      if (!els.length) return;

      /* passe initiale : l'état doit être juste avant le moindre scroll */
      const pass = () => els.forEach(piste.apply);

      requestAnimationFrame(pass);
      window.addEventListener("load", pass, { once: true });

      /* seuils 0 et 1 sur la bande : le rappel arrive exactement quand l'état
         basculerait, dans les deux sens */
      const io = new IntersectionObserver(
        (entries) => {
          records += entries.length;
          entries.forEach((entry) => piste.apply(entry.target));
        },
        { rootMargin: piste.margin, threshold: [0, 1] },
      );

      els.forEach((el) => io.observe(el));
      targets += els.length;
      obs.push(io);
    });

    /* > targets = l'observer a livré autre chose que ses enregistrements
       initiaux, donc il fonctionne. */
    setTimeout(() => {
      if (records <= targets) finalState();
    }, 1500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  /* Fenêtre ramenée sous 768 px : on rend l'état final et on débranche tout. */
  window.addEventListener("resize", () => {
    if (!wide()) finalState();
  });
})();
