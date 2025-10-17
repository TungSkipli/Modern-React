import { useState } from "react"
import LocationSearch from "../components/GGMap/localtionSearch"
import Map from "../components/GGMap/Map"

export default function MapPage() {
    const [selectedPlace, setSelectedPlace] = useState(null)

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="flex h-full w-full max-w-md flex-col border-r border-gray-200 bg-white shadow-xl">
                <div className="border-b border-gray-100 px-6 pb-5 pt-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">explore location</p>
                            <h1 className="text-xl font-bold text-gray-900">your location</h1>
                        </div>
                    </div>
                </div>
                <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
                    <LocationSearch onPlaceSelect={setSelectedPlace} />
                    {selectedPlace && (
                        <div className="rounded-lg border border-blue-100 bg-blue-50/70 p-4 shadow-sm">
                            <div className="flex items-start gap-3">
                                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                <div className="flex-1">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Address</p>
                                    <p className="mt-1 text-sm font-medium text-gray-800">{selectedPlace.display_name}</p>
                                    <div className="mt-4 flex gap-4 text-xs text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <span className="font-semibold">Lat:</span>
                                            <span className="font-mono">{parseFloat(selectedPlace.lat).toFixed(6)}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="font-semibold">Lon:</span>
                                            <span className="font-mono">{parseFloat(selectedPlace.lon).toFixed(6)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </aside>
            <main className="relative flex-1">
                <Map place={selectedPlace} />
                <div className="pointer-events-none absolute bottom-6 right-6 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 shadow-lg">
                    <p className="text-center font-semibold">OpenStreetMap</p>
                    <p className="text-center text-[10px]">© Contributors</p>
                </div>
            </main>
        </div>
    )
}
