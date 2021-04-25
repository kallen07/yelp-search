export interface Location {
  lat: Number | null
  long: Number | null
};

export interface BizSummaryType {
  id: string,
  name: string,
  distance: number,
  rating: number
}

export interface BizDetailsType extends BizSummaryType {
  address: string[],
  phone: string,
  price: string,
  review_count: number
}
