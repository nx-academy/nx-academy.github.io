import { useState, useEffect, useRef, useCallback } from "react";

import "../styles/arcade.css";
import { QUIZZES, QUIZ_TOPICS } from "../data/quiz";
import { suffleQuestions } from "../utils/suffleQuestions";
import { NXSound } from "../utils/arcadeSound";

/* NX Arcade — pixel/arcade quiz island: cabinet-select catalog → playable round
   (HUD, lives, combos, reacting mushroom mascot, score popups) → STAGE CLEAR /
   GAME OVER results. Catalog metadata comes from src/data/quiz.ts (QUIZZES);
   per-quiz questions are loaded from the live /quiz/<slug>.json files (the same
   source the classic Quiz island uses). */

const MASCOT = "/icon-sm.png";
const LIVES_START = 3;
const LIVES_MAX = 5;
const LEVELS = ["Tous", "Facile", "Moyen", "Difficile"];

const GOOD = [
  "Bien joué !",
  "Nickel !",
  "Parfait !",
  "En plein dans le mille !",
];
const BAD = ["Aïe…", "Presque !", "Pas grave, on continue.", "Oups !"];
const EGG_QUIPS = [
  "Hé, ça chatouille !",
  "Wouhou !",
  "Champignon power !",
  "Boing !",
  "Arrête, je vais rougir…",
  "On joue ou quoi ?",
  "Encore ?!",
  "Pixel parfait.",
];

const hiKey = (slug) => "nx-hs-" + slug;
function getHi(slug) {
  if (typeof localStorage === "undefined") return 0;
  return parseInt(localStorage.getItem(hiKey(slug)) || "0", 10);
}
function setHi(slug, v) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(hiKey(slug), String(v));
  }
}

