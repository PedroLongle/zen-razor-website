"use client"

import { useState, useCallback, useEffect } from "react"
import { GoogleMap, useJsApiLoader, Marker, Libraries } from "@react-google-maps/api"

interface MapProps {
  latitude?: number
  longitude?: number
  zoom?: number
  height?: string
  markerColor?: string
}

const defaultLocation = {
  lat: 34.052235, // Default latitude - sample location
  lng: -118.243683 // Default longitude - sample location
}

// Dark mode style for Google Maps
const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#263c3f" }] },
  { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#746855" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1f2835" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#f3d19c" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2f3948" }] },
  { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
  { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }] }
]

// Required libraries for Google Maps
const libraries: Libraries = ["places"]

// Function to create a data URL for a custom marker SVG
const createMarkerIcon = (color: string) => {
  // Create a clean location pin SVG without white border
  const svgPin = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42" fill="none">
      <path fill="${color}" d="M16 0C7.163 0 0 7.163 0 16C0 20.383 1.658 24.299 4.267 27.3543C6.9185 30.4555 16 42 16 42S25.0815 30.4555 27.733 27.3543C30.342 24.299 32 20.383 32 16C32 7.163 24.837 0 16 0ZM16 22C12.6863 22 10 19.3137 10 16C10 12.6863 12.6863 10 16 10C19.3137 10 22 12.6863 22 16C22 19.3137 19.3137 22 16 22Z" />
    </svg>
  `

  // Convert the SVG to a data URL
  const encoded = encodeURIComponent(svgPin)
    .replace(/%20/g, " ")
    .replace(/%3D/g, "=")
    .replace(/%3A/g, ":")
    .replace(/%2F/g, "/")
    .replace(/%22/g, "'")

  return `data:image/svg+xml;utf8,${encoded}`
}

const GoogleMapComponent = ({
  latitude = defaultLocation.lat,
  longitude = defaultLocation.lng,
  zoom = 15,
  height = "400px",
  markerColor = "#FF0000" // Default red marker
}: MapProps) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""

  const { isLoaded, loadError } = useJsApiLoader({ googleMapsApiKey: apiKey, libraries, id: "google-map-script" })

  const [markerIcon, setMarkerIcon] = useState<string>("")

  // Set the marker icon when the component mounts
  useEffect(() => {
    setMarkerIcon(createMarkerIcon(markerColor))
  }, [markerColor])

  const location = { lat: latitude, lng: longitude }

  const mapContainerStyle = { width: "100%", height, borderRadius: "0.5rem" }

  const onLoad = useCallback(() => {
    // Map is ready to use, but we don't need to store it
  }, [])

  const onUnmount = useCallback(() => {
    // Cleanup if needed
  }, [])

  if (loadError) {
    return (
      <div className="rounded-lg bg-accent h-[400px] flex items-center justify-center" style={{ height }}>
        <span className="text-muted-foreground">Error loading Google Maps</span>
      </div>
    )
  }

  if (!isLoaded || !apiKey) {
    return (
      <div className="rounded-lg bg-accent h-[400px] flex items-center justify-center" style={{ height }}>
        <span className="text-muted-foreground">Loading Maps...</span>
      </div>
    )
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={location}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ styles: darkMapStyle, disableDefaultUI: false, zoomControl: true, streetViewControl: false, mapTypeControl: false }}>
      <Marker
        position={location}
        // Only apply the icon if we have a valid markerIcon
        icon={markerIcon ? { url: markerIcon } : undefined}
      />
    </GoogleMap>
  )
}

export default GoogleMapComponent
