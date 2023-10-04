import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'imageFigure',
  title: 'Image',
  type: 'object',
  fields: [
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      title: 'Caption',
      name: 'caption',
      type: 'string',
    },
  ],
})