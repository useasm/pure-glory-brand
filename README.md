# Pure Glory — storefront showcase

A fan-made concept storefront for [Pure Glory](https://t.me/pureglorybrand), a
Telegram channel run by one designer and tailor who makes one-off,
hand-finished clothes.

> [!IMPORTANT]
> **This is an unofficial fan project.**
>
> - I am not affiliated with Pure Glory in any way. I don't work for the
>   author of the channel and I don't speak for him.
> - I wasn't paid for this and I'm not asking for money, neither for the work
>   nor for the clothes. Nothing is sold through this site and the checkout
>   has no backend behind it.
> - It exists for one reason: to show what I can build and how I build it. It
>   doubles as a template anyone can reuse.
> - Product names, prices, collections, the history timeline and all the copy
>   are demo content I wrote for the showcase, not statements by Pure Glory.
>
> If you want to actually buy something, go to the Telegram channel.

## What's inside

- **Storefront**: home page, catalog with filters, search and sorting,
  collections with a scroll story, product page with a photo gallery, quick
  view.
- **Overlays**: cart with promo codes, saved pieces, account drawer, full-screen
  search.
- **Info pages**: about, journal, history, contacts, shipping and returns,
  garment care, size guide with SVG measurement diagrams, legal templates.
- **Admin panel**: dashboard with stat cards, orders, products, collections,
  users, inventory, pre-orders, messages, analytics, settings.
- **Design system**: color, type, spacing and motion tokens as CSS custom
  properties; a fixed header that adapts to what is underneath it.

## Stack

React 18, TypeScript, Vite, Tailwind CSS v4, React Router. No UI kit and no
animation library: the components, charts and transitions are written by hand.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check and build into dist/
npm run preview  # serve the production build
```

Requires Node 20 or newer.

### Demo access

- Any email and password will sign you in.
- An email starting with `admin@` gets the admin role and opens `/admin`.
- Promo codes: `PURE10` (10% off), `GLORY15` (15% off).

## Project structure

```
src/
  styles/        design tokens (colors, typography, spacing, effects) and base CSS
  data/          types and demo data (products, collections, orders, size charts)
  lib/           hooks (scroll reveal, body lock, localStorage) and formatting
  store/         React contexts: cart, wishlist, auth, overlay state
  components/
    ui/          Button, Tag, Input, Drawer, Modal, Skeleton, Reveal
    layout/      Header, Footer, Breadcrumbs
    product/     ProductCard, HoverGallery, ProductGallery, PurchasePanel
    catalog/     filters and sorting
    overlays/    CartDrawer, WishlistDrawer, AccountDrawer, SearchOverlay
    account/     auth forms and the account panel
    admin/       admin sections, tables, charts and widgets
    size-guide/  garment diagrams
  pages/         storefront pages, info pages and the admin page
public/assets/   garment photos and the wordmark
```

## What is mocked

Everything runs in the browser. There is no server.

| Area | State |
| --- | --- |
| Catalog, filters, search, galleries | Work, on static data from `src/data` |
| Cart, promo codes, saved pieces | Work, stored in `localStorage` |
| Sign in, sign up, password reset | UI only. Passwords are not checked, the "user" lives in `localStorage` |
| Admin role | Client-side only (`admin@…`). It is not access control |
| Checkout | Clears the cart, no order is created |
| Contact form, newsletter | Show a success state, send nothing |
| Admin panel | Interactive, but all numbers are constants and edits are not saved |
| Legal pages | Template text |
| Social links | Only the Telegram link is real |

## Using it as a template

- Swap the data in `src/data/` (products, collections, size charts) and the
  photos in `public/assets/imagery/`.
- Page copy lives next to the pages in `src/pages/`; the About and Journal
  texts are in `src/App.tsx`.
- Colors, fonts and spacing are all in `src/styles/*.css`.
- Mark any dark full-width block with `data-dark-zone` and the header will
  switch to its blur-only mode while it scrolls over that block.
- To add photos to a product, append paths to its `images` array. The card
  hover zones, thumbnails and counter scale with the array length.
- `AuthContext`, `CartContext` and the admin data in `src/data/adminDemo.ts`
  are the places to plug a real API into.

## License

The code is released under the [MIT License](LICENSE).

The Pure Glory name, the wordmark, the garment photos and the painting in
`public/assets/` belong to the author of the channel and are not covered by
that license. Replace them before using this project for anything of your own.
