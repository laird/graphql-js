const Query = {
  info: root => 'GraphQL API for Hacker News',
  feed: async (root, args, ctx) => {
    const count = await ctx.prisma
      .linksConnection({
        where: {
          description_contains: args.filter,
        },
      })
      .aggregate()
      .count()
    const links = await ctx.prisma.links({
      where: {
        description_contains: args.filter,
      },
      skip: args.skip,
      first: args.first,
      orderBy: args.orderBy
    })
    return {
      count,
      links,
    }
  },
}

module.exports = Query