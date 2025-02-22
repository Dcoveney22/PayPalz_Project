import prisma from '../../prisma/PrismaClient'

class MemberAndGroupService {
  public async getGroupsForUser(username: string) {
    const groups = await prisma.group.findMany({
      where: {
        members: {
          some: {
            member: {
              username: username,
            },
          },
        },
      },
    })

    return groups
  }
}

export default MemberAndGroupService
