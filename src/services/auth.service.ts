import { LoginInput, RegisterInput } from '../dtos/input/auth.input'
import { prismaClient } from '../client/prisma'
import { comparePasswords, hashPassword } from '../utils/hash'
import { signJwt } from '../utils/jwt'
import { UserModel } from '../models/user.model'

export class AuthService {
  async login(data: LoginInput) {
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email: data.email
      }
    })

    if (!existingUser) throw new Error('User not registered')

    const compare = await comparePasswords(data.password, existingUser.password)

    if (!compare) throw new Error('Invalid password')

    return this.generateTokens(existingUser)
  }

  async register(data: RegisterInput) {
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email: data.email
      }
    })

    if (existingUser) throw new Error('Email already exists')

    const hash = await hashPassword(data.password)

    const user = await prismaClient.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hash
      }
    })

    return this.generateTokens(user)
  }

  generateTokens(user: UserModel) {
    const token = signJwt({ id: user.id, email: user.email }, '15m')
    const refreshToken = signJwt({ id: user.id, email: user.email }, '1d')
    return { token, refreshToken, user }
  }
}
