'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { X, MapPin, Search } from 'lucide-react'
import api, { getErrorMessage } from '@/lib/api'
import { API } from '@/lib/constants'
import type { Step5Data, District } from '@/lib/types'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'

interface Props {
  defaultValues?: Step5Data
  onSuccess: (data: Step5Data) => void
  onBack: () => void
}

export function Step5Preferences({ defaultValues, onSuccess, onBack }: Props) {
  const [loading, setLoading]               = useState(false)
  const [districts, setDistricts]           = useState<District[]>([])
  const [loadingDistricts, setLoadingDistricts] = useState(true)
  const [selected, setSelected]             = useState<string[]>(
    defaultValues?.preferredDistrictNames ?? []
  )
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.get<District[]>(API.reference.districts)
      .then(r => setDistricts(r.data))
      .catch(() => toast.error('Failed to load districts'))
      .finally(() => setLoadingDistricts(false))
  }, [])

  const filtered = districts.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    (d.nameTamil ?? '').includes(search)
  )

  // Group by zone
  const zones = [...new Set(districts.map(d => d.zone ?? 'Other'))].sort()
  const byZone = zones.reduce<Record<string, District[]>>((acc, zone) => {
    acc[zone] = filtered.filter(d => (d.zone ?? 'Other') === zone)
    return acc
  }, {})

  const toggle = (name: string) => {
    setSelected(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    )
  }

  const onSubmit = async () => {
    setLoading(true)
    try {
      await api.post(API.auth.registerStep(5), {
        preferredDistrictNames: selected,
      })
      onSuccess({ preferredDistrictNames: selected })
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Select districts you prefer for college location. This is optional and can be updated later.
        </p>
      </div>

      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map(name => (
            <span
              key={name}
              className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose"
            >
              <MapPin className="h-3 w-3" />
              {name}
              <button
                onClick={() => toggle(name)}
                className="hover:text-rose-400 transition-colors ml-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <button
            onClick={() => setSelected([])}
            className="text-xs underline transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            Clear all
          </button>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blush" />
        <input
          type="text"
          placeholder="Search districts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full h-10 pl-9 pr-3 rounded-lg border border-cream-400 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose transition-all"
        />
      </div>

      {/* District grid by zone */}
      {loadingDistricts ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-9 animate-pulse rounded-lg bg-cream-200" />
          ))}
        </div>
      ) : (
        <div className="max-h-72 overflow-y-auto space-y-4 pr-1">
          {zones.map(zone => {
            const zoneDistricts = byZone[zone]
            if (!zoneDistricts?.length) return null
            return (
              <div key={zone}>
                <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-muted)' }}>
                  {zone} Tamil Nadu
                </p>
                <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                  {zoneDistricts.map(d => {
                    const isSelected = selected.includes(d.name)
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => toggle(d.name)}
                        className={cn(
                          'flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-left',
                          'border transition-all duration-150',
                          isSelected
                            ? 'border-rose bg-rose text-white shadow-sm'
                            : 'border-cream-300 bg-white hover:border-blush hover:bg-cream-50'
                        )}
                        style={!isSelected ? { color: 'var(--text-secondary)' } : {}}
                      >
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate">{d.name}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
          {filtered.length === 0 && (
            <p className="text-center py-6 text-sm" style={{ color: 'var(--text-muted)' }}>
              No districts match "{search}"
            </p>
          )}
        </div>
      )}

      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
        {selected.length === 0
          ? 'No districts selected — predictions will include all Tamil Nadu colleges'
          : `${selected.length} district${selected.length > 1 ? 's' : ''} selected`}
      </p>

      {/* Navigation */}
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={onSubmit} className="flex-1" loading={loading}>
          {selected.length === 0 ? 'Skip & Continue' : 'Continue'}
        </Button>
      </div>
    </div>
  )
}