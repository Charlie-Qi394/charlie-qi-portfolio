# Charlie Qi — Living Systems

Personal portfolio combining applied AI engineering with biotech and nutrition R&D context.

[Visit the live portfolio](https://charlie-qi394.github.io/charlie-qi-portfolio/)

## Experience

- Formulation Optimisation Platform is the flagship, with an illustrative interactive mass-balance preview.
- Ten showcased projects, expandable engineering details and a supporting Job Application OS recommendation-deck demo.
- Latest spotlight: [Formulation Cost Optimisation & Supply Chain Planner](public/projects/formulation-supply-planner), with an anonymised workflow preview of independent inventory-constrained supply/cost planning and five saved scenarios. The workbook, source code and formulation details are not distributed. Inventory is manually entered today; live feeds are a roadmap item.
- Original molecular artwork, responsive layout, keyboard-accessible controls and light/dark themes.
- Résumé available on request only. No résumé downloads or private application data are included.

## Development

```sh
npm ci
npm run dev
npm run build
```

React + Vite, Inter fonts bundled locally, Lucide icons. GitHub Actions deploys `dist` to GitHub Pages on pushes to main. `design-qa.md` records visual and interaction validation; local screenshots stay in gitignored `qa/`.

The scientific artwork is decorative. The mass-balance and job demos use illustrative inputs and run entirely in the browser. They do not access the private job application app or submit applications.

