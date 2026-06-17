import Star from './Star'

/* Header: zlatna zvezda + ime „Vladimir Vasić" (centrirano). Back je sada u kartici. */
export default function BrandHeader() {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="brand__logo">
          <Star size={22} />
          <span className="brand__name">Vladimir Vasić</span>
        </div>
      </div>
    </header>
  )
}
