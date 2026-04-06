export default function CaseStudyRuleTextSection({ heading, children }) {
  return (
    <div className="cs-ruletext">
      {heading ? <div className="accent-bar" aria-hidden="true" /> : null}
      {heading ? <p className="cs-ruletext__heading">{heading}</p> : null}
      <div className="cs-ruletext__body">{children}</div>
    </div>
  )
}

