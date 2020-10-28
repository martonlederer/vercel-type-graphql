# vercel-type-graphql
Use [type-graphql](https://typegraphql.com/) with Vercel serverless functions

## Why use typescript with graphql?
Graphql provides it's own types and with JavaScript, these types are either overcomplicated or not compatible.
It is a better practice to use TypeScript, instead of JS.

## Usage
Check `api/index.ts` for the graphql "server". Graphql will be served on the `/api` route. The example pulls data from `data.json`

### Test
```sh
vc dev
```

### Deploy
```sh
vc deploy
```