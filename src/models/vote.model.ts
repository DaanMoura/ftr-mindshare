import { Field, GraphQLISODateTime, ID, ObjectType } from 'type-graphql'
import { UserModel } from './user.model'
import { IdeaModel } from './idea.model'

@ObjectType()
export class VoteModel {
  @Field(() => ID)
  id!: string

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => String)
  userId!: string

  @Field(() => UserModel, { nullable: true })
  user?: UserModel

  @Field(() => String)
  ideaId!: string

  @Field(() => IdeaModel, { nullable: true })
  idea?: IdeaModel
}
