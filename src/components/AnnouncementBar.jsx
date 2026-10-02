function AnnouncementBar() {
  const announcements = [
    '🎓 Study Abroad With Confidence',
    '✈️ Visa Assistance & Flight Booking',
    '🌍 Explore Global Study Opportunities',
    '📚 Scholarships & Admissions Support',
    '💼 Professional Education Consultancy',
  ]

  return (
    <div className="announcement-bar">
      <div className="announcement-track">

        {/* First copy */}
        <div className="announcement-group">
          {announcements.map((text, index) => (
            <span className="announcement-item" key={`first-${index}`}>
              {text}
              <span className="announcement-divider">•</span>
            </span>
          ))}
        </div>

        {/* Duplicate copy for seamless looping */}
        <div className="announcement-group" aria-hidden="true">
          {announcements.map((text, index) => (
            <span className="announcement-item" key={`second-${index}`}>
              {text}
              <span className="announcement-divider">•</span>
            </span>
          ))}
        </div>

      </div>
    </div>
  )
}

export default AnnouncementBar