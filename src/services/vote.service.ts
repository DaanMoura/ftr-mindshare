import { prismaClient } from '../client/prisma'
import { VoteModel } from '../models/vote.model'

export class VoteService {
  async toggleVote(userId: string, ideaId: string): Promise<boolean> {
    const existingVote = await prismaClient.vote.findUnique({
      where: {
        userId_ideaId: {
          userId,
          ideaId
        }
      }
    })

    if (existingVote) {
      await prismaClient.vote.delete({ where: { id: existingVote.id } })
    } else {
      await prismaClient.vote.create({
        data: {
          userId,
          ideaId
        }
      })
    }

    return true
  }

  async listVotesByIdea(ideaId: string): Promise<VoteModel[]> {
    return prismaClient.vote.findMany({
      where: {
        ideaId
      }
    })
  }

  async countVotesByIdea(ideaId: string): Promise<number> {
    return prismaClient.vote.count({
      where: {
        ideaId
      }
    })
  }
}
