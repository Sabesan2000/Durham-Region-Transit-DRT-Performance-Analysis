import { Card } from "@/components/ui/card"
import { MapPin } from "lucide-react"

export function RouteMap({ routeId, routeName }: { routeId: string; routeName: string }) {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">Route Map</h2>
        <p className="text-sm text-muted-foreground">Complete route visualization with all stops</p>
      </div>

      <div className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20">
        <div className="text-center">
          <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-lg font-semibold">{routeName} Map</p>
          <p className="mt-2 text-sm text-muted-foreground">Interactive map visualization would be integrated here</p>
          <p className="mt-1 text-xs text-muted-foreground">(Using Mapbox, Google Maps, or Leaflet in production)</p>
        </div>
      </div>
    </Card>
  )
}
