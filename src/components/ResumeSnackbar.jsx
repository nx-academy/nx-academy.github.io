import { useEffect, useState } from "react";

import "../styles/resume-snackbar.css"

function Component() {
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false)

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
    if (isReturningToHome && isNewSession && isDifferentPage) {
      console.log("✅ Afficher la popin pour :", lastVisited);
      setIsSnackbarVisible(true)
    } else {
      console.log("❌ Ne rien afficher");
      setIsSnackbarVisible(false)
    }

    localStorage.setItem("lastVisited", currentPath);
  }, []);

  console.log("++++++")
  console.log(isSnackbarVisible)
  console.log("++++++")

  return null
}

export default Component;
