export type AuthorData = {
  handle: string
  displayName: string
  avatar: string
}

export type MediaData = {
  author: AuthorData
  date: string
  likes: number
  post_url: string
  image_url: string
  text: string
  uri: string
}