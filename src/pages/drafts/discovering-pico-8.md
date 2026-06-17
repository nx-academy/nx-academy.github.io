---
layout: ../../layouts/BlogPostLayout.astro

title: "Discovering PICO-8: a fantasy console for making games"
description: "PICO-8 is a fantasy console for making small retro games. A developer's
  logbook: what it is, what you can build with it, its constraints, and why I
  love this tool."

imgAlt: PICO-8, a fantasy console for making retro games, pixel art illustration
imgSrc: /images/articles/decouvrir-pico-8.webp

kind: Articles
author: Thomas
draft: true
publishedDate: 17/06/2026
---

# Discovering PICO-8: a fantasy console for making games

A few weeks ago, I took part in my very first game jam on itch.io. I won't dwell
on it here: I'll come back to it in another article. But in short: I loved it,
and I learned a huge amount in very little time.

I built my game with MonoGame. It's a pretty cool C# framework. It lets you do a
lot, but it's a big tool. To ship the game, I quickly found myself juggling
several other programs on the side: Aseprite for the sprites and spritesheets,
and Sonic Pi for the music. It wasn't insurmountable but, honestly, that was a
lot of pieces to assemble before even writing the first line of gameplay.

It was while trying to lighten all of that, after the jam, that I stumbled onto
PICO-8. And there, it just clicked. Within minutes, I understood the tool's
potential: everything is in one place. You code, you draw, you compose, you play
— all without leaving the program.

A heads-up: this article isn't a tutorial or a technical reference. For now,
it's more of a "logbook" — in other words, the field notes of a developer
discovering PICO-8 and wanting to share why he finds the tool so clever. If
you're curious about game dev, a beginner, or simply someone who'd love to
finally _finish_ a game, you should find something for you here.

## What is PICO-8?

PICO-8 is what's called a _fantasy console_. Basically, it's a game console that
never existed. Nobody ever manufactured the machine. Its creator simply invented
its specs — a tiny screen, a handful of colors, a minuscule amount of memory —
with the idea of recreating the spirit of old consoles. The "retro" feel of the
console isn't an accident tied to age; it's a genuine design choice, embraced
from start to finish.

When you launch PICO-8, you land in a small environment where everything is
gathered together. You can run games, code your own, draw your sprites, build
your maps and compose your music. You can do all of that in one place, without
installing a single extra tool. PICO-8 bakes the code, music, sound, sprite and
map editors directly into the console. It's a bit like an IDE for video games: a
single environment that centralizes everything.

To use it, I bought the paid version from the official site. It's software that
runs on your computer (Windows, Mac or Linux) for around $15. If you just want
to try the tool before pulling out your credit card, know that there's also a
free education edition — a stripped-down version of PICO-8 officially made by
Lexaloffle, playable straight in the browser. For my part, I didn't test it; I
went all in right away.

On the code side, you program your games in Lua. I find this language very
readable. To give you a reference point, in spirit it reminded me a little of
Ruby. Nothing intimidating: it's a lightweight language you pick up fast.

## What kinds of games can you make?

Quite a lot, actually, as long as you stick to small formats. You can make
platformers, puzzlers, shoot'em ups, small roguelikes or mini-RPGs, for example.
Here, the common denominator isn't the genre, it's the scale. PICO-8 is built
for short, complete games: the kind of game you finish in one session and, above
all, that you _finish at all_. Because the code size is deliberately limited,
games stay compact: you can play them and beat them in one sitting.

This whole little world lives in an already well-stocked ecosystem. PICO-8 ships
with a built-in cartridge browser to explore what others have created. On top of
that, most of these games play directly in the browser. It's hard to make
sharing or discovering a game any simpler.

Personally, I mostly see PICO-8 as a fantastic prototyping tool. The idea:
quickly put together a playable prototype, share it, gather feedback, and start
building a community around your concept. If the potential is there, nothing
stops you from later moving to a beefier toolchain (MonoGame, Aseprite and
friends) to turn it into a more ambitious "commercial" version.

The perfect example here is Celeste. The original game (now called Celeste
Classic) was developed in PICO-8 by Maddy Thorson and Noel Berry in just four
days, as part of a game jam, back in 2016. That little prototype went on to
become one of the most acclaimed indie platformers of its time: the full game
shipped in January 2018, this time rebuilt in C#. One and the same idea, then —
one that stands perfectly well on its own as a PICO-8 game, and that served as a
springboard to a far more ambitious one. Both at once.

## Why I find it interesting

