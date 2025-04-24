import { useEffect, useState } from "react";

import "../styles/resume-snackbar.css"

function Component() {
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false)
  const [lastPageVisited, setLastPageVisited] = useState(null)

  useEffect(() => {
    const currentPath = window.location.pathname;
    const lastVisited = localStorage.getItem("lastVisited");
    const sessionMarker = sessionStorage.getItem("sessionStarted");

    const isReturningToHome = currentPath === "/";
    const isDifferentPage = lastVisited && lastVisited !== currentPath;
    const isNewSession = !sessionMarker;

    // If it's a new session, we set an item in sessionStorage (and not localStorage)
    if (isNewSession) {
      sessionStorage.setItem("sessionStarted", "true");
    }

    // We display the Snackbar, only if
    // - the user on the home page (/)
    // - the session just started
    // - there is a "history", e.g. a page to back to
    // if (isReturningToHome && isNewSession && isDifferentPage) {
    if (true) {
      setIsSnackbarVisible(true)
      setLastPageVisited(lastVisited)

      // const timer = setTimeout(() => {
      //   setIsSnackbarVisible(false)
      // }, 10000)
      // return () => clearTimeout(timer)
    } else {
      setIsSnackbarVisible(false)
    }

    localStorage.setItem("lastVisited", currentPath);
  }, []);

  if (!isSnackbarVisible) return null

  return (
    <div className="resume-snackbar-wrapper">
      <p>Vous étiez en train de lire : 
        <br /> 
        <span className="resume-snackbar-lastpage">Le Moine, le Vape Coder, le Debugger & le Learner</span>
      </p>
      <div className="resume-snackbar-actions">
        <a href={lastPageVisited}>Reprendre</a>
        <button onClick={() => setIsSnackbarVisible(false)}>Pas maintenant</button>
      </div>
      <div className="progress-bar"></div>
    </div>
  )
}

export default Component;
