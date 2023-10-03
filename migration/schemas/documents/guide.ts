export default {
  name: 'guide',
  title: 'Guide',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }]
    }
  ],

  preview: {
    select: {
      title: 'title',
      description: 'description'
    },
    prepare(selection) {
      const { title, description } = selection
      return { title: title, subtitle: description }
    }
  }
};
