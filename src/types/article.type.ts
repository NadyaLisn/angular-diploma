export type ArticleType = {
  id?: string,
  title?: string,
  description?: string,
  image?: string,
  date?: string
  category?: string,
  url?: string,
  price?: string

}

export type ArticlesType = {
  count: number,
  pages: number,
  items: ArticleType[]
}

