export type WordPair = {
  id: string
  source: string
  target: string
}

export const mockWordPairs: WordPair[] = [
  { id: 'cat', source: 'кот', target: 'cat' },
  { id: 'book', source: 'книга', target: 'book' },
  { id: 'house', source: 'дом', target: 'house' },
  { id: 'water', source: 'вода', target: 'water' },
  { id: 'apple', source: 'яблоко', target: 'apple' },
]