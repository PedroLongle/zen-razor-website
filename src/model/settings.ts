export interface LocationSettings {
  address: string
  latitude: number
  longitude: number
  city: string
  country: string
}

export interface Settings {
  location: LocationSettings
}
