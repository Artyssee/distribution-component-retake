export interface ISegment {
  date: string
  quantity: number
}

export interface IProduct {
  id: number
  productName: string
  segments: ISegment[]
}
