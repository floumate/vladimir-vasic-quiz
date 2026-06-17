import { useEffect, useState } from 'react'
import { colorForPercent } from '../lib/colors'

/*
 * Blok B - 4 trake po dimenziji. Boja je progresivna: gradijent crvena->zelena
 * je sidren za CEO track, pa popunjeni deo otkriva samo svoj odsečak
 * (npr. 33% pokazuje crvena->narandžasta, 100% pun crvena->zelena).
 * Maska sa desne strane animira otkrivanje.
 */
export default function DimensionBars({ dimensions }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="bars">
      {dimensions.map((d) => (
        <div className="bar" key={d.key}>
          <div className="bar__head">
            <span className="bar__label">{d.label}</span>
            <span className="bar__pct" style={{ color: colorForPercent(d.percent) }}>
              {d.percent}%
            </span>
          </div>
          <div className="bar__track">
            <div className="bar__gradient" />
            <div
              className="bar__mask"
              style={{ width: mounted ? `${100 - d.percent}%` : '100%' }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
