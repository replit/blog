import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'videoFigure',
  title: 'Video',
  type: 'object',
  fields: [
    {
      title: 'Video',
      name: 'video',
      type: 'file',
      options: {
        accept: 'video/*',
      }
    },
    {
      title: 'Caption',
      name: 'caption',
      type: 'string',
    },
  ],
})