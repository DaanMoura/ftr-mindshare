import { prismaClient } from '../client/prisma'
import { CreateCommentInput } from '../dtos/input/comment.input'

export class CommentService {
  async createComment(ideaId: string, authorId: string, data: CreateCommentInput) {
    const findIdea = await prismaClient.idea.findUnique({
      where: {
        id: ideaId
      }
    })

    if (!findIdea) {
      throw new Error('Idea not found')
    }

    return prismaClient.comment.create({
      data: { content: data.content, ideaId, authorId }
    })
  }

  async updateComment(id: string, data: CreateCommentInput) {
    const comment = await prismaClient.comment.findUnique({ where: { id } })

    if (!comment) throw new Error('Comment not found')

    return prismaClient.comment.update({
      where: { id },
      data: { content: data.content }
    })
  }

  async deleteComment(id: string) {
    const comment = await prismaClient.comment.findUnique({ where: { id } })

    if (!comment) throw new Error('Comment not found')

    return prismaClient.comment.delete({ where: { id } })
  }
}
