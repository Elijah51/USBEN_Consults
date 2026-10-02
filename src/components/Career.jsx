import { Link } from "react-router-dom"

function Career() {
  return (
    <main className="career-page">

      {/* ==============================
          HERO
      =============================== */}
      <section className="career-hero">
        <div className="container">

          <div className="career-hero__content">

            <p className="section__eyebrow">
              CAREERS AT USBEN CONSULTS LTD
            </p>

            <h1 className="career-hero__title">
              Build Your Career.
              <br />
              <span>Shape Global Opportunities.</span>
            </h1>

            <p className="career-hero__text">
              Join a team helping students and individuals
              access international education, travel and
              global opportunities.
            </p>

            <div className="career-hero__actions">
              <a
                href="#opportunities"
                className="btn btn--primary"
              >
                View Opportunities
              </a>

              {/* <Link
                to="/contact"
                className="career-hero__secondary"
              >
                Contact Our Team
              </Link> */}
            </div>

          </div>

        </div>
      </section>


      {/* ==============================
          INTRODUCTION
      =============================== */}
      <section className="section career-intro">

        <div className="container">

          <div className="career-intro__grid">

            <div>
              <p className="section__eyebrow">
                JOIN OUR TEAM
              </p>

              <h2 className="section__heading">
                Make a Meaningful Impact
              </h2>
            </div>

            <div className="career-intro__content">

              <p>
                At Usben Consults, we are passionate about
                helping people turn their international
                education and travel aspirations into
                achievable opportunities.
              </p>

              <p>
                We are looking for motivated, professional
                and service-oriented individuals who want to
                grow their careers while contributing to a
                team that makes a difference in the lives of
                our clients.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ==============================
          WHY WORK WITH US
      =============================== */}
      {/* <section className="section career-benefits">

        <div className="container">

          <div className="section__header">

            <p className="section__eyebrow">
              WHY USBEN CONSULTS
            </p>

            <h2 className="section__heading">
              Why Work With Us?
            </h2>

            <p>
              Grow professionally while working in a
              collaborative environment focused on
              international education and client success.
            </p>

          </div>


          <div className="career-benefits__grid">

            <div className="career-benefit">
              <div className="career-benefit__icon">
                01
              </div>

              <h3>
                Professional Growth
              </h3>

              <p>
                Develop valuable skills and gain experience
                in the international education and
                consultancy industry.
              </p>
            </div>


            <div className="career-benefit">
              <div className="career-benefit__icon">
                02
              </div>

              <h3>
                Continuous Learning
              </h3>

              <p>
                Expand your knowledge through practical
                experience, collaboration and professional
                development.
              </p>
            </div>


            <div className="career-benefit">
              <div className="career-benefit__icon">
                03
              </div>

              <h3>
                Meaningful Work
              </h3>

              <p>
                Help students and clients navigate important
                decisions and move closer to their
                international goals.
              </p>
            </div>


            <div className="career-benefit">
              <div className="career-benefit__icon">
                04
              </div>

              <h3>
                Collaborative Culture
              </h3>

              <p>
                Work alongside people who value teamwork,
                professionalism, accountability and
                excellent service.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* ==============================
          OUR VALUES
      =============================== */}
      {/* <section className="section career-values">

        <div className="container">

          <div className="career-values__grid">

            <div className="career-values__intro">

              <p className="section__eyebrow">
                OUR VALUES
              </p>

              <h2 className="section__heading">
                What We Look For
              </h2>

              <p>
                We value people who are committed to
                delivering excellent service and creating
                positive experiences for every client.
              </p>

            </div>


            <div className="career-values__list">

              <div className="career-value">
                <span>01</span>

                <div>
                  <h3>Integrity</h3>
                  <p>
                    We value honesty, transparency and
                    responsible professional conduct.
                  </p>
                </div>
              </div>


              <div className="career-value">
                <span>02</span>

                <div>
                  <h3>Excellence</h3>
                  <p>
                    We strive for high standards in our
                    work and client service.
                  </p>
                </div>
              </div>


              <div className="career-value">
                <span>03</span>

                <div>
                  <h3>Teamwork</h3>
                  <p>
                    We believe great results come from
                    people working together.
                  </p>
                </div>
              </div>


              <div className="career-value">
                <span>04</span>

                <div>
                  <h3>Client Focus</h3>
                  <p>
                    We put our clients' needs and
                    experiences at the heart of our work.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </section> */}


      {/* ==============================
          CAREER OPPORTUNITIES
      =============================== */}
      <section
        className="section career-opportunities"
        id="opportunities"
      >

        <div className="container">

          <div className="section__header">

            <p className="section__eyebrow">
              OPPORTUNITIES
            </p>

            <h2 className="section__heading">
              Explore Career Opportunities
            </h2>

            <p>
              We welcome talented individuals across
              different areas of our business.
            </p>

          </div>


          <div className="career-jobs">

            {/* JOB 1 */}
            <article className="career-job">

              <div className="career-job__number">
                01
              </div>

              <div className="career-job__content">

                <h3>
                  Education & Admissions Consultant
                </h3>

                <p>
                  Guide prospective students through
                  university selection, applications and
                  admissions processes.
                </p>

                <div className="career-job__meta">
                  <span>Education Consultancy</span>
                  <span>Client Services</span>
                </div>

              </div>

               <a
  href="mailto:info@usbenconsults.com?body=Dear%20Usben%20Consults%2C%0A%0APlease%20find%20my%20CV%20attached%20for%20your%20consideration.%0A%0AKind%20regards%2C"
  className="career-job__link"
>
  Send CV, and use Career Interest as Subject →
</a>

            </article>


            {/* JOB 2 */}
            <article className="career-job">

              <div className="career-job__number">
                02
              </div>

              <div className="career-job__content">

                <h3>
                  Visa & Documentation Consultant
                </h3>

                <p>
                  Support clients with visa documentation,
                  application preparation and related
                  consultancy services.
                </p>

                <div className="career-job__meta">
                  <span>Visa Services</span>
                  <span>Client Services</span>
                </div>

              </div>

              <a
  href="mailto:info@usbenconsults.com?body=Dear%20Usben%20Consults%2C%0A%0APlease%20find%20my%20CV%20attached%20for%20your%20consideration.%0A%0AKind%20regards%2C"
  className="career-job__link"
>
  Send CV, and use Career Interest as Subject →
</a>

            </article>


            {/* JOB 3 */}
            <article className="career-job">

              <div className="career-job__number">
                03
              </div>

              <div className="career-job__content">

                <h3>
                  Student Support Officer
                </h3>

                <p>
                  Provide professional assistance to
                  students throughout their application and
                  pre-departure journey.
                </p>

                <div className="career-job__meta">
                  <span>Student Support</span>
                  <span>Client Services</span>
                </div>

              </div>

                <a
  href="mailto:info@usbenconsults.com?body=Dear%20Usben%20Consults%2C%0A%0APlease%20find%20my%20CV%20attached%20for%20your%20consideration.%0A%0AKind%20regards%2C"
  className="career-job__link"
>
  Send CV, and use Career Interest as Subject →
</a>

            </article>


            {/* JOB 4 */}
            <article className="career-job">

              <div className="career-job__number">
                04
              </div>

              <div className="career-job__content">

                <h3>
                  Flight Booking Support 
                </h3>

                <p>
                  Provide professional assistance to
                  clients throughout their flight booking processes.
                </p>

                <div className="career-job__meta">
                  <span>Flight Booking</span>
                  <span>Client Services</span>
                </div>

              </div>

                <a
  href="mailto:info@usbenconsults.com?body=Dear%20Usben%20Consults%2C%0A%0APlease%20find%20my%20CV%20attached%20for%20your%20consideration.%0A%0AKind%20regards%2C"
  className="career-job__link"
>
  Send CV, and use Career Interest as Subject →
</a>

            </article> 


            {/* JOB 5 */}
            {/* <article className="career-job">

              <div className="career-job__number">
                05
              </div>

              <div className="career-job__content">

                <h3>
                  Business Development Officer
                </h3>

                <p>
                  Build relationships, identify business
                  opportunities and contribute to the
                  continued growth of our services.
                </p>

                <div className="career-job__meta">
                  <span>Business Development</span>
                  <span>Partnerships</span>
                </div>

              </div>

              <Link
                to="/contact"
                className="career-job__link"
              >
                Apply Now →
              </Link>

            </article> */}


            {/* JOB 6 */}
            {/* <article className="career-job">

              <div className="career-job__number">
                06
              </div>

              <div className="career-job__content">

                <h3>
                  Operations & Administrative Officer
                </h3>

                <p>
                  Support daily operations, administration
                  and internal processes to ensure efficient
                  service delivery.
                </p>

                <div className="career-job__meta">
                  <span>Operations</span>
                  <span>Administration</span>
                </div>

              </div>

              <Link
                to="/contact"
                className="career-job__link"
              >
                Apply Now →
              </Link>

            </article> */}

          </div>

        </div>

      </section>


      {/* ==============================
          APPLICATION PROCESS
      =============================== */}
      <section className="section career-process">

        <div className="container">

          <div className="section__header">

            <p className="section__eyebrow">
              HOW TO APPLY
            </p>

            <h2 className="section__heading">
              Start Your Application
            </h2>

          </div>


          <div className="career-process__grid">

            <div className="career-process__step">
              <span>01</span>

              <h3>
                Choose an Opportunity
              </h3>

              <p>
                Review the available career opportunities
                and identify a role that matches your skills
                and experience.
              </p>
            </div>


            <div className="career-process__step">
              <span>02</span>

              <h3>
                Prepare Your CV
              </h3>

              <p>
                Prepare an up-to-date CV highlighting your
                experience, qualifications and relevant
                skills.
              </p>
            </div>


            <div className="career-process__step">
              <span>03</span>

              <h3>
                Submit Your Application
              </h3>

              <p>
                Contact our team and submit your application
                for consideration.
              </p>
            </div>


            <div className="career-process__step">
              <span>04</span>

              <h3>
                Hear From Us
              </h3>

              <p>
                Suitable candidates will be contacted about
                the next stage of the recruitment process.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* ==============================
          CTA
      =============================== */}
      <section className="career-cta">

        <div className="container">

          <div className="career-cta__box">

            <div>

              <p className="section__eyebrow">
                READY TO JOIN US?
              </p>

              <h2>
                Take the Next Step in Your Career
              </h2>

              <p>
                If you are passionate about helping people
                access global opportunities and want to grow
                with a forward-looking consultancy, we would
                like to hear from you.
              </p>

            </div>

            {/* <Link
              to="/contact"
              className="btn btn--primary"
            >
              Submit Your Application
            </Link>
             */}
<a className="btn btn--primary"
  href="mailto:info@usbenconsults.com?body=Dear%20Usben%20Consults%2C%0A%0APlease%20find%20my%20CV%20attached%20for%20your%20consideration.%0A%0AKind%20regards%2C"
  className="career-job__link"
>
  Submit Your Application →
</a>
          </div>

        </div>

      </section>

    </main>
  )
}

export default Career