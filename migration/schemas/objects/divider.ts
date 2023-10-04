import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'divider',
  title: 'Divider',
  type: 'object',
  fields: [
    {
      name: 'marginTop',
      type: 'number',
      description: 'Please add px value',
    },
    {
      name: 'marginBottom',
      type: 'number',
      description: 'Please add px value',
    },
  ],
})