import type { Collection } from './types';

export const collections: Collection[] = [
  {
    slug: 'underground',
    name: 'Underground',
    number: '№06',
    subtitle: 'Stripes knocked off rhythm',
    heroImage: '/assets/imagery/wear-striped-splatter.jpg',
    description:
      'About what lives under the surface of a city: a rhythm of stripes broken by paint. Every shirt is painted by hand and none of them repeat.',
    story: [
      'I started with a classic striped shirt, the most “correct” thing in a wardrobe. Then I let paint do to it what a city does to plans: break the rhythm, leave a mark, add an accident.',
      'No stencils. I work on each piece separately and the pattern happens in one sitting. I couldn’t repeat it even if I wanted to.',
      'Underground isn’t a protest. It’s a quiet life below the surface. Real things are rarely on display.',
    ],
    imagery: [
      '/assets/imagery/wear-striped-splatter.jpg',
      '/assets/imagery/wear-graffiti-crimson.jpg',
    ],
  },
  {
    slug: 'seabed-pearl',
    name: 'Pearl of the Seabed',
    number: '№07',
    subtitle: 'Gold raised from the bottom',
    heroImage: '/assets/imagery/wear-gold-foil-crumple.jpg',
    description:
      'Gold foil on crumpled fabric, like light on water above something sunk. About value you can’t see from the surface.',
    story: [
      'The foil only catches the creases, so I crumple the fabric on purpose before applying it. Iron the shirt flat and it still keeps a map of its own folds in gold.',
      'A pearl grows in the dark, under pressure. Same idea here: the valuable stuff forms where nobody is looking.',
    ],
    imagery: [
      '/assets/imagery/wear-gold-foil-crumple.jpg',
      '/assets/imagery/painting-downpour.jpg',
    ],
  },
  {
    slug: 'cubism',
    name: 'Cubism',
    number: '№04',
    subtitle: 'A character as a gesture',
    heroImage: '/assets/imagery/wear-kanji-brush.jpg',
    description:
      'A wide brush, one stroke, no way to fix it. Calligraphy on fabric where shape matters more than meaning.',
    story: [
      'A brushstroke on fabric can’t be rewritten. One move, and the piece either works or goes into the archive. Less than half make it out.',
      'Cubism took form apart into planes. I take a gesture apart into threads.',
    ],
    imagery: [
      '/assets/imagery/wear-kanji-brush.jpg',
      '/assets/imagery/wear-striped-splatter.jpg',
    ],
  },
  {
    slug: 'isabelle',
    name: 'Isabelle — Thorns and Roses',
    number: '№08',
    subtitle: 'Embroidery on ivory',
    heroImage: '/assets/imagery/wear-embroidered-ivory.jpg',
    description:
      'Hand embroidery on an ivory shirt. Tenderness that knows how to defend itself.',
    story: [
      'Each flower takes about six hours. The thread sits dense and raised, you can read the piece with your fingers.',
      'Isabelle is made up. She wears the roses together with the thorns and doesn’t apologise for either.',
    ],
    imagery: [
      '/assets/imagery/wear-embroidered-ivory.jpg',
      '/assets/imagery/wear-gold-foil-crumple.jpg',
    ],
  },
  {
    slug: 'isolation',
    name: 'Isolation',
    number: '№05',
    subtitle: 'Graffiti in quarantine',
    heroImage: '/assets/imagery/wear-graffiti-crimson.jpg',
    description:
      'Crimson graffiti painted inside four walls. Street energy locked into fabric.',
    story: [
      'This one was made in a workshop I didn’t leave for a month. I ran out of walls, so I moved on to shirts.',
      'Crimson is the only colour here. Isolation doesn’t give you a palette to choose from.',
    ],
    imagery: [
      '/assets/imagery/wear-graffiti-crimson.jpg',
      '/assets/imagery/wear-kanji-brush.jpg',
    ],
  },
];

export const getCollection = (slug: string) =>
  collections.find((c) => c.slug === slug);
