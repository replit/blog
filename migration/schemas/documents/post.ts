export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 30,
        slugify: input => input
                           .toLowerCase()
                           .replace(/\s+/g, '-')
                           .slice(0, 200),
      },
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [
        {
          type: 'reference',
          name: 'author',
          to: [{ type: 'author' }],
        },
      ],
    },
    {
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'relatedPosts',
      title: 'Related posts',
      type: 'array',
      options: {
        layout: 'grid',
      },
      of: [
        {
          type: 'reference',
          name: 'relatedPost',
          to: [{ type: 'post' }],
        },
      ],
    },
  ],

  preview: {
    select: {
      title: 'title',
      author0: 'authors.0.name',
      author1: 'authors.1.name',
      author2: 'authors.2.name',
      author3: 'authors.3.name',
      media: 'coverImage',
    },
    prepare(selection) {
      const { media, title, author0, author1, author2, author3 } = selection;

      const authors = [author0, author1, author2].filter(Boolean);
      const subtitle = authors.length > 0 ? `by ${authors.join(', ')}` : '';
      const hasMoreAuthors = Boolean(author3);

      return {
        title,
        subtitle: hasMoreAuthors ? `${subtitle}…` : subtitle,
        media: media ?? null,
      };
    },
  },
};
