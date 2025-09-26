---
layout: ../../layouts/BlogPostLayout.astro

title: "Le récap #6 - Septembre 2025"
description: "Au sommaire de cette édition de septembre, une collecte pour
libérer JavaScript d'Oracle, des packages npm compris, la future de jQuery 4 et
la fermeture d'une école."

imgAlt: Un vendeur de journaux dans un kiosque parisien, pixel art
imgSrc: /images/articles/kiosque-journaux.webp

kind: Articles
author: Thomas
draft: false
publishedDate: 09/26/2025
---
    
# Le récap #6 - Septembre 2025

<img src="/images/articles/kiosque-journaux.webp" alt="Un vendeur de journaux dans un kiosque parisien, pixel art" style="aspect-ratio: 1792 / 1024; object-fit: cover; width: 100%; display: block; object-position: top" />

<br>

## Aidez-nous à collecter 200 000 $ pour libérer JavaScript d'Oracle
<small>Ryan Dahl</small>

Deno a lancé une campagne de financement participatif pour collecter 200 000 $ afin de contester la marque déposée "JavaScript" détenue par Oracle. Cette action vise à démontrer que "JavaScript" est devenu un terme générique et ne devrait pas être la propriété exclusive d'une entreprise. Le financement soutiendra les frais juridiques et les expertises nécessaires pour libérer le terme "JavaScript" et le rendre accessible à tous les développeurs sans crainte de litiges.

[Lire l'article](https://deno.com/blog/javascript-tm-gofundme)

<br>
        
---
## Attaque continue de la chaîne d'approvisionnement ciblant les packages npm de CrowdStrike
<small>Kush Pandya, Peter van der Zee, Olivia Brown, Socket Research Team</small>

Socket a détecté plusieurs packages npm de CrowdStrike compromis, poursuivant l'attaque de chaîne d'approvisionnement malveillante "Shai-Hulud" qui a déjà affecté près de 500 packages. Le malware, identique à celui des campagnes précédentes, inclut un script `bundle.js` qui télécharge et exécute TruffleHog, recherche des tokens et des identifiants cloud sur les systèmes hôtes, valide les identifiants découverts, crée des workflows GitHub Actions non autorisés dans les dépôts et exfiltre les données sensibles vers un point de terminaison webhook codé en dur. **Bref, c'est la merde !** Les packages affectés ont été rapidement supprimés du registre npm. Le malware inclut un fichier de workflow nommé `shai-hulud.yaml`, en référence aux vers des sables dans Dune, renforçant le fait que l'attaquant a délibérément nommé la campagne "Shai-Hulud". 

[Lire l'article](https://socket.dev/blog/ongoing-supply-chain-attack-targets-crowdstrike-npm-packages)

<br>
        
---
## jQuery 4.0.0 Release Candidate 1
<small>Timmy Willison</small>

La version candidate 1 de jQuery 4.0.0 est disponible, marquant une étape majeure avant la version finale. Cette mise à jour supprime le support des versions d'Internet Explorer antérieures à la version 11, retire des API obsolètes et simplifie le code en éliminant des comportements complexes. Les fichiers sont accessibles via le CDN de jQuery et le gestionnaire de paquets npm. **Si vous ne connaissez pas jQuery, il s'agit de l'un des premiers frameworks front. On l'a pas pas mal critiqué notamment avec l'arrivé des frameworks SPA comme React ou Angular. Cela dit, ce "dinosaure" reste encore le framework JavaScript le plus utilisé sur la toile**.

[Lire l'article](https://blog.jquery.com/2025/08/11/jquery-4-0-0-release-candidate-1/)

<br>
        
---
## Game Over
<small>Franck Jeannin Lasse</small>

Dans cet article LinkedIn, Franc Jeannin Lasse revient sur l'école Algosup
qu'il a crée il y a maintenant quelques années et qui a fermé à la rentrée
septembre 2025. Pour être parfaitement honnête, je suis un peu mal à l'aise
avec le ton de l'article. À aucun moment, il ne parle des familles et des
élèves qui ont dû s'endeter pour en faire parti. Je trouve assez limite. (Je ne
vais pas me faire des amis en disant ça). Je vous invite à lire [cet autre
article](https://www.vierzonitude.fr/2025/07/algosup-ferme-ses-portes.html) qui parle un peu des raisons. 

[Lire l'article](https://www.linkedin.com/pulse/game-over-franck-jeannin-lasse/)

<br>
        
---

Bonne lecture et on se retrouve **au mois d'octobre !**

