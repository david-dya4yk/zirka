# Zirka

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · SCSS Modules · ESLint · Stylelint · Prettier.

## Requirements

Node.js >= 20.9

## Scripts

| Script                     | Description                                 |
| -------------------------- | ------------------------------------------- |
| `npm run dev`              | Dev server on http://localhost:3000         |
| `npm run build`            | Production build                            |
| `npm run start`            | Serve the production build                  |
| `npm run typecheck`        | `tsc --noEmit`                              |
| `npm run lint`             | ESLint (type-aware)                         |
| `npm run lint:fix`         | ESLint with autofix                         |
| `npm run lint:styles`      | Stylelint over `src/**/*.scss`              |
| `npm run format`           | Prettier write                              |
| `npm run check`            | typecheck + lint + stylelint + format check |
| `npm run scss:types`       | Regenerate `*.module.scss.d.ts`             |
| `npm run scss:types:watch` | Same, in watch mode                         |

## Structure

```
src/
  app/            App Router routes, layouts, route-level *.module.scss
  components/     Shared React components
  styles/
    _breakpoints.scss   Breakpoint map
    _variables.scss     Tokens
    _mixins.scss        up() / down() / helpers
    _index.scss         Forwards the three above
    globals.scss        Reset + base layer
```

## Styling

`src/styles/_index.scss` is auto-injected into every `.scss` file via `sassOptions.additionalData`,
so `$gutter`, `@include up('md')` and friends are available without an explicit `@use`.
Do not `@use 'index'` manually — it will collide with the injected one.

Class names are typed: `npm run scss:types` generates a `.d.ts` next to each `*.module.scss`,
and it runs automatically before `dev`, `build`, `typecheck` and `lint`. The generated files are
git-ignored.

## Strictness

- `tsconfig.json` enables every strict family flag plus `noUncheckedIndexedAccess`,
  `exactOptionalPropertyTypes`, `noPropertyAccessFromIndexSignature`, `verbatimModuleSyntax`,
  `noUnusedLocals`/`noUnusedParameters`, `noImplicitReturns`, `noImplicitOverride`.
- ESLint runs `typescript-eslint` `strictTypeChecked` + `stylisticTypeChecked` on top of
  `eslint-config-next`, with Prettier as the last layer.
- Type errors fail the build (`typescript.ignoreBuildErrors: false`).
