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
      <div className="space-y-3">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="search location..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        {loading && (
          <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
            Đang tìm kiếm địa điểm...
          </div>
        )}
        {!loading && results.length > 0 && (
          <div className="space-y-2">
            {results.map((result) => (
              <button
                key={result.place_id}
                type="button"
                onClick={() => handleSelectPlace(result)}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
              >
                <p className="text-sm font-semibold text-gray-800">{result.display_name}</p>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500">
                  {result.class && (
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-blue-700">{result.class}</span>
                  )}
                  {result.type && (
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-700">{result.type}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
        {!loading && searchValue.length >= 2 && results.length === 0 && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
            Không tìm thấy kết quả phù hợp.
          </div>
        )}
      </div>
    </div>
  )
}
