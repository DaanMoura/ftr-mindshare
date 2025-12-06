import { Arg, FieldResolver, Mutation, Resolver, Root, UseMiddleware } from 'type-graphql'
import { VoteModel } from '../models/vote.model'
import { IsAuth } from '../middlewares/auth.middleware'
import { VoteService } from '../services/vote.service'
import { UserService } from '../services/user.service'
import { IdeaService } from '../services/idea.service'
import { GqlUser } from '../graphql/decorators/user.decorator'
import { User } from '@prisma/client'
import { UserModel } from '../models/user.model'
import { IdeaModel } from '../models/idea.model'

@Resolver(() => VoteModel)
@UseMiddleware(IsAuth)
export class VoteResolver {
  private voteService = new VoteService()
  private userService = new UserService()
  private ideaService = new IdeaService()

  @Mutation(() => Boolean)
  async toggleVote(
    @Arg('ideaId', () => String) ideaId: string,
    @GqlUser() user: User
  ): Promise<boolean> {
    return this.voteService.toggleVote(ideaId, user.id)
  }

  @FieldResolver(() => UserModel)
  async user(@Root() vote: VoteModel): Promise<UserModel> {
    return this.userService.findUser(vote.userId)
  }

  @FieldResolver(() => IdeaModel)
  async idea(@Root() vote: VoteModel): Promise<IdeaModel> {
    return this.ideaService.findIdeaById(vote.ideaId)
  }
}
