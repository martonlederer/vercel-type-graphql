# vercel-type-graphql
Use type-graphql with Vercel serverless functions

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