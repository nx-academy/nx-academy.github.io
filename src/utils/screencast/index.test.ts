import { describe, expect, it } from "vitest";

import { embedAllow, embedUrl } from "./index";

const params = (url: string) => new URL(url).searchParams;

describe("embedUrl", () => {
  it("pointe sur le lecteur Vimeo par défaut", () => {
    const url = new URL(embedUrl({ id: "1096175923" }));

    expect(url.origin).toBe("https://player.vimeo.com");
    expect(url.pathname).toBe("/video/1096175923");
  });

  it("porte le jeton des vidéos non répertoriées", () => {
    const url = embedUrl({ id: "1096175923", hash: "0d217df608" });

    expect(params(url).get("h")).toBe("0d217df608");
  });

  it("omet le jeton pour une vidéo publique", () => {
    expect(params(embedUrl({ id: "1096175923" })).has("h")).toBe(false);
  });

  it("coupe le traçage Vimeo", () => {
    expect(params(embedUrl({ id: "1096175923" })).get("dnt")).toBe("1");
  });

  it("éteint le chrome du lecteur, le titre vivant dans la légende", () => {
    const query = params(embedUrl({ id: "1096175923" }));

    expect(query.get("title")).toBe("0");
    expect(query.get("byline")).toBe("0");
    expect(query.get("portrait")).toBe("0");
    expect(query.get("badge")).toBe("0");
  });

  it("n'envoie pas la télémétrie d'attribution du snippet de partage", () => {
    const query = params(embedUrl({ id: "1096175923", hash: "0d217df608" }));

    expect(query.has("player_id")).toBe(false);
    expect(query.has("app_id")).toBe(false);
  });

  it("passe par le domaine sans cookie de YouTube", () => {
    const url = new URL(embedUrl({ provider: "youtube", id: "SYMPIdMC2qo" }));

    expect(url.origin).toBe("https://www.youtube-nocookie.com");
    expect(url.pathname).toBe("/embed/SYMPIdMC2qo");
    expect(url.searchParams.get("rel")).toBe("0");
  });

  it("refuse un identifiant Vimeo qui n'est pas un nombre", () => {
    expect(() => embedUrl({ id: "1096175923?h=0d217df608" })).toThrow(
      /Identifiant Vimeo invalide/,
    );
  });

  it("refuse un jeton Vimeo hors hexadécimal", () => {
    expect(() =>
      embedUrl({ id: "1096175923", hash: "0d217df608&dnt=0" }),
    ).toThrow(/Jeton Vimeo invalide/);
  });

  it("refuse un identifiant YouTube de mauvaise longueur", () => {
    expect(() => embedUrl({ provider: "youtube", id: "SYMPIdMC2" })).toThrow(
      /Identifiant YouTube invalide/,
    );
  });
});

describe("embedAllow", () => {
  it("n'accorde jamais l'autoplay", () => {
    expect(embedAllow("vimeo")).not.toContain("autoplay");
    expect(embedAllow("youtube")).not.toContain("autoplay");
  });

  it("accorde le plein écran", () => {
    expect(embedAllow()).toContain("fullscreen");
  });
});
