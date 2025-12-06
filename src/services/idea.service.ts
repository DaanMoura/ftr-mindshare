import { prismaClient } from '../client/prisma'
import { CreateIdeaInput, ListIdeasInput, UpdateIdeaInput } from '../dtos/input/idea.input'

export class IdeaService {
  async createIdea(data: CreateIdeaInput, authorId: string) {
    return prismaClient.idea.create({
      data: {
        title: data.title,
        description: data.description,
        authorId
      }
    })
  }

  async updateIdea(id: string, data: UpdateIdeaInput) {
    const idea = await prismaClient.idea.findUnique({
      where: {
        id
      }
    })

    if (!idea) {
      throw new Error('Idea not found')
    }

    return prismaClient.idea.update({
      where: {
        id
      },
      data: {
        title: data.title,
        description: data.description
      }
    })
  }

  async deleteIdea(id: string) {
    const idea = await prismaClient.idea.findUnique({
      where: {
        id
      }
    })

    if (!idea) {
      throw new Error('Idea not found')
    }

    return prismaClient.idea.delete({
      where: {
        id
      }
    })
  }

  async listIdeas(data?: ListIdeasInput) {
    return prismaClient.idea.findMany({
      where: {
        authorId: data?.userId
      }
    })
  }

  async findIdeaById(id: string) {
    const idea = await prismaClient.idea.findUnique({
      where: {
        id
      }
    })

    if (!idea) {
      throw new Error('Idea not found')
    }

    return idea
  }
}
