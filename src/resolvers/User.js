const User = {
  id: root => root.id,
  name: root => root.name,
  email: root => root.email,
  links: (root, args, ctx) => {
    return ctx.prisma.links({
      where: {
        postedBy: {
          id: root.id,
        },
      },
    })
  },
  votes: (root, args, ctx) => {
    return ctx.prisma
      .user({
        id: root.id,
      })
      .votes()
  },
}

module.exports = User