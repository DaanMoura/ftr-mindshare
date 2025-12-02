import { prismaClient } from '../client/prisma'

export class UserService {
  async findUser(id: string) {
    const user = await prismaClient.user.findUnique({
      where: { id }
    })

    if (!user) throw new Error('User not found')
    return user
  }
}
