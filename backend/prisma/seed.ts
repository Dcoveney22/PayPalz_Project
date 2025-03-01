import AuthService from '../src/services/AuthService'
import prisma from './PrismaClient'
import 'dotenv/config'

const jwtSecret = process.env.JWT_SECRET
const authService = new AuthService(jwtSecret)

async function insertMembers() {
  const memberNames = ['Jayden', 'Remi', 'Charlie', 'Cameron', 'Jesse']

  for (const name of memberNames) {
    const user = await prisma.member.create({
      data: {
        name: name,
        hashed_password: await authService.hashPassword(`user-${name}`),
        username: `user-${name}`,
      },
    })
    console.log(user)
  }
}

async function insertGroups() {
  const groups = await prisma.group.createMany({
    data: [
      {
        name: 'Hiking trip',
      },
      {
        name: 'Bowling',
      },
      {
        name: 'Vacation in Italy',
      },
    ],
  })
  console.log(groups)
}

async function insertMemberGroupRelations() {
  const memberGroupRelations = await prisma.memberGroupRelation.createMany({
    data: [
      { member_id: 1, group_id: 1 },
      { member_id: 1, group_id: 2 },
      { member_id: 1, group_id: 3 },
      { member_id: 2, group_id: 1 },
      { member_id: 3, group_id: 1 },
      { member_id: 4, group_id: 1 },
      { member_id: 5, group_id: 1 },
    ],
  })
  console.log(memberGroupRelations)
}

async function insertExpenses() {
  const expense1 = await prisma.expense.create({
    data: {
      amount: 10,
      group_id: 1,
      member_id: 1,
      description: 'Snacks',
    },
  })
  console.log(expense1)
}

async function main() {
  await insertMembers()
  await insertGroups()
  await insertMemberGroupRelations()
  await insertExpenses()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
