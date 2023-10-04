import { defineType } from "sanity";

export default defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  fields: [
    {
      title: 'Text',
      name: 'text',
      type: 'string',
    },
    {
      title: 'Link',
      name: 'link',
      type: 'url',
    }
  ]
})