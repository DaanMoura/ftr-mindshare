import { Arg, Mutation, Resolver } from 'type-graphql'
import { RegisterInput } from '../dtos/input/auth.input.js'
import { RegisterOutput } from '../dtos/output/auth.output.js'
import { AuthService } from '../services/auth.service.js'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => RegisterOutput)
  async register(@Arg('data', () => RegisterInput) data: RegisterInput): Promise<RegisterOutput> {
    return this.authService.register(data)
  }
}
