import { InputType, Field } from 'type-graphql'

@InputType()
export class CreateIdeaInput {
  @Field(() => String)
  title!: string

  @Field(() => String, { nullable: true })
  description?: string
}

@InputType()
export class UpdateIdeaInput {
  @Field(() => String, { nullable: true })
  title?: string

  @Field(() => String, { nullable: true })
  description?: string
}

@InputType()
export class ListIdeasInput {
  @Field(() => String, { nullable: true })
  userId?: string
}
