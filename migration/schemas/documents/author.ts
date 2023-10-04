export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'replitUrl',
      title: 'Replit Profile URL',
      type: 'slug',
    },
    {
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
    },
    {
      name: 'socialProfileUrl',
      title: 'Social Profile URL',
      type: 'url',
      description: 'URL for a social media profile. Can be either github.com or twitter.com',
      validation: (Rule) =>
        Rule.custom((value) => {
          console.log(value);
          if (typeof value === 'undefined') {
            return true; // Allow undefined values
          }
          return value?.includes('twitter.com') || value?.includes('github.com')
            ? true
            : 'Must include twitter.com or github.com';
        }),
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
};
