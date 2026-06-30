export function calculateReadingTime(
  text: string,
  wordsPerMinute = 200,
): number {
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);

  return time;
}

export default function displayEstimatedReadingTime() {
  window.addEventListener("DOMContentLoaded", function () {
    const $article = document.querySelector("article");

    if (!$article || !$article.textContent) return;

    const readingTime = calculateReadingTime($article.textContent, 200);

    // Page de lecture d'article : on alimente la pastille du byline.
    const $pill = document.querySelector<HTMLElement>("[data-reading-min]");
    if ($pill) {
      $pill.textContent = `${readingTime} min`;
      return;
    }

    // Repli (pages sans en-tête éditorial) : ancien comportement.
    const $articleTitle = document.querySelector("h1");
    if ($articleTitle) {
      const $timeInfo = document.createElement("small");
      $timeInfo.textContent = `Temps de lecture estimé : ${readingTime} minutes`;
      $articleTitle.parentNode?.insertBefore(
        $timeInfo,
        $articleTitle.nextSibling,
      );
    }
  });
}
