# HTML page generator

A simple, fast web app to generate html based on a collection of commonly used user interface patterns and popular css-frameworks.

Drag & Drop elements to visually create a template for your landing page!

Based on [Nuxt Stitches for tailblocks](https://nekdolan.github.io/nuxt-stitches-for-tailblocks/)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate

# run ta config viewer
$ npm run tailwind-config-viewer
```

## Make your own templates

Feel free to take this project and re-factor to your need! Not everyone wants these templates for their projects. Here are the steps:

1. Run the project locally
2. Add your own HTML template into the corresponding framework folder inside `templates` folder or create new css framework folder
3. Add template snapshots into corresponding framework folder inside `images` folder. Corresponding framework folder names must be identical
4. Add a filter for it in the `index.vue`.
5. Done! refresh to check out your own templates.

## License

MIT © [Amie Chen](https://amie-chen.com) - Stiches Template Generator

MIT © [Mert Cukuren](https://mertjf.github.io/tailblocks/) - tailblocks Ready-to-use Tailwind Blocks

MIT © [Fabio Maienschein](https://maienschein.tech/) - putting those two together for simplicity

MIT © [nekdolan](https://github.com/nekdolan) - convert it all to nuxt
