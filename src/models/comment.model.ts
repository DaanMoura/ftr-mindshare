import { Field, GraphQLISODateTime, ID, ObjectType } from 'type-graphql'
import { UserModel } from './user.model'
import { IdeaModel } from './idea.model'

@ObjectType()
export class CommentModel {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  content!: string

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date

  @Field(() => String)
  authorId!: string

  @Field(() => UserModel, { nullable: true })
  author?: UserModel

  @Field(() => String)
  ideaId!: string

  @Field(() => IdeaModel, { nullable: true })
  idea?: IdeaModel
}
