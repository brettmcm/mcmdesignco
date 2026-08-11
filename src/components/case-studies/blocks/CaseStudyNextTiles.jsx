import Link from '../../Link'

export default function CaseStudyNextTiles({ tiles }) {
  return (
    <div className="cs-next-tiles-section section section--expanded">
      <h2>More work</h2>
      <div className="cs-next-tiles">
        {tiles.map(({ to, label, thumb }) => (
          <div key={to} className="cs-next-tile">
            <div className="cs-next-tile__frame">
              <img
                src={thumb}
                alt={label}
                className="cs-next-tile__img"
                width="568"
                height="400"
                loading="lazy"
                decoding="async"
              />
            </div>
            <Link to={to} linkText={label} />
          </div>
        ))}
      </div>
    </div>
  )
}
