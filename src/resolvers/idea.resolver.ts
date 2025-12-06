import { Arg, FieldResolver, Mutation, Resolver, UseMiddleware, Root, Query } from 'type-graphql'
import { IdeaService } from '../services/idea.service'
import { UserService } from '../services/user.service'
import { IsAuth } from '../middlewares/auth.middleware'
import { IdeaModel } from '../models/idea.model'
import { CreateIdeaInput, ListIdeasInput, UpdateIdeaInput } from '../dtos/input/idea.input'
import { GqlUser } from '../graphql/decorators/user.decorator'
import { User } from '@prisma/client'
import { UserModel } from '../models/user.model'
import { CommentModel } from '../models/comment.model'
import { CommentService } from '../services/comment.service'
import { VoteService } from '../services/vote.service'
import { VoteModel } from '../models/vote.model'

@Resolver(() => IdeaModel)
@UseMiddleware(IsAuth)
export class IdeaResolver {
  private ideaService = new IdeaService()
  private userService = new UserService()
  private commentService = new CommentService()
  private voteService = new VoteService()

  @Mutation(() => IdeaModel)
  async createIdea(
    @Arg('data', () => CreateIdeaInput) data: CreateIdeaInput,
    @GqlUser() user: User
  ): Promise<IdeaModel> {
    return this.ideaService.createIdea(data, user.id)
  }

  @Mutation(() => IdeaModel)
  async updateIdea(
    @Arg('data', () => UpdateIdeaInput) data: UpdateIdeaInput,
    @Arg('id', () => String) id: string
  ): Promise<IdeaModel> {
    return this.ideaService.updateIdea(id, data)
  }

  @Mutation(() => Boolean)
  async deleteIdea(@Arg('id', () => String) id: string): Promise<boolean> {
    await this.ideaService.deleteIdea(id)
    return true
  }

  @Query(() => [IdeaModel])
  async listIdeas(
    @Arg('data', () => ListIdeasInput, { nullable: true }) data: ListIdeasInput
  ): Promise<IdeaModel[]> {
    return this.ideaService.listIdeas(data)
  }

  @FieldResolver(() => UserModel)
  async author(@Root() idea: IdeaModel): Promise<UserModel> {
    return this.userService.findUser(idea.authorId)
  }

  @FieldResolver(() => [CommentModel])
  async comments(@Root() idea: IdeaModel): Promise<CommentModel[]> {
    return this.commentService.listCommentsByIdea(idea.id)
  }

  @FieldResolver(() => [VoteModel], { nullable: true })
  async votes(@Root() idea: IdeaModel): Promise<VoteModel[]> {
    return this.voteService.listVotesByIdea(idea.id)
  }

  @FieldResolver(() => Number)
  async voteCount(@Root() idea: IdeaModel): Promise<number> {
    return this.voteService.countVotesByIdea(idea.id)
  }
}