PICO-8 lets me focus on the very essence of video games: game design (I've been
reading a lot about it lately, and I'll come back to it soon). It's entirely
possible to make a cute little game and polish your pixels. But above all, the
tool pushes you to work on _game feel_ — the way a jump responds, the way
movement feels crunchy and satisfying, the way difficulty ramps up. Everything
else matters less. All that's left is the one question that really counts: is it
good to play?

Being able to focus on game design is, in large part, down to the fact that
everything is centralized. There's no toolchain to set up, no back-and-forth
between five programs. With PICO-8, I code, I draw, I compose, all in one place.
The upshot is that I move much faster and tie myself in far fewer knots. What's
more, since you go back to the fundamentals — the game loop, sprites, collisions
— without a heavy framework to tame, the feedback loop is almost instant! I
tweak a line, I rerun, and I see the result within a second.

There's also a point I find far from negligible: distribution. PICO-8 lets you
export your game to HTML/JavaScript, making it playable in a browser in one
click. Concretely, that means you can spread your game and get it known very
quickly, without asking anyone to install anything. For a creator looking for
feedback as well as a community, that's precious.

Finally, something I care about. You can absolutely lean on AI for the code. But
for the music and the sprites, you're still largely left to get your hands dirty
and make them yourself. And honestly? I think that's great. That manual work is
precisely what gives a game its personality and its character.

## Constraints (and why they're a strength)

For me, it's constraints that give rise to the best games. That's part of why I
got into game jams. I like creating under constraint, a bit like in cooking,
when you have to make do with what's on hand rather than an infinite pantry.
Having a frame is what unlocks my creativity.

And constraints are something PICO-8 has no shortage of. The screen is a small
128×128 pixel grid, the palette is fixed at 16 colors, and the code itself is
limited: a cartridge (a game file) can't exceed 8192 _tokens_. Basically, every
word, number, parenthesis or punctuation mark counts. So you simply don't have
the room to spread yourself thin.

That's exactly where the constraint becomes a strength. When space is tight, you
stop dithering over a thousand options and you get to the essentials. It forces
you back to the heart of video games, to focus on game design without letting
your mind get cluttered by everything that's superfluous. Better still: having
to fit your ideas into so little space teaches you to write more efficient code
and to approach every problem with creativity. The limit doesn't curb
inventiveness — it fuels it.

Let's be honest for a second: this frame has its flip side too. PICO-8 isn't
made for sprawling games. On an ambitious project, you'll eventually hit the
token ceiling — and then you have to either optimize what's already there or
port the game to a larger platform (back to the path mentioned above). But for
what PICO-8 is going for — small games with character — these limits aren't an
obstacle. They're the playground.

## A quick look at the code

Don't panic, we're not going to dive into a full tutorial here. I just want to
show you what the skeleton of a PICO-8 game looks like, to demystify the whole
thing.

It all revolves around three functions that you define, and that PICO-8 calls
for you:

```lua
function _init()
  x = 0
end

function _update()
  x = x + 1
end

function _draw()
  cls()
  print("hello pico-8!", x, 60)
end
```

This tiny program displays the text "hello pico-8!" drifting gently to the
right. And it illustrates the whole mental model:

- `_init()` is called once, at startup. This is where you set up the initial
  state. In our case, we set the variable `x` to 0.
- `_update()` is called on every frame, 30 times a second. It's the game's
  logical core: this is where you evolve the state. Here, we increment `x`, so
  the position advances frame after frame.
- `_draw()` is also called on every frame, to draw. `cls()` clears the screen
  (otherwise the text would leave a trail behind it), and `print()` displays our
  message at position `x` on the horizontal axis, 60 pixels from the top.

The thing to remember here is this separation: on one side what _changes_
(`_update`), on the other what _gets shown_ (`_draw`). You never write the game
loop yourself. You fill in these three slots and the engine takes care of the
timing. Once you've got that, you've got the thread of almost every PICO-8 game.

## What's next?

I'm only just getting started with PICO-8, but I already know I'll be sticking
with it for a while. The tool has something addictive about it: that feeling of
being able to go from idea to playable prototype in a single evening,
friction-free.

So I fully intend to dig into the subject here on NX. Over the coming weeks, I'd
like to write a few tutorials — and maybe shoot some videos — to build a small
platformer together, step by step. If the urge to code your first game is
tickling you, this'll be the perfect chance to get going.

In parallel, I'm about to take part in a new game jam: the Retro Recreation Jam,
which kicks off in a few days. The premise: take a game from before the NES era
and reimagine it your own way. I already have my idea in mind, but I'll tell you
more about it very soon.

In the meantime, if this article has made you want to try PICO-8, don't
overthink it: fire up the free version in your browser, type a couple of lines,
and see where it takes you. That's often how the best stories begin.

## Resources

- The official PICO-8 site, to buy the tool and explore the console:
  [lexaloffle.com/pico-8](https://www.lexaloffle.com/pico-8.php).
- The official manual, which covers the whole API as well as the built-in
  editors' functions:
  [the PICO-8 manual](https://www.lexaloffle.com/dl/docs/pico-8_manual.html).
