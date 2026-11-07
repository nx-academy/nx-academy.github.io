import type { Testimonial } from "../types/Testimonial";

// Témoignages retirés le 2026-11-07 : on ne peut pas en garantir l'origine
// (photo et prénom ne correspondant pas pour l'un d'eux). Historique dans git.
// À réalimenter uniquement avec des retours réels, sourcés et dont l'auteur a
// donné son accord.
const DOCKER_TESTIMONIALS: readonly Testimonial[] = [];

const GITHUB_ACTIONS_TESTIMONIALS: readonly Testimonial[] = [];

export { DOCKER_TESTIMONIALS, GITHUB_ACTIONS_TESTIMONIALS };
