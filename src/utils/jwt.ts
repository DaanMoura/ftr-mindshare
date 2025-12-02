import type { Secret, SignOptions } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'

export type JwtPayload = {
  id: string
  email: string
}

export const signJwt = (payload: JwtPayload, expiresIn?: string): string => {
  const secret = process.env.JWT_SECRET as unknown as Secret
  const expiration = expiresIn

  let options: SignOptions = {}
  if (expiration) {
    options = {
      expiresIn: expiration as unknown as NonNullable<SignOptions['expiresIn']>
    }
  }

  return jwt.sign(payload, secret, options)
}

export const verifyJwt = (token: string) => {
  const secret = process.env.JWT_SECRET as unknown as Secret
  return jwt.verify(token, secret) as JwtPayload
}
