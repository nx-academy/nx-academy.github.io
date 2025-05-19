import { useEffect, useState } from "react";

import "../styles/resume-snackbar.css";

function Component() {
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [shouldRenderSnackbar, setShouldRenderSnackbar] = useState(false);
  const [lastPageVisited, setLastPageVisited] = useState(null);
  const [lastPageLabel, setLastPageLabel] = useState(null);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const rawTitle = document.title;
    const pageLabel = rawTitle.split(" - ")[0].trim();

    const lastVisited = localStorage.getItem("lastVisited");
    const lastVisitedLabel = localStorage.getItem("lastVisitedLabel");
    const sessionMarker = sessionStorage.getItem("sessionStarted");

    const isReturningToHome = currentPath === "/";
    const isDifferentPage = lastVisited && lastVisited !== currentPath;
    const isNewSession = !sessionMarker;

    if (isNewSession) {
      sessionStorage.setItem("sessionStarted", "true");
    }

    if (isReturningToHome && isNewSession && isDifferentPage) {
      setLastPageVisited(lastVisited);
      setLastPageLabel(lastVisitedLabel);
      setShouldRenderSnackbar(true);
      setTimeout(() => {
        setIsSnackbarVisible(false);
      }, 10000);
      setIsSnackbarVisible(true);
    }

    localStorage.setItem("lastVisited", currentPath);
    localStorage.setItem("lastVisitedLabel", pageLabel);
  }, []);

  const handleClose = () => {
    setIsSnackbarVisible(false);
    setTimeout(() => {
      setShouldRenderSnackbar(false);
    }, 400);
  };

  if (!shouldRenderSnackbar) return null;

  return (
    <div
      className={`resume-snackbar-wrapper ${
        isSnackbarVisible ? "" : "slide-out"
      }`}
    >
      <p>
        Vous étiez en train de lire :
        <br />
        <span title={lastPageLabel} className="resume-snackbar-lastpage">
          {lastPageLabel}
        </span>
      </p>
      <div className="resume-snackbar-actions">
        <a href={lastPageVisited}>Reprendre</a>
        <button onClick={handleClose}>Pas maintenant</button>
      </div>
      <div className="progress-bar"></div>
    </div>
  );
}

export default Component;
