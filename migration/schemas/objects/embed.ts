export default {
  name: 'iframeEmbed',
  title: 'iFrame Embed',
  type: 'object',
  fields: [
    {
      name: 'url',
      title: 'iFrame URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
  ],
};