function rankFor(pct) {
  if (pct >= 100) return "S";
  if (pct >= 80) return "A";
  if (pct >= 60) return "B";
  if (pct >= 40) return "C";
  return "D";
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ---------------- Mascot ---------------- */
function Mascot({ state = "idle", message, big }) {
  return (
    <div className={"arc-mascot " + state}>
      <img className={big ? "mascot-lg" : ""} src={MASCOT} alt="Mascotte NX" />
      {message && <div className="arc-bubble">{message}</div>}
    </div>
  );
}

/* ---------------- Catalog (cabinet select) ---------------- */
function QuizCatalog({ quizzes, onPick }) {
  const [topic, setTopic] = useState("Tous");
  const [level, setLevel] = useState("Tous");

  const list = quizzes.filter(
    (q) =>
      (topic === "Tous" || q.topic === topic) &&
      (level === "Tous" || q.level === level),
  );

  return (
    <div className="nx-arcade nx-container">
      <div className="arc-marquee">
        <img src={MASCOT} alt="" />
        <div>
          <p className="mq-title">NX ARCADE</p>
          <div className="mq-sub">
            Teste tes connaissances, une notion à la fois.
          </div>
        </div>
        <div className="arc-coin pix">★ INSÉRER UNE PIÈCE</div>
      </div>

      <div className="arc-filters">
        <span className="lbl">THÈME</span>
        {QUIZ_TOPICS.map((t) => (
          <button
            key={t}
            className={"arc-chip" + (topic === t ? " on" : "")}
            onClick={() => {
              NXSound.select();
              setTopic(t);
            }}
          >
            {t}
          </button>
        ))}
        <span className="lbl" style={{ marginLeft: 10 }}>
          NIVEAU
        </span>
        {LEVELS.map((l) => (
          <button
            key={l}
            className={"arc-chip" + (level === l ? " on" : "")}
            onClick={() => {
              NXSound.select();
              setLevel(l);
            }}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="arc-grid">
        {list.map((q) => {
          const hi = getHi(q.slug);
          const choose = () => {
            NXSound.select();
            onPick(q);
          };
          return (
            <div
              key={q.slug}
              className="arc-cart"
              role="button"
              tabIndex={0}
              onClick={choose}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  choose();
                }
              }}
            >
              <div className="row">
                <span className="arc-topic pix">{q.topic}</span>
                <span className={"arc-badge " + q.level.toLowerCase()}>
                  {q.level}
                </span>
              </div>
              <h3>{q.title}</h3>
              <p className="blurb">{q.blurb}</p>
              <div className="foot">
                <span className="arc-qcount pix">
                  {q.questions.length} QUESTIONS
                </span>
                {hi > 0 ? (
                  <span className="arc-hi pix">HI {hi}</span>
                ) : (
                  <span className="arc-play pix">▶ JOUER</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {list.length === 0 && (
        <p className="arc-empty">Aucun quiz pour ce filtre… pour le moment !</p>
      )}
    </div>
  );
}

/* ---------------- Round (playable) ---------------- */
function QuizRound({ quiz, onExit, onFinish }) {
  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(LIVES_START);
  const [mascot, setMascot] = useState({
    state: "idle",
    msg: "Prêt ? Appuie sur START !",
  });
  const [pop, setPop] = useState(null);
  const [muted, setMuted] = useState(NXSound.muted);
  const [egg, setEgg] = useState({ n: 0, msg: null, super: false });
  const answersRef = useRef([]);
  // Shuffle once per round, mirroring the classic Quiz island.
  const questionsRef = useRef(null);
  if (questionsRef.current === null) {
    questionsRef.current = suffleQuestions(quiz.questions);
  }
  const questions = questionsRef.current;
  const hi = getHi(quiz.slug);

  const q = questions[idx];
  const isLast = idx === questions.length - 1;

  function begin() {
    NXSound.init();
    NXSound.start();
    setStarted(true);
    setMascot({ state: "idle", msg: "C'est parti !" });
  }

  function pokeMascot() {
    NXSound.init();
    setEgg((prev) => {
      const n = prev.n + 1;
      if (n % 5 === 0) {
        NXSound.oneup();
        setTimeout(() => setEgg((e) => ({ ...e, super: false })), 1300);
        return { n, msg: "🍄 SUPER CHAMPIGNON !", super: true };
      }
      NXSound.select();
      return { n, msg: pick(EGG_QUIPS), super: false };
    });
  }

  const answer = useCallback(
    (choice) => {
      if (locked || !started) return;
      setPicked(choice);
      setLocked(true);
      const correct = choice === q.answer;
      answersRef.current.push({
        q: q.question,
        correct,
        explain: q.explanation,
      });
      if (correct) {
        const newStreak = streak + 1;
        const mult = Math.min(newStreak, 4);
        const pts = 100 * mult;
        setScore((s) => s + pts);
        setStreak(newStreak);
        NXSound.correct();
        // 1-UP every 3 in a row
        if (newStreak % 3 === 0 && lives < LIVES_MAX) {
          setLives((l) => Math.min(l + 1, LIVES_MAX));
          setPop({ text: "1-UP!", oneup: true });
          setTimeout(() => NXSound.oneup(), 120);
        } else {
          setPop({
            text: mult > 1 ? `+${pts} COMBO x${mult}` : `+${pts}`,
            oneup: false,
          });
        }
        setMascot({ state: "happy", msg: pick(GOOD) });
      } else {
        setStreak(0);
        setLives((l) => l - 1);
        NXSound.wrong();
        setMascot({ state: "hurt", msg: pick(BAD) });
      }
    },
    [locked, started, q, streak, lives],
  );

  const next = useCallback(() => {
    const dead = lives <= 0;
    if (isLast || dead) {
      const correctCount = answersRef.current.filter((a) => a.correct).length;
      onFinish({
        slug: quiz.slug,
        title: quiz.title,
        score,
        total: questions.length,
        correctCount,
        answers: answersRef.current.slice(),
        gameOver: dead && !isLast,
      });
      return;
    }
    setIdx((i) => i + 1);
    setPicked(null);
    setLocked(false);
    setPop(null);
    setMascot({ state: "idle", msg: null });
  }, [lives, isLast, onFinish, quiz, score, questions.length]);

  // keyboard: START, 1–N to pick, Enter/Space to advance
  useEffect(() => {
    function onKey(e) {
      if (!started) {
        if (e.key === "Enter" || e.key === " ") begin();
        return;
      }
      if (!locked) {
        const n = parseInt(e.key, 10);
        if (n >= 1 && n <= q.options.length) answer(q.options[n - 1]);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        next();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [started, locked, q, answer, next]);

  function toggleMute() {
    const m = !muted;
    NXSound.setMuted(m);
    setMuted(m);
  }

  if (!started) {
    return (
      <div className="nx-arcade-stage">
        <div className="nx-arcade nx-container">
          <div className="arc-screen crt">
            <div className="arc-center">
              <span className={"arc-badge " + quiz.level.toLowerCase()}>
                {quiz.level}
              </span>
              <div className="big">{quiz.title}</div>
              <p
                className="arc-hiline"
                style={{ maxWidth: 460, margin: "8px auto 0" }}
              >
                {quiz.blurb}
              </p>
              <div>
                <img
                  key={egg.n}
                  src={MASCOT}
                  alt="Mascotte NX"
                  title="Clique-moi !"
                  onClick={pokeMascot}
                  className={
                    "mascot-lg poke " +
                    (egg.super ? "super" : egg.msg ? "hop" : "idlebob")
                  }
                />
              </div>
              {egg.msg && <div className="arc-egg-bubble">{egg.msg}</div>}
              <div className="arc-scoreline pix">
                {questions.length} QUESTIONS · {LIVES_START} VIES
              </div>
              {hi > 0 && (
                <div className="arc-hiline pix">MEILLEUR SCORE : {hi}</div>
              )}
              <div className="arc-actions">
                <button className="arc-btn primary" onClick={begin}>
                  ▶ START
                </button>
                <button className="arc-btn" onClick={onExit}>
                  RETOUR
                </button>
              </div>
              <div className="arc-press pix">PRESS START</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const pct = Math.round(((idx + (locked ? 1 : 0)) / questions.length) * 100);
  return (
    <div className="nx-arcade-stage">
      <div className="nx-arcade nx-container">
        <div className="arc-screen crt">
          <div className="arc-hud">
            <div className="stat">
              <span className="k">SCORE</span>
              <span className="v">{String(score).padStart(5, "0")}</span>
            </div>
            <div className="stat">
              <span className="k">HI</span>
              <span className="v hi">
                {String(Math.max(hi, score)).padStart(5, "0")}
              </span>
            </div>
            <div className="lives" title="Vies">
              {Array.from({ length: LIVES_MAX }).map((_, i) => (
                <img
                  key={i}
                  src={MASCOT}
                  alt=""
                  className={i < lives ? "" : "lost"}
                />
              ))}
            </div>
            <span className="stage pix">
              STAGE {idx + 1}/{questions.length}
            </span>
            <button className="mute" onClick={toggleMute}>
              {muted ? "🔇 SON" : "🔊 SON"}
            </button>
          </div>
          <div className="arc-progress">
            <span style={{ width: pct + "%" }}></span>
          </div>

          <div className="arc-body">
            {pop && (
              <div
                key={Date.now()}
                className={"arc-pop pix" + (pop.oneup ? " oneup" : "")}
              >
                {pop.text}
              </div>
            )}
            <h2 className="arc-q">{q.question}</h2>
            <ul className="arc-options">
              {q.options.map((opt, i) => {
                let cls = "arc-opt";
                if (locked) {
                  cls += " locked";
                  if (opt === q.answer) cls += " correct";
                  else if (opt === picked) cls += " wrong";
                } else if (opt === picked) cls += " flash";
                return (
                  <li key={opt}>
                    <button className={cls} onClick={() => answer(opt)}>
                      <span className="key">{i + 1}</span>
                      <span>{opt}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {locked && (
              <div className="arc-explain">
                <p
                  className={"et pix " + (picked === q.answer ? "good" : "bad")}
                >
                  {picked === q.answer ? "✓ CORRECT" : "✗ RATÉ"}
                </p>
                <p>{q.explanation}</p>
              </div>
            )}

            <Mascot state={mascot.state} message={mascot.msg} />

            {locked && (
              <div
                className="arc-actions"
                style={{ justifyContent: "flex-start" }}
              >
                <button className="arc-btn primary next" onClick={next}>
                  {isLast || lives <= 0 ? "VOIR LE SCORE ▶" : "SUIVANT ▶"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Result ---------------- */
function QuizResult({ run, onReplay, onNext, onExit }) {
  const pct = Math.round((run.correctCount / run.total) * 100);
  const rank = run.gameOver ? "D" : rankFor(pct);
  const prevHi = getHi(run.slug);
  const isNewHi = run.score > prevHi;
  useEffect(() => {
    if (isNewHi) setHi(run.slug, run.score);
    if (run.gameOver) NXSound.over();
    else NXSound.clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="nx-arcade-stage">
      <div className="nx-arcade nx-container">
        <div className="arc-screen crt">
          <div className="arc-center">
            <img
              src={MASCOT}
              className={"mascot-lg" + (run.gameOver ? "" : " cheer")}
              alt=""
            />
            <div className={"big " + (run.gameOver ? "over" : "clear")}>
              {run.gameOver ? "GAME OVER" : "STAGE CLEAR !"}
            </div>
            <div className={"arc-rank pix " + rank.toLowerCase()}>
              RANG {rank}
            </div>
            <div className="arc-scoreline pix">
              SCORE {run.score} · {run.correctCount}/{run.total} BONNES
            </div>
            <div className="arc-hiline pix">
              {isNewHi
                ? "★ NOUVEAU RECORD !"
                : "MEILLEUR : " + Math.max(prevHi, run.score)}
            </div>

            <div className="arc-review">
              {run.answers.map((a, i) => (
                <div key={i} className={"ri " + (a.correct ? "ok" : "ko")}>
                  <span className="mk pix">{a.correct ? "✓" : "✗"}</span>
                  <div>
                    <p className="qt">{a.q}</p>
                    <p className="ex">{a.explain}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="arc-actions">
              <button className="arc-btn primary" onClick={onReplay}>
                ↻ REJOUER
              </button>
              {onNext && (
                <button className="arc-btn" onClick={onNext}>
                  QUIZ SUIVANT ▶
                </button>
              )}
              <button className="arc-btn" onClick={onExit}>
                RETOUR AU MENU
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Orchestrator ---------------- */
function QuizArcade() {
  const [quizzes, setQuizzes] = useState(null);
  const [screen, setScreen] = useState("catalog");
  const [quiz, setQuiz] = useState(null);
  const [run, setRun] = useState(null);

  // Load the live questions for every catalog entry once, up front, so the
  // cabinet-select can show counts and rounds start instantly.
  useEffect(() => {
    let cancelled = false;
    async function load() {
      const loaded = await Promise.all(
        QUIZZES.map(async (meta) => {
          try {
            const res = await fetch(`/quiz/${meta.slug}.json`);
            if (!res.ok) return null;
            const { data } = await res.json();
            if (!Array.isArray(data) || data.length === 0) return null;
            return { ...meta, blurb: meta.description, questions: data };
          } catch {
            return null;
          }
        }),
      );
      if (!cancelled) setQuizzes(loaded.filter(Boolean));
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  function toRound(q) {
    setQuiz(q);
    setRun(null);
    setScreen("round");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function finish(r) {
    setRun(r);
    setScreen("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function toMenu() {
    setScreen("catalog");
    setQuiz(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function nextQuiz() {
    const i = quizzes.findIndex((x) => x.slug === quiz.slug);
    toRound(quizzes[(i + 1) % quizzes.length]);
  }

  if (!quizzes) {
    return (
      <div className="nx-arcade nx-container">
        <div className="arc-loading pix">CHARGEMENT…</div>
      </div>
    );
  }

  if (screen === "round")
    return (
      <QuizRound
        key={quiz.slug}
        quiz={quiz}
        onExit={toMenu}
        onFinish={finish}
      />
    );
  if (screen === "result")
    return (
      <QuizResult
        run={run}
        onReplay={() => toRound(quiz)}
        onNext={quizzes.length > 1 ? nextQuiz : null}
        onExit={toMenu}
      />
    );
  return <QuizCatalog quizzes={quizzes} onPick={toRound} />;
}

export default QuizArcade;
