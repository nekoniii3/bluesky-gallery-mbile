export type AuthorData = {
  handle: string
  displayName: string
  avatar: string
}

export type MediaData = {
  author: AuthorData
  date: string
  likes: number
  postUrl: string
  imageUrl: string
  text: string
  uri: string
}