import { useState, useEffect, useRef } from "react"

export default function LocationSearch({ onPlaceSelect }) {
  const [searchValue, setSearchValue] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const debounceTimeout = useRef(null)

  const searchPlaces = async (value) => {
    if (!value || value.length < 2) {
      setResults([])
      return
    }

    setLoading(true)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&limit=10&addressdetails=1&accept-language=vi`
      )
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Error searching:", error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value) => {
    setSearchValue(value)

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }

    if (!value || value.length < 2) {
      setResults([])
      return
    }

    debounceTimeout.current = setTimeout(() => {
      searchPlaces(value)
    }, 500)
  }

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
    }
  }, [])

  const handleSelectPlace = (place) => {
    setSearchValue(place.display_name)
    setResults([])
    onPlaceSelect(place)
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for a location..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        {loading && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
            Đang tìm kiếm...
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
            {results.map((result) => (
              <div
                key={result.place_id}
                onClick={() => handleSelectPlace(result)}
                className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0"
              >
                <div className="font-medium text-gray-900">{result.display_name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {result.type && <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{result.type}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}