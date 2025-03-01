import express, { Request, Response } from 'express'
import MemberAndGroupService from './services/MemberAndGroupService'
import cors from 'cors'
import AuthService from './services/AuthService'
import 'dotenv/config'
import ExpenseService from './services/ExpenseService'

const jwtSecret = process.env.JWT_SECRET
if (!jwtSecret) throw new Error('Missing ENV variables')

const memberAndGroupService = new MemberAndGroupService()
const authService = new AuthService(jwtSecret)
const verifyToken = authService.verifyToken.bind(authService)
const expenseService = new ExpenseService()

const port = 3000
const app = express()
app.use(express.json())

const options: cors.CorsOptions = {
  origin: ['http://localhost:5173'],
}

app.use(cors(options))

app.get('/expenses/:groupID', verifyToken, async (req, res) => {
  const groupID = Number(req.params.groupID)

  const expenseCollection =
    await expenseService.getExpenseCollectionForGroup(groupID)
  res.status(200).json(expenseCollection)
})

app.get('/groups', verifyToken, async (req: Request, res: Response) => {
  const username = req.query.username

  const groups = await memberAndGroupService.getGroupsForUser(
    username as string
  )

  res.status(200).json(groups)
})

app.post('/expense', verifyToken, async (req, res) => {
  const body = req.body

  const { status, createdExpense } = await expenseService.addExpense(body)

  res.status(status).json(createdExpense)
})

app.post('/authenticate', verifyToken, async (req: Request, res: Response) => {
  const { username, password } = req.body

  const { status, message } = await authService.checkCredentials(
    username,
    password
  )

  if (status === 200) {
    const token = authService.generateToken(username)
    res.status(status).json({ token, username })
  } else {
    res.status(status).json({ message })
  }
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
