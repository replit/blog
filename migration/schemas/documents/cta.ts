import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'cta',
  title: 'CTA Button',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    })
  ],
});
