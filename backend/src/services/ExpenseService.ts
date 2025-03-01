import prisma from '../../prisma/PrismaClient'
import {
  Expense,
  ExpenseCollection,
  GroupMember,
} from '@jacobjshelp/paypalztypes'

class ExpenseService {
  public async addExpense(expense: Expense) {
    const createdExpense = await prisma.expense.create({
      data: {
        amount: expense.amount,
        description: expense.description,
        member_id: expense.payerID,
        group_id: expense.groupID,
      },
    })
    return { status: 201, createdExpense }
  }
  public async getExpenseCollectionForGroup(groupID: number) {
    const { id, name, members, expenses } = await prisma.group.findUnique({
      where: {
        id: groupID,
      },
      include: {
        expenses: {
          where: {
            group_id: groupID,
          },
        },
        members: {
          where: {
            group_id: groupID,
          },
          include: {
            member: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })

    const sum = expenses.reduce((acc, expense) => {
      return acc + expense.amount
    }, 0)

    const groupMembers: GroupMember[] = members.map((m) => {
      return { id: m.member_id, name: m.member.name, value: 0 }
    })

    expenses.forEach((e) => {
      const splitAmount = e.amount / groupMembers.length
      groupMembers.forEach((member) => {
        if (e.member_id === member.id) {
          member.value += e.amount - splitAmount
        } else {
          member.value -= splitAmount
        }
      })
    })

    const expenseCollection: ExpenseCollection = {
      groupID: id,
      groupName: name,
      sum,
      groupMembers,
      expenses: expenses.map((e) => {
        return {
          amount: e.amount,
          payerID: e.member_id,
          groupID: e.group_id,
          description: e.description,
        }
      }),
    }

    return expenseCollection
  }
}

export default ExpenseService
