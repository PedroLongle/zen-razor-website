'use client';

import { LocationSettings } from "@/model/settings";
import dynamic from "next/dynamic";

// Dynamically import the Google Maps component with no SSR
const GoogleMapComponent = dynamic(
  () => import("./map"),
  { ssr: false }
);

interface MapWrapperProps {
  zoom?: number;
  height?: string;
  markerColor?: string;
  locationInfo?: LocationSettings
}

export default function MapWrapper({
  zoom = 15,
  height = '400px',
  markerColor = '#FF0000',
  locationInfo = {
    address: "Loading...",
    city: "",
    country: "",
    latitude: 0,
    longitude: 0,
  }
}: MapWrapperProps) {
  return (
    <div className="space-y-4">
      <GoogleMapComponent
        latitude={locationInfo.latitude}
        longitude={locationInfo.longitude}
        zoom={zoom}
        height={height}
        markerColor={markerColor}
      />
      {locationInfo.address && (
        <div className="text-center font-sans text-muted-foreground">
          <p>{locationInfo.address} {locationInfo.city && `• ${locationInfo.city},`} {locationInfo.country && `${locationInfo.country}`}</p>
          <p className="text-xs">(A localização apresentada neste mapa é fictícia e serve exclusivamente para fins ilustrativos).</p>
        </div>
      )}
    </div>
  );
} 