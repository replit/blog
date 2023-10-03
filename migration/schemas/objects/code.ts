export default {
  name: 'code',
  type: 'object',
  title: 'Code',
  fields: [
    {
      name: 'language',
      title: 'Language',
      type: 'string',
    },
    {
      name: 'filename',
      title: 'Filename',
      type: 'string',
    },
    {
      title: 'Code',
      name: 'code',
      type: 'text',
    },
    {
      title: 'Highlighted lines',
      name: 'highlightedLines',
      type: 'array',
      of: [
        {
          type: 'number',
          title: 'Highlighted line',
        },
      ],
    },
  ],
  preview: {
    select: {
      language: 'language',
      code: 'code',
      filename: 'filename',
      highlightedLines: 'highlightedLines',
    },
    prepare: (value) => {
      return {
        title: value.filename || (value.language || 'unknown').toUpperCase(),
        selection: value,
      };
    },
  },
};
