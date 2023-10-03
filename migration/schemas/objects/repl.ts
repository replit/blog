export default {
  name: 'repl',
  title: 'Repl Embed',
  type: 'object',
  fields: [
    {
      name: 'url',
      title: 'Repl URL',
      type: 'url',
      validation: (Rule) =>
        Rule.required()
          .uri({
            allowRelative: false, // Allow relative links
            scheme: ["https"],
          })
          .custom((val) => {
            if (val?.startsWith('https://replit.com/')) {
              return true;
            } else {
              return 'Invalid Repl URL';
            }
          }),
    },
  ],
};
