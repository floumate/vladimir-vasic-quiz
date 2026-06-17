/*
 * Boja koja odgovara vrednosti trake (0% crvena -> 100% zelena).
 * Iste stop-tačke kao gradijent traka u components.css:
 *   0% red, 33% orange, 60% yellow, 100% green.
 * Vraća boju NA KRAJU popunjenog dela (tj. boju za dati procenat).
 */
const STOPS = [
  { p: 0, c: [178, 58, 46] }, // --zone-red   #B23A2E
  { p: 33, c: [194, 112, 14] }, // --zone-orange #C2700E
  { p: 60, c: [184, 134, 11] }, // --zone-yellow #B8860B
  { p: 100, c: [46, 125, 79] }, // --zone-green  #2E7D4F
]

export function colorForPercent(percent) {
  const p = Math.max(0, Math.min(100, percent))
  for (let i = 0; i < STOPS.length - 1; i++) {
    const a = STOPS[i]
    const b = STOPS[i + 1]
    if (p >= a.p && p <= b.p) {
      const t = b.p === a.p ? 0 : (p - a.p) / (b.p - a.p)
      const rgb = a.c.map((ac, k) => Math.round(ac + (b.c[k] - ac) * t))
      return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
    }
  }
  const last = STOPS[STOPS.length - 1].c
  return `rgb(${last[0]}, ${last[1]}, ${last[2]})`
}
