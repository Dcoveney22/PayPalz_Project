import express, { Request, Response } from 'express'
import MemberAndGroupService from './services/MemberAndGroupService'
import cors from 'cors'
const memberAndGroupService = new MemberAndGroupService()

const port = 3000
const app = express()

const options: cors.CorsOptions = {
  origin: ['http://localhost:5173'],
}

app.use(cors(options))

app.get('/groups', async (req: Request, res: Response) => {
  const username = req.query.username

  const groups = await memberAndGroupService.getGroupsForUser(
    username as string
  )

  res.status(200).json(groups)
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
