import { NowRequest, NowResponse } from '@vercel/node'

export default (req: NowRequest, res: NowResponse) => {
  return res.status(200).send(`Hello ${ req.query.name }`)
}