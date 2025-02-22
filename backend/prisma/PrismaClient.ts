import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

// NOT THE SAME AS THE VIDEO = STEP 3
const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
let prisma: PrismaClient | undefined = undefined

if (!prisma) {
  prisma = new PrismaClient({ adapter })
}

export default prisma
