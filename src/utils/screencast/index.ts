/* Fabrique des URLs d'embed pour les screencasts.

   Avant, chaque vidéo était une iframe copiée-collée depuis le bouton
   « Partager » de Vimeo : trente-deux fois la même chaîne de paramètres, avec
   des variantes involontaires. Tout passe désormais par ici, et un seul
   endroit décide de ce qu'on envoie à l'hébergeur.

   Deux choix valent d'être explicités :
   — `dnt=1` côté Vimeo et le domaine `youtube-nocookie.com` côté YouTube
     coupent le dépôt de cookies. Le site ne trace pas, ses lecteurs vidéo non
     plus.
   — On n'envoie ni `player_id` ni `app_id` : ces deux paramètres du snippet de
     partage ne servent qu'à la télémétrie d'attribution de Vimeo.

   Le composant `Screencast.astro` affiche, ce module calcule. */

export type ScreencastProvider = "vimeo" | "youtube";

export type Screencast = {
  /** Identifiant chez l'hébergeur : chiffres chez Vimeo, 11 caractères chez YouTube. */
  id: string;
  /** Jeton des vidéos Vimeo non répertoriées (le `h=` de l'URL de partage). */
  hash?: string;
  provider?: ScreencastProvider;
};

const VIMEO_ID = /^\d+$/;
const VIMEO_HASH = /^[0-9a-f]+$/;
const YOUTUBE_ID = /^[\w-]{11}$/;

/** Le chrome du lecteur est éteint partout : le titre vit dans la légende. */
const VIMEO_PARAMS: Record<string, string> = {
  dnt: "1",
  badge: "0",
  title: "0",
  byline: "0",
  portrait: "0",
};

const YOUTUBE_PARAMS: Record<string, string> = { rel: "0" };

/** Permissions accordées à l'iframe. Volontairement sans `autoplay`. */
const ALLOW: Record<ScreencastProvider, string> = {
  vimeo: "fullscreen; picture-in-picture; encrypted-media",
  youtube: "fullscreen; picture-in-picture; encrypted-media",
};

const withParams = (url: URL, params: Record<string, string>): string => {
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  return url.toString();
};

/** URL à mettre dans le `src` de l'iframe. Lève si l'identifiant est douteux :
    mieux vaut un build rouge qu'un lecteur vide en production. */
export const embedUrl = ({
  id,
  hash,
  provider = "vimeo",
}: Screencast): string => {
  if (provider === "youtube") {
    if (!YOUTUBE_ID.test(id)) {
      throw new Error(`Identifiant YouTube invalide : « ${id} ».`);
    }

    return withParams(
      new URL(`https://www.youtube-nocookie.com/embed/${id}`),
      YOUTUBE_PARAMS,
    );
  }

  if (!VIMEO_ID.test(id)) {
    throw new Error(`Identifiant Vimeo invalide : « ${id} ».`);
  }

  if (hash !== undefined && !VIMEO_HASH.test(hash)) {
    throw new Error(`Jeton Vimeo invalide : « ${hash} ».`);
  }

  const url = new URL(`https://player.vimeo.com/video/${id}`);

  return withParams(url, hash ? { h: hash, ...VIMEO_PARAMS } : VIMEO_PARAMS);
};

/** Valeur de l'attribut `allow` de l'iframe. */
export const embedAllow = (provider: ScreencastProvider = "vimeo"): string =>
  ALLOW[provider];
