import blockContent from './documents/blockContent'
import category from './objects/category'
import post from './documents/post'
import author from './objects/author'
import home from './singletons/blog/home'
import guide from './documents/guide'
import repl from './objects/repl'
import code from './objects/code'

export const schemaTypes = [
  // Singletons
  home,
  // Documents
  blockContent,
  post,
  guide,
  // Objects
  author,
  category,
  repl,
  code
]

export const schema = {
  name: 'default',
  types: [
    // Singletons
    home,
    // Documents
    blockContent,
    post,
    guide,
    // Objects
    author,
    category,
    repl,
    code
  ]
};