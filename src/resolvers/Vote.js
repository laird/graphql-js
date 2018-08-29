const Vote = {
  id: root => root.id,
  user: (root, args, ctx) => {
    return ctx.prisma.vote({
      id: root.id
    }).user()
  },
  link: (root, args, ctx) => {
    return ctx.prisma.vote({
      id: root.id
    }).link()
  },
};

module.exports = Vote