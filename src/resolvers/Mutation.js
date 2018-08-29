const { hash, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

const Mutation = {
  post: (root, args, ctx) => {
    const userId = getUserId(ctx)
    return ctx.prisma.createLink({
      description: args.description,
      url: args.url,
      postedBy: {
        connect: {
          id: userId,
        },
      },
    })
  },
  signup: async (root, args, ctx) => {
    const hashedPassword = await hash(args.password, 10)
    const user = await ctx.prisma.createUser({
      email: args.email,
      password: hashedPassword,
      name: args.name,
    })
    return {
      token: sign({ userId: user.id }, APP_SECRET),
      user,
    }
  },
  login: async (root, args, ctx) => {
    const user = await ctx.prisma.user({
      email: args.email,
    })
    if (!user) {
      throw new Error(`No user found for email: ${args.email}`)
    }
    const valid = await compare(args.password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }
    return {
      token: sign({ userId: user.id }, APP_SECRET),
      user,
    }
  },
  vote: async (root, args, ctx) => {
    const userId = getUserId(ctx)
    // const linkExists = await ctx.prisma.$exists.vote({
    //   user: {
    //     id: userId
    //   },
    //   link: {
    //     id: args.linkId
    //   }
    // })
    const votes = await ctx.prisma.votes({
      where: {
        user: {
          id: userId
        },
        link: {
          id: args.linkId
        }
      }
    })

    if (votes.length > 0) {
      throw new Error(`Already voted for link: ${args.linkId}`)
    }
    return ctx.prisma.createVote({
      link: {
        connect: {
          id: args.linkId
        }
      },
      user: {
        connect: {
          id: userId
        }
      }
    })
  }
}

module.exports = Mutation