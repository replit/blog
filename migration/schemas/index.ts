import blockContent from './documents/blockContent'
import category from './documents/category'
import post from './documents/post'
import author from './documents/author'
import home from './singletons/blog/home'
import guide from './documents/guide'
import cta from './documents/cta'
import embed from './objects/embed'
import button from './objects/button'
import image from './objects/image'
import video from './objects/video'
import divider from './objects/divider'
import seo from './objects/seo'
import code from './objects/code'

export const schemaTypes = [
  // Singletons
  home,
  // Documents
  blockContent,
  post,
  guide,
  author,
  category,
  cta,
  // Objects
  embed,
  button,
  image,
  video,
  divider,
  seo,
  code
]



export const schema = {
  name: 'default',
  types: [
    ...schemaTypes
  ]
};