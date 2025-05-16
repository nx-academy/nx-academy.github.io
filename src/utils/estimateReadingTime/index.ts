function calculateReadingTime(
  text: string,
  wordsPerMinute: number
): number {
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);

  return time;
}

export default function displayEstimatedReadingTime() {
  window.addEventListener("DOMContentLoaded", function () {
    const $article = document.querySelector("article");
    const $articleTitle = document.querySelector("h1");

    if ($article && $article.textContent) {
      const readingTime = calculateReadingTime($article.textContent, 200);

      const $timeInfo = document.createElement("small");
      $timeInfo.textContent = `Temps de lecture estimé : ${readingTime} minutes`;

      if ($articleTitle) {
        $articleTitle.parentNode?.insertBefore(
          $timeInfo,
          $articleTitle.nextSibling
        );
      }
    }
  });
}
