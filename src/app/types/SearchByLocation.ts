export type SearchByLocation = {
  Key: string
  LocalizedName: string
  Country: {
    LocalizedName: string
  }
  GeoPosition: {
    Latitude: number
    Longitude: number
  }
}[];
