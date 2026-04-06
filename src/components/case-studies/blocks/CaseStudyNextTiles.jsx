import Link from '../../Link'

export default function CaseStudyNextTiles({ tiles }) {
  return (
    <div className="cs-next-tiles-section section section--expanded">
      <p className="cs-next-tiles-heading">More work</p>
      <div className="cs-next-tiles">
        {tiles.map(({ to, label, thumb }) => (
          <div key={to} className="cs-next-tile">
            <div className="cs-next-tile__frame">
              <img src={thumb} alt={label} className="cs-next-tile__img" />
            </div>
            <Link to={to} linkText={label} />
          </div>
        ))}
      </div>
    </div>
  )
}
