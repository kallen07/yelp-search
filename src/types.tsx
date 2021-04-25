export type BizSummaryType = {
  id: string,
  name: string,
  distance: number,
  address: string[],
  rating: number
}

export type Location = {
  lat: Number | null
  long: Number | null
};
