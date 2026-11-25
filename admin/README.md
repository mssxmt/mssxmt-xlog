# Admin / editor code (NOT part of the public site)

This directory holds the article editor and authentication code that used
to be deployed as part of the public site. On the
`feat/public-readonly-no-auth` branch it was moved out of the Next.js
app so that the public deployment is read-only:

- No `/api/auth/*` routes (no login, logout, callback, or token endpoint)
- No `/create` editor pages, no edit/delete buttons in the public UI
- No `@auth0/nextjs-auth0`, no Firebase client SDK, no client-side
  Apollo wrapper fetching access tokens
- Public pages read from Hasura with the `anonymous` role only
  (`lib/apollo/apolloClient.ts`, server-side)

## What is preserved here

| Path | Originally |
| --- | --- |
| `app-create/page.tsx`, `app-create/[id]-page.tsx`, `app-create/[id]-layout.tsx` | `app/create/**` |
| `api-auth/auth0-route.ts` | `app/api/auth/[auth0]/route.ts` |
| `api-auth/token-route.ts` | `app/api/auth/token/route.ts` |
| `components/edit.tsx`, `components/editor.tsx` | article editor (EditorJS) |
| `components/editArticleButton*.tsx`, `components/deleteArticleButton.tsx` | edit/delete UI |
| `components/ReactToalsyProvider.tsx` | toast provider used by the editor |
| `lib/apollo-wrapper.tsx` | client Apollo provider with Auth0 token link |
| `lib/firebase.ts`, `lib/uploadImage.ts` | Firebase Storage image upload |

Relative imports inside these files still point at their original
locations; they are preserved as a starting point, not as a runnable
app.

## How to write articles now

Until a local-only admin is built, use one of:

1. **Hasura console / GraphQL API from your own machine** with the
   admin secret (`HASURA_GRAPHQL_ADMIN_SECRET`, never deploy it to the
   public site). The mutations are the ones in
   `lib/service/queries.graphql` (`insert_Article`,
   `update_Article_by_pk`, `delete_Article_by_pk`); article `content`
   is the EditorJS JSON string.
2. The previous branch (`chore/upgrade-next-and-deps`) run **locally
   only** — it still contains the full Auth0 editor. Do not deploy it
   publicly.

## Reviving this as a local-only admin

- Create a separate app (or a separate deployment protected by
  network-level access control) and move this code back there.
- Dependencies removed from the public `package.json` that the editor
  needs: `@auth0/nextjs-auth0`, `@apollo/experimental-nextjs-app-support`,
  `firebase`, `react-toastify`, `react-hook-form`, `@editorjs/code`,
  `@editorjs/delimiter`, `@editorjs/header`, `@editorjs/image`,
  `@editorjs/nested-list`.
- Never merge this directory back into the public `app/` router.
