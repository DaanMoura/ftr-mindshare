import { Arg, FieldResolver, Mutation, Resolver, UseMiddleware, Root } from 'type-graphql'
import { CommentService } from '../services/comment.service'
import { UserService } from '../services/user.service'
import { IdeaService } from '../services/idea.service'
import { IsAuth } from '../middlewares/auth.middleware'
import { IdeaModel } from '../models/idea.model'
import { GqlUser } from '../graphql/decorators/user.decorator'
import { User } from '@prisma/client'
import { UserModel } from '../models/user.model'
import { CommentModel } from '../models/comment.model'
import { CreateCommentInput } from '../dtos/input/comment.input'

@Resolver(() => CommentModel)
@UseMiddleware(IsAuth)
export class CommentResolver {
  private commentService = new CommentService()
  private userService = new UserService()
  private ideaService = new IdeaService()

  @Mutation(() => CommentModel)
  async createComment(
    @Arg('ideaId', () => String) ideaId: string,
    @Arg('data', () => CreateCommentInput) data: CreateCommentInput,
    @GqlUser() user: User
  ): Promise<CommentModel> {
    return this.commentService.createComment(ideaId, user.id, data)
  }

  @Mutation(() => Boolean)
  async deleteComment(@Arg('id', () => String) id: string): Promise<boolean> {
    await this.commentService.deleteComment(id)
    return true
  }

  @FieldResolver(() => UserModel)
  async author(@Root() comment: CommentModel): Promise<UserModel> {
    return this.userService.findUser(comment.authorId)
  }

  @FieldResolver(() => IdeaModel)
  async idea(@Root() comment: CommentModel): Promise<IdeaModel> {
    return this.ideaService.findIdeaById(comment.ideaId)
  }
}
