---
layout: ../../../../layouts/ChapterLayout.astro

title: Installez et configurez Docker Desktop
description: Une nouvelle super description dédiée à Docker

previousChapterLink: decouverte-docker
nextChapterLink: presentation-projet-fil-rouge

chapterNumber: 2
sectionNumber: 1
id: 2
---

<artice>

# Installez et configurez Docker Desktop

![Un superhero regardant une ville de nuit, pixel art](/cours-docker/port-avec-conteneurs.png)

## Découvrez Docker Desktop

Dans ce chapitre, vous allez prendre en main Docker Desktop. Je vous montrerais comment l’installer. Vous apprendrez à récupérer (on dit aussi “puller”) vos premières images. Ce chapitre me permettra aussi de vous montrer des commandes Docker indispensables.


Si vous êtes sur Linux, vous n’aurez pas besoin d’installer Docker Desktop. En effet, pour fonctionner Docker a besoin de Linux pour fonctionner. Donc, si vous êtes sur Linux, pas de problèmes : vous pouvez installer Docker directement. Par contre, si vous êtes sur Mac ou PC, vous aurez besoin d’une VM, VM qui tournera sur Linux. C’est Docker Desktop qui va se gérer d’installer et de tenir à jour cette VM pour vous.


Sachez que Docker Desktop est sur un modèle Freemium : l’outil est gratuit pour les particuliers et les entreprises de moins de 250 employés ou dont le chiffre d’affaires est inférieur à 10 millions de dollars. Ce changement tarifaire a eu lieu en août 2021 et a fait pas mal parlé de lui. Voici deux articles du monde informatique vous expliquant le pourquoi du comment : [le premier article](https://www.lemondeinformatique.fr/actualites/lire-docker-desktop-n-est-plus-gratuit-pour-les-entreprises%C2%A0-84012.html) et [le deuxième](https://www.lemondeinformatique.fr/actualites/lire-face-a-la-gronde-docker-justifie-la-fin-de-free-teams-89884.html).


Si ça vous intéresse d’en apprendre un peu plus sur le fonctionnement interne de Docker Desktop, vous pouvez lire [cet article](https://www.docker.com/blog/the-magic-behind-the-scenes-of-docker-desktop/) tiré du blog officiel de Docker.

---

<br>

![Un superhero regardant une ville de nuit, pixel art](/cours-docker/installation-logiciel.png)

## Installez Docker Desktop sur macOS

Dans ce screencast, vous allez voir comment installer Docker sur macOS. Vous verrez où et comment installer Docker Desktop, quelques commandes de base et vous en profiterez pour lancer votre premier conteneur.


<iframe src="https://www.youtube.com/embed/A96M5PhFP_4" frameborder="0"  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


Félicitations, Docker Desktop est maintenant prêt à l’emploi sur votre ordinateur. La commande `docker run hello-world` est l’une des nombreuses commandes de Docker. Cette commande vous permet de lancer un conteneur avec l’image ayant le nom _hello-world_. Cette image est hébergée [sur ce repository DockerHub](https://hub.docker.com/_/hello-world).


---

<br>

![Un superhero regardant une ville de nuit, pixel art](/cours-docker/installation-logiciel.png)

## Installez Docker Desktop sur Windows

N’ayant actuellement pas d’ordinateur sur Windows me permettant de faire tourner Docker, je vous partage ce tuto Youtube. Dès que j’aurais un moyen simple de le faire, je mettrais à jour ce cours.


<iframe src="https://www.youtube.com/embed/SYMPIdMC2qo" frameborder="0"  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


Félicitations, Docker Desktop est maintenant prêt à l’emploi sur votre ordinateur. La commande `docker run hello-world` est l’une des nombreuses commandes de Docker. Cette commande vous permet de lancer un conteneur avec l’image ayant le nom _hello-world_. Cette image est hébergée [sur ce repository DockerHub](https://hub.docker.com/_/hello-world).


---

<br>

![Un superhero regardant une ville de nuit, pixel art](/cours-docker/hacker-sombre.png)

## Appréhendez la ligne de commande de Docker

Vous allez voir au fur et à mesure du cours qu’il y a beaucoup de commandes possibles avec Docker. Il y a des commandes dont vous vous servez quasiment tout le temps et d’autres un peu moins.

Il existe une commande centrale : `docker —help`. Ouvrez votre terminal et tapez cette commande. Vous devriez avoir un résultat proche du mien.


```bash
docker --help


Usage:  docker [OPTIONS] COMMAND

A self-sufficient runtime for containers

Options:
  	--config string  	Location of client config files (default "/Users/family/.docker")
  -c, --context string 	Name of the context to use to connect to the daemon (overrides DOCKER_HOST env var and default context set with "docker context use")
  -D, --debug          	Enable debug mode
  -H, --host list      	Daemon socket(s) to connect to
  -l, --log-level string   Set the logging level ("debug"|"info"|"warn"|"error"|"fatal") (default "info")
  	--tls            	Use TLS; implied by --tlsverify
  	--tlscacert string   Trust certs signed only by this CA (default "/Users/family/.docker/ca.pem")
  	--tlscert string 	Path to TLS certificate file (default "/Users/family/.docker/cert.pem")
  	--tlskey string  	Path to TLS key file (default "/Users/family/.docker/key.pem")
  	--tlsverify      	Use TLS and verify the remote
  -v, --version        	Print version information and quit

Management Commands:
  builder 	Manage builds
  buildx* 	Docker Buildx (Docker Inc., v0.10.3)
  compose*	Docker Compose (Docker Inc., v2.15.1)
  # [...]
  trust   	Manage trust on Docker images
  volume  	Manage volumes

Commands:
  attach  	Attach local standard input, output, and error streams to a running container
  build   	Build an image from a Dockerfile
  # [...]
  version 	Show the Docker version information
  wait    	Block until one or more containers stop, then print their exit codes

Run 'docker COMMAND --help' for more information on a command.
```


Si vous n’avez pas l’habitude, je vous invite à utiliser l’argument `--help` sur tous les programmes en CLI que vous utilisez. C’est souvent votre meilleur ami pour apprendre comment une commande fonctionne. Vous pouvez aussi avoir plus d’informations sur une commande en particulier via la docker `COMMAND --help` (c.f. la dernière ligne du bout de code ci-dessus).


<br>


Vous avez précédemment lancé la commande docker run hello-world. Pour afficher l’aide de cette commande, tapez `docker run –help`. Vous devriez avoir un résultat semblable à celui ci-dessous.


```bash
docker run --help


Usage:  docker run [OPTIONS] IMAGE [COMMAND] [ARG...]

Run a command in a new container

Options:
  	--add-host list              	Add a custom host-to-IP mapping (host:ip)
  -a, --attach list                	Attach to STDIN, STDOUT or STDERR
  	--blkio-weight uint16        	Block IO (relative weight), between 10 and 1000, or 0 to disable (default 0)
  	--blkio-weight-device list   	Block IO weight (relative device weight) (default [])
  	--cap-add list               	Add Linux capabilities
  	--cap-drop list              	Drop Linux capabilities
  	--cgroup-parent string       	Optional parent cgroup for the container
  	--cgroupns string            	Cgroup namespace to use (host|private)
                                   	'host':	Run the container in the Docker host's cgroup 
# [...]
  -v, --volume list                	Bind mount a volume
  	--volume-driver string       	Optional volume driver for the container
  	--volumes-from list          	Mount volumes from the specified container(s)
  -w, --workdir string             	Working directory inside the container
```


Je sais ce que vous vous dites : ça fait beaucoup d’informations pour une simple commande. Vous n’avez pas besoin de tout savoir et de tout connaître. Il faut juste savoir que ça existe et comment accéder à cette information. Comme la description le précise, la commande `docker run` permet de lancer une commande dans un nouveau conteneur.


<br>


La partie Usage est particulièrement importante : elle vous permet de voir ce qui est requis et optionnel à votre commande.


```bash
Usage:  docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```


<br>


- `[OPTIONS]` est optionnelle. Ce sont toutes les options que vous allez pouvoir passer à Docker et plus précisément, dans le cas ci-dessus, à une image Docker. Pour rappel la liste des options est affichée avec la commande `docker run –help`.
- `IMAGE` est obligatoire. Cela correspond à l’image que vous allez utiliser pour votre conteneur Docker. Vous avez précédemment utilisé l’image hello-world.
- `[COMMAND]` est optionnelle. C’est la commande que vous allez lancer dans votre conteneur Docker. Par exemple, yarn ou yarn dev ou ls. Vous verrez dans la dernière section quelques exemples de commandes.
- `[ARG…]` est aussi optionnelle. Ce sont les arguments de votre commande. Par exemple, --help ou plus précisément yarn –help ou npm –help. Vous pourriez ainsi avoir une commande tel que `docker run my-image npm run dev –port 3000`, à savoir lancer un conteneur avec une image my-image où la commande pour lancer le projet est npm run dev.


<br>


À ce stade du cours, il est possible que vous soyez encore perdu entre les images et les conteneurs. C’est parfaitement normal. On passe tous par cette étape (en tout cas, j’y suis passé ^^). Une image Docker est comme une empreinte digitale ou un moule ; souvenez-vous de l’exemple des gâteaux. Votre image est prête à l’emploi mais elle ne “tourne” pas.


Pour exécuter le code ou le programme contenu dans votre image, vous avez besoin de la faire tourner dans un conteneur. La commande `docker run` permet donc de faire tourner l’image Docker dans un conteneur Docker. Le conteneur Docker correspond à votre gâteau 🙂.


Dernier point essentiel : la commande `docker run` est une abréviation de la commande `docker container run`. Vous allez voir qu’il existe beaucoup de commandes abrégées. J’avoue ne pas être très fan de ces commandes abrégées. Elles ont tendance à nous faire oublier ce qu’on manipule, à savoir un conteneur, une image, un réseau, etc.


Durant tout le cours, je vais utiliser les commandes complètes, à savoir docker container run, docker container exec, docker image pull, etc. Cela devrait vous aider à accélérer votre apprentissage.


<br>

On va se faire un premier screencast où je vais reprendre les notions dont je viens de parler. Vous verrez ensuite d’autres commandes de base de Docker.


<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1082571257?h=c2d1b301ff&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Screencast 6 - Clonez le projet fil rouge"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>


Maintenant que vous avez pris en main l’interface en ligne de commandes de Docker (le CLI), vous allez apprendre à récupérer une image Node.js depuis DockerHub.


---

<br>


## Récupérez une image Node.JS

**Pour récupérer une image Docker NodeJS, la première est de savoir où et comment la récupérer**. Pour le “où”, normalement, vous ne devriez pas être surpris si je vous parle de Dockerhub. Allez [sur Dockerhub](https://hub.docker.com/) et tapez _Node_ dans la barre de recherche. Vous devriez avoir des résultats similaires à l’image ci-dessous.


<br>


![La page de recherche de DockerHub quand vous tapez Node.JS dans la barre de recherche](/dockerhub-node.png)


<br>

Vous voyez le texte écrit en vert (en espérant que vous ne soyez pas daltonien 😀) : “Docker Official Image”. **Quand vous choisissez votre image sur DockerHub, essayez de privilégier les images officielles**. C’est un signe de qualité (et de sécurité), autrement dit, vous pouvez y aller les yeux fermés. D’ailleurs, le site de DockerHub l’explique lui aussi :

<br>

![Une capture d'écran montrant les avantages des images officielles selon Docker](/avantages-image-officielle-docker.png)


<br>


Cliquez sur la page de Node, vous devriez là encore avoir un résultat similaire à l’image ci-dessous.


<br>

![Une capture d'écran de l'image officielle de Node.JS sur DockerHub](/image-officielle-node-js.png)

<br>


Il y a beaucoup d’informations affichées à l’écran mais celle qui m’intéresse est située en haut à droite : `docker pull node`. **Cette commande va vous permettre de récupérer la dernière image de Node en date**. C’est l'abréviation de la commande `docker image pull node`. Ouvrez votre terminal et lancez cette commande. Cela va vous faire télécharger la dernière image Node, sauf si vous avez déjà récupéré cette image au préalable.

Pour consulter les images présentes sur votre ordinateur, tapez la commande `docker image ls`.


<br>

```bash
docker image ls

REPOSITORY	TAG   	IMAGE ID   	CREATED     	SIZE
node      	latest	c080a37e3dd2   18 hours ago	949MB
hello-world   latest	46331d942d63   12 months ago   9.14kB
```

<br>


J’ai deux images sur mon ordinateur : `node` et `hello-world`. J’ai leur taille, le nom du repository et leur tag. Sachez que nous reviendrons sur la notion de tag d’ici peu de temps 😉.

<br>

Le screencast ci-dessous reprend ce que je viens de faire mais en vidéo. Encore une fois, cela devrait vous permettre d’apprendre un peu plus vite. 


---

<br>


## Lancez et manipulez votre conteneur Node.js

Commencez par taper la commande `docker container –help` dans votre terminal.

<br>

```bash
docker container --help


Usage:  docker container COMMAND

Manage containers

Commands:
  attach  	Attach local standard input, output, and error streams to a running container
  commit  	Create a new image from a container's changes
  cp      	Copy files/folders between a container and the local filesystem
  # [...]
  unpause 	Unpause all processes within one or more containers
  update  	Update configuration of one or more containers
  wait    	Block until one or more containers stop, then print their exit codes

Run 'docker container COMMAND --help' for more information on a command.
```

Essayez de lire un peu ce que fait chacune des commandes. **Sachez qu’on utilise régulièrement les commandes** `docker container exec`, `docker container run`, `docker container ls` et `docker container kill`. Lisez un peu la documentation de chacune de ces commandes avec le *--help*. Pour être tout à fait honnête, je trouve la documentation du CLI de Docker particulièrement bien fournie et claire.

<br>

On va maintenant lancer notre premier conteneur Node.js. Vérifiez que vous avez bien l’image de Node sur votre ordinateur via la commande docker image ls. Puis, écrivez docker container run node ls dans votre terminal et appuyez sur entrer.

```bash
docker container run node ls

bin
boot
dev
etc
home
# [...]
usr
var
```

Cette commande va vous permettre d'exécuter la commande ls à l’intérieur de votre conteneur. Vous êtes actuellement à la racine de votre linux. Pour afficher le contenu du répertoire bin, tapez docker container run node ls bin. Si vous connaissez un peu linux et la ligne de commandes, vous ne devriez pas être trop perdu.

<br>

Admettons maintenant que vous souhaitez connaître la version de node de votre conteneur Docker. Vous pouvez le faire via la commande docker container run node node -v.

```bash
docker container run node node -v

v19.8.1
```

---


<br>

![Un vendeur de journaux dans une rue, pixel art](/vendeur-journaux.webp)



## Résumé

- Il est important de bien faire la différence entre une image et un conteneur Docker. Essayez, notamment au début, de toujours vous poser la question si vous manipulez une image ou un conteneur. Vous pouvez avoir 10, 20, 30 conteneurs qui utilisent la même image.
- L’interface en ligne de commandes (le CLI) de Docker vous donne beaucoup d’informations sur comment utiliser Docker. Prenez l’habitude d’utiliser l’option `--help`. Par exemple, `docker –help`, `docker volume –help`, etc.
- Essayez d’utiliser le moins possible les commandes abrégées. Par exemple, `docker container ls` au lieu de `docker ps`. Cela va vous permettre de mieux comprendre ce que vous manipulez.

</article>