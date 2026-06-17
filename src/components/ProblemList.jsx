/* Blok D - ključni problemi (do 4) na osnovu najslabijih dimenzija. */
export default function ProblemList({ problems }) {
  if (!problems.length) return null
  return (
    <div className="problems">
      <h3 className="problems__heading">Šta smo primetili</h3>
      <div className="problems__list">
        {problems.map((p) => (
          <div className="problem" key={p.id}>
            <div className="problem__mark" aria-hidden="true" />
            <div>
              <h4 className="problem__title">{p.title}</h4>
              <p className="problem__body">{p.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
