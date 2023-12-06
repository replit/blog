import { defineField, defineType } from 'sanity'
import { SlugInput } from 'sanity-plugin-prefixed-slug'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    {
      name: 'slug',
      type: 'slug',
      // Add the custom input to the `component` object of your field
      components: {
        input: SlugInput,
      },
      options: {
        source: 'title',
        urlPrefix: 'https://blog.replit.com/post/',
        // Use isUnique/maxLength just like you would w/ the regular slug field
        // isUnique: MyCustomIsUniqueFunction,
        maxLength: 30,
        // If you want to save the full URL in the slug object, set storeFullUrl to `true`
        // Example storage: { _type: "slug", current: "my-slug", fullUrl: "https://site.com/my-slug" }
        storeFullUrl: false,
      },
    },
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [
        {
          type: 'reference',
          name: 'author',
          title: 'Author',
          to: [{ type: 'author' }],
        }
      ]
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'cta',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
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
          title: 'Related post',
          to: [{ type: 'post' }],
        }
      ]
    }),
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],

  preview: {
    select: {
      title: 'title',
      author0: 'authors.0.name', // <- authors.0 is a reference to author, and the preview component will automatically resolve the reference and return the name
      author1: 'authors.1.name',
      author2: 'authors.2.name',
      author3: 'authors.3.name',
      media: 'coverImage',
    },
    prepare(selection) {
      const { media, title, author0, author1, author2, author3 } = selection

      const authors = [author0, author1, author2].filter(Boolean)
      const subtitle = authors.length > 0 ? `by ${authors.join(', ')}` : ''
      const hasMoreAuthors = Boolean(author3)

      return {
        title,
        subtitle: hasMoreAuthors ? `${subtitle}…` : subtitle,
        media: media ?? null
      }
    }
  }
});
