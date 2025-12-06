import { prismaClient } from '../client/prisma'
import { CreateUserInput } from '../dtos/input/user.input'
import { UserModel } from '../models/user.model'

export class UserService {
  async createUser(data: CreateUserInput) {
    const findUser = await prismaClient.user.findUnique({
      where: { email: data.email }
    })

    if (findUser) throw new Error('User already exists')

    return prismaClient.user.create({
      data: {
        email: data.email,
        name: data.name
      }
    })
  }

  async findUser(id: string): Promise<UserModel> {
    const user = await prismaClient.user.findUnique({
      where: { id }
    })

    if (!user) throw new Error('User not found')
    return user
  }
}
