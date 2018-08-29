const Link = {
  id: root => root.id,
  createdAt: root => root.createdAt,
  description: root => root.description,
  url: root => root.url,
  postedBy: (root, args, ctx) => {
    return ctx.prisma.link({
      id: root.id
    }).postedBy()
  },
  votes: (root, args, ctx) => {
    return ctx.prisma.link({
      id: root.id
    }).votes()
  }
};

module.exports = Link