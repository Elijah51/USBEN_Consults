import { Link, useNavigate } from "react-router-dom"
import { destinations } from "../data/data.js"


const quickLinks = [

  {
    label: "About Us",
    target: "/about",
  },
  {
    label: "Programs",
    target: "/programs",
  },
  {
    label: "Destinations",
    target: "/destinations",
  },
  {
    label: "Services",
    target: "/?section=services",
  },
  {
    label: "Testimonials",
    target: "/?section=testimonials",
  },
  {
    label: "Contact",
    target: "/contact",
  },
]


function Footer() {

  const navigate = useNavigate()


  // Handle Services and Testimonials
  const handleSectionLink = (section) => {

    navigate(`/?section=${section}`)

  }


  return (
    <footer className="footer">

      <div className="container footer__grid">


        {/* =================================================
            BRAND
        ================================================== */}

        <div className="footer__brand">

          <Link
            to="/"
            className="footer__logo"
          >

            {/* <svg
              viewBox="0 0 40 40"
              width="30"
              height="30"
            >

              <circle
                cx="20"
                cy="20"
                r="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />

              <path
                d="M2 20h36M20 2c5 5 8 11 8 18s-3 13-8 18c-5-5-8-11-8-18s3-13 8-18z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />

            </svg> */}

            Usben Consults Ltd

          </Link>


          <p className="footer__description">

            Usben Consults Ltd helps students find universities,
            programs and study opportunities abroad with expert
            admission, visa and travel support.

          </p>

        </div>



        {/* =================================================
            QUICK LINKS
        ================================================== */}

        <div className="footer__col">

          <h3 className="footer__heading">
            Quick Links
          </h3>


          <ul>

            {quickLinks.map((link) => (

              <li key={link.label}>

                {link.label === "Services" ? (

                  <button
                    type="button"
                    onClick={() =>
                      handleSectionLink("services")
                    }
                  >
                    {link.label}
                  </button>

                ) : link.label === "Testimonials" ? (

                  <button
                    type="button"
                    onClick={() =>
                      handleSectionLink("testimonials")
                    }
                  >
                    {link.label}
                  </button>

                ) : (

                  <Link to={link.target}>
                    {link.label}
                  </Link>

                )}

              </li>

            ))}

          </ul>

        </div>



        {/* =================================================
    STUDY DESTINATIONS
================================================== */}

<div className="footer__col">

  <h3 className="footer__heading">
    Study Destinations
  </h3>

  <ul>

    {destinations.map((destination) => (

      <li key={destination.id}>

        <Link to="/destinations">

          <img
            src={destination.flag}
            alt={`${destination.country} flag`}
            className="footer__destination-flag"
          />

          <span>{destination.country}</span>

        </Link>

      </li>

    ))}

  </ul>

</div>

        {/* =================================================
            CONTACT
        ================================================== */}

        <div className="footer__col">

          <h3 className="footer__heading">
            Contact
          </h3>


          <ul className="footer__contact">

            <li>
              <b>Telephone:</b>
            </li>


            <li>

              <a href="tel:+2348150994222">
                +2348150994222
              </a>

              {" "}or{" "}

              <a href="tel:+2348100514784">
                +2348100514784
              </a>

            </li>


            <li>
              <b>Email:</b>
            </li>


            <li>

              <a href="mailto:info@usbenconsults.com">
                info@usbenconsults.com
              </a>

            </li>


            <li>

              <a href="mailto:usbenconsults@gmail.com">
                usbenconsults@gmail.com
              </a>

            </li>


            <li>
              <b>Address:</b>
            </li>


            <li>

              No. 29b Wogu Street, opposite Mount Bethel
              Church, Port Harcourt, Rivers State,
              <br />
              500261 Nigeria

            </li>

          </ul>



          {/* =================================================
              SOCIAL MEDIA
          ================================================== */}

          <div
            className="footer__social"
            aria-label="Social media links"
          >

            <a
              href="https://web.facebook.com/profile.php?id=61566826940870"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              f
            </a>


            <a
              href="#"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
              <path d="M10.202,2.098c-1.49,.07-2.507,.308-3.396,.657-.92,.359-1.7,.84-2.477,1.619-.776,.779-1.254,1.56-1.61,2.481-.345,.891-.578,1.909-.644,3.4-.066,1.49-.08,1.97-.073,5.771s.024,4.278,.096,5.772c.071,1.489,.308,2.506,.657,3.396,.359,.92,.84,1.7,1.619,2.477,.779,.776,1.559,1.253,2.483,1.61,.89,.344,1.909,.579,3.399,.644,1.49,.065,1.97,.08,5.771,.073,3.801-.007,4.279-.024,5.773-.095s2.505-.309,3.395-.657c.92-.36,1.701-.84,2.477-1.62s1.254-1.561,1.609-2.483c.345-.89,.579-1.909,.644-3.398,.065-1.494,.081-1.971,.073-5.773s-.024-4.278-.095-5.771-.308-2.507-.657-3.397c-.36-.92-.84-1.7-1.619-2.477s-1.561-1.254-2.483-1.609c-.891-.345-1.909-.58-3.399-.644s-1.97-.081-5.772-.074-4.278,.024-5.771,.096m.164,25.309c-1.365-.059-2.106-.286-2.6-.476-.654-.252-1.12-.557-1.612-1.044s-.795-.955-1.05-1.608c-.192-.494-.423-1.234-.487-2.599-.069-1.475-.084-1.918-.092-5.656s.006-4.18,.071-5.656c.058-1.364,.286-2.106,.476-2.6,.252-.655,.556-1.12,1.044-1.612s.955-.795,1.608-1.05c.493-.193,1.234-.422,2.598-.487,1.476-.07,1.919-.084,5.656-.092,3.737-.008,4.181,.006,5.658,.071,1.364,.059,2.106,.285,2.599,.476,.654,.252,1.12,.555,1.612,1.044s.795,.954,1.051,1.609c.193,.492,.422,1.232,.486,2.597,.07,1.476,.086,1.919,.093,5.656,.007,3.737-.006,4.181-.071,5.656-.06,1.365-.286,2.106-.476,2.601-.252,.654-.556,1.12-1.045,1.612s-.955,.795-1.608,1.05c-.493,.192-1.234,.422-2.597,.487-1.476,.069-1.919,.084-5.657,.092s-4.18-.007-5.656-.071M21.779,8.517c.002,.928,.755,1.679,1.683,1.677s1.679-.755,1.677-1.683c-.002-.928-.755-1.679-1.683-1.677,0,0,0,0,0,0-.928,.002-1.678,.755-1.677,1.683m-12.967,7.496c.008,3.97,3.232,7.182,7.202,7.174s7.183-3.232,7.176-7.202c-.008-3.97-3.233-7.183-7.203-7.175s-7.182,3.233-7.174,7.203m2.522-.005c-.005-2.577,2.08-4.671,4.658-4.676,2.577-.005,4.671,2.08,4.676,4.658,.005,2.577-2.08,4.671-4.658,4.676-2.577,.005-4.671-2.079-4.676-4.656h0"></path>
            </svg>
            </a>


            <a
              href="#"
              aria-label="LinkedIn"
            >
              in
            </a>


            <a
              href="#"
              aria-label="X (Twitter)"
            >
              𝕏
            </a>


            <a
              href="https://www.tiktok.com/@usben_consults"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              ᕷ
            </a>

          </div>

        </div>

      </div>



      {/* =================================================
          FOOTER BOTTOM
      ================================================== */}

      <div className="footer__bottom">

        <p>
          © 2026 Usben Consults Ltd. All Rights Reserved.
        </p>

      </div>

    </footer>
  )
}


export default Footer