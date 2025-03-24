---
layout: ../../../../layouts/ChapterLayout.astro

title: Installez et configurez Docker Desktop
description: Une nouvelle super description dédiée à Docker

previousChapterLink: decouverte-docker
nextChapterLink: presentation-projet-fil-rouge
---

<artice>

# Installez et configurez Docker Desktop

![Des personnes réalisant une réunion dans un bureau, pixel art](/reunion-point-webp)

## Découvrez Docker Desktop

Dans ce chapitre, vous allez prendre en main Docker Desktop. Je vous montrerais comment l’installer. Vous apprendrez à récupérer (on dit aussi “puller”) vos premières images. Ce chapitre me permettra aussi de vous montrer des commandes Docker indispensables.


Si vous êtes sur Linux, vous n’aurez pas besoin d’installer Docker Desktop. En effet, pour fonctionner Docker a besoin de Linux pour fonctionner. Donc, si vous êtes sur Linux, pas de problèmes : vous pouvez installer Docker directement. Par contre, si vous êtes sur Mac ou PC, vous aurez besoin d’une VM, VM qui tournera sur Linux. C’est Docker Desktop qui va se gérer d’installer et de tenir à jour cette VM pour vous.


Sachez que Docker Desktop est sur un modèle Freemium : l’outil est gratuit pour les particuliers et les entreprises de moins de 250 employés ou dont le chiffre d’affaires est inférieur à 10 millions de dollars. Ce changement tarifaire a eu lieu en août 2021 et a fait pas mal parlé de lui. Voici deux articles du monde informatique vous expliquant le pourquoi du comment : [le premier article](https://www.lemondeinformatique.fr/actualites/lire-docker-desktop-n-est-plus-gratuit-pour-les-entreprises%C2%A0-84012.html) et [le deuxième](https://www.lemondeinformatique.fr/actualites/lire-face-a-la-gronde-docker-justifie-la-fin-de-free-teams-89884.html).


Si ça vous intéresse d’en apprendre un peu plus sur le fonctionnement interne de Docker Desktop, vous pouvez lire [cet article](https://www.docker.com/blog/the-magic-behind-the-scenes-of-docker-desktop/) tiré du blog officiel de Docker.

---

<br>


## Installez Docker Desktop sur macOS

Dans ce screencast, vous allez voir comment installer Docker sur macOS. Vous verrez où et comment installer Docker Desktop, quelques commandes de base et vous en profiterez pour lancer votre premier conteneur.


<iframe src="https://www.youtube.com/embed/SYMPIdMC2qo" frameborder="0"  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


Félicitations, Docker Desktop est maintenant prêt à l’emploi sur votre ordinateur. La commande `docker run hello-world` est l’une des nombreuses commandes de Docker. Cette commande vous permet de lancer un conteneur avec l’image ayant le nom _hello-world_. Cette image est hébergée [sur ce repository DockerHub](https://hub.docker.com/_/hello-world).


---

<br>


## Installez Docker Desktop sur Windows

N’ayant actuellement pas d’ordinateur sur Windows me permettant de faire tourner Docker, je vous partage ce tuto Youtube. Dès que j’aurais un moyen simple de le faire, je mettrais à jour ce cours.


<iframe src="https://www.youtube.com/embed/SYMPIdMC2qo" frameborder="0"  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


Félicitations, Docker Desktop est maintenant prêt à l’emploi sur votre ordinateur. La commande `docker run hello-world` est l’une des nombreuses commandes de Docker. Cette commande vous permet de lancer un conteneur avec l’image ayant le nom _hello-world_. Cette image est hébergée [sur ce repository DockerHub](https://hub.docker.com/_/hello-world).


---

<br>


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


---

<br>


## Appréhendez la ligne de commande de Docker

Pour récupérer une image Docker NodeJS, la première est de savoir où et comment la récupérer. Pour le “où”, normalement, vous ne devriez pas être surpris si je vous parle de Dockerhub.


---

<br>


## Lancez et manipulez votre conteneur Node.js

Pour récupérer une image Docker NodeJS, la première est de savoir où et comment la récupérer. Pour le “où”, normalement, vous ne devriez pas être surpris si je vous parle de Dockerhub.


---

<br>


## Résumé

- Il est important de bien faire la différence entre une image et un conteneur Docker. Essayez, notamment au début, de toujours vous poser la question si vous manipulez une image ou un conteneur. Vous pouvez avoir 10, 20, 30 conteneurs qui utilisent la même image.
- L’interface en ligne de commandes (le CLI) de Docker vous donne beaucoup d’informations sur comment utiliser Docker. Prenez l’habitude d’utiliser l’option `--help`. Par exemple, `docker –help`, `docker volume –help`, etc.
- Essayez d’utiliser le moins possible les commandes abrégées. Par exemple, `docker container ls` au lieu de `docker ps`. Cela va vous permettre de mieux comprendre ce que vous manipulez.

</article>