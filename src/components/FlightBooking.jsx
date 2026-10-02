import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
// import './FlightBooking.css'

const FORMBOLD_URL = 'https://formbold.com/s/3KpQl'

const INITIAL_FORM = {
  tripType: 'oneWay',

  departureCity: '',
  destination: '',
  travelDate: '',
  returnDate: '',

  preferredAirline: '',

  adultPassengers: 1,
  childPassengers: 0,
  infantPassengers: 0,

  phone: '',
  email: '',

  passportNo: '',
  passportIssueDate: '',
  passportExpiryDate: '',

  specialRequests: '',
}

function FlightBooking() {
  const [form, setForm] = useState(INITIAL_FORM)

  const [openPassenger, setOpenPassenger] = useState('adult')

  const [errors, setErrors] = useState({})

  const [submitting, setSubmitting] = useState(false)

  const [submitted, setSubmitted] = useState(false)

  const [submitError, setSubmitError] = useState('')

  const totalPassengers = useMemo(() => {
    return (
      Number(form.adultPassengers) +
      Number(form.childPassengers) +
      Number(form.infantPassengers)
    )
  }, [
    form.adultPassengers,
    form.childPassengers,
    form.infantPassengers,
  ])

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: '',
      }))
    }

    setSubmitError('')
  }

  const handleTripTypeChange = (type) => {
    setForm((previous) => ({
      ...previous,
      tripType: type,
      returnDate:
        type === 'oneWay' ? '' : previous.returnDate,
    }))

    setErrors((previous) => ({
      ...previous,
      returnDate: '',
    }))

    setSubmitError('')
  }

  const handlePassengerChange = (type, value) => {
    setForm((previous) => ({
      ...previous,
      [type]: Number(value),
    }))

    setSubmitError('')
  }

  const togglePassenger = (type) => {
    setOpenPassenger((previous) =>
      previous === type ? '' : type
    )
  }

  const validate = () => {
    const newErrors = {}

    if (!form.departureCity.trim()) {
      newErrors.departureCity =
        'Please enter your departure city.'
    }

    if (!form.destination.trim()) {
      newErrors.destination =
        'Please enter your destination.'
    }

    if (!form.travelDate) {
      newErrors.travelDate =
        'Please select your travel date.'
    }

    if (
      form.tripType === 'twoWay' &&
      !form.returnDate
    ) {
      newErrors.returnDate =
        'Please select your return date.'
    }

    if (
      form.tripType === 'twoWay' &&
      form.travelDate &&
      form.returnDate &&
      form.returnDate < form.travelDate
    ) {
      newErrors.returnDate =
        'Return date cannot be earlier than the travel date.'
    }

    if (totalPassengers < 1) {
      newErrors.passengers =
        'Please select at least one passenger.'
    }

    if (!form.phone.trim()) {
      newErrors.phone =
        'Please enter your phone number.'
    }

    if (!form.email.trim()) {
      newErrors.email =
        'Please enter your email address.'
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email =
        'Please enter a valid email address.'
    }

    if (!form.passportNo.trim()) {
      newErrors.passportNo =
        'Please enter your passport number.'
    }

    if (!form.passportIssueDate) {
      newErrors.passportIssueDate =
        'Please select the passport issue date.'
    }

    if (!form.passportExpiryDate) {
      newErrors.passportExpiryDate =
        'Please select the passport expiry date.'
    }

    if (
      form.passportIssueDate &&
      form.passportExpiryDate &&
      form.passportExpiryDate <= form.passportIssueDate
    ) {
      newErrors.passportExpiryDate =
        'Passport expiry date must be after the issue date.'
    }

    if (form.specialRequests.length > 2000) {
      newErrors.specialRequests =
        'Special requests must not exceed 2000 characters.'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setSubmitError('')

    const validationErrors = validate()

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setSubmitting(true)
    setSubmitted(false)

    try {
      /*
        FormData is still used here, but there is NO file upload.
        This allows all form fields to be submitted cleanly.
      */
      const formData = new FormData()

      formData.append(
        'subject',
        `New Flight Booking Request - ${form.departureCity} to ${form.destination}`
      )

      formData.append(
        'tripType',
        form.tripType === 'oneWay'
          ? 'One Way'
          : 'Two Way'
      )

      formData.append(
        'departureCity',
        form.departureCity.trim()
      )

      formData.append(
        'destination',
        form.destination.trim()
      )

      formData.append(
        'travelDate',
        form.travelDate
      )

      formData.append(
        'returnDate',
        form.tripType === 'twoWay'
          ? form.returnDate
          : 'Not applicable - One Way'
      )

      formData.append(
        'numberOfPassengers',
        String(totalPassengers)
      )

      formData.append(
        'adultPassengers',
        String(form.adultPassengers)
      )

      formData.append(
        'childPassengers',
        String(form.childPassengers)
      )

      formData.append(
        'infantPassengers',
        String(form.infantPassengers)
      )

      formData.append(
        'passengerBreakdown',
        `Adults: ${form.adultPassengers}, Children: ${form.childPassengers}, Infants: ${form.infantPassengers}`
      )

      formData.append(
        'preferredAirline',
        form.preferredAirline.trim()
      )

      formData.append(
        'phone',
        form.phone.trim()
      )

      formData.append(
        'email',
        form.email.trim()
      )

      /*
        PASSPORT INFORMATION
      */
      formData.append(
        'passportNo',
        form.passportNo.trim()
      )

      formData.append(
        'passportIssueDate',
        form.passportIssueDate
      )

      formData.append(
        'passportExpiryDate',
        form.passportExpiryDate
      )

      formData.append(
        'specialRequests',
        form.specialRequests.trim()
      )

      const response = await fetch(FORMBOLD_URL, {
        method: 'POST',

        headers: {
          Accept: 'application/json',
        },

        body: formData,
      })

      const responseText = await response.text()

      let result = {}

      try {
        result = responseText
          ? JSON.parse(responseText)
          : {}
      } catch {
        result = {
          message: responseText,
        }
      }

      console.log(
        'FormBold HTTP status:',
        response.status
      )

      console.log(
        'FormBold response:',
        result
      )

      /*
        Only show success if FormBold actually
        accepted the submission.
      */
      if (!response.ok) {
        throw new Error(
          result?.message ||
            `Form submission failed. Server returned ${response.status}.`
        )
      }

      /*
        SUCCESS
      */
      setSubmitted(true)

      setForm(INITIAL_FORM)

      setErrors({})

      setOpenPassenger('adult')
    } catch (error) {
      console.error(
        'Flight Booking FormBold submission error:',
        error
      )

      setSubmitted(false)

      setSubmitError(
        error?.message ||
          'Unable to submit your flight booking request. Please try again.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  /*
    SUCCESS SCREEN
  */
  if (submitted) {
    return (
      <section className="flight-booking">
        <div className="container">

          <div className="flight-booking__success">

            <div className="flight-booking__success-icon">

              <svg
                viewBox="0 0 24 24"
                width="42"
                height="42"
                aria-hidden="true"
              >
                <path
                  d="M20 6L9 17l-5-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

            </div>

            <h2>
              Request Submitted Successfully
            </h2>

            <p>
              Your flight booking request has been
              submitted successfully. Our team will
              contact you shortly.
            </p>

            <Link
              to="/"
              className="flight-booking__success-button"
            >
              Back to Home
            </Link>

          </div>

        </div>
      </section>
    )
  }

  return (
    <section className="flight-booking">

      <div className="container">

        {/* PAGE HEADER */}

        <div className="section__header">

          <span className="section__eyebrow">
            Flight Booking
          </span>

          <h1 className="section__heading">
            Book Your Flight With Ease
          </h1>

          <p>
            Provide your travel details below and our
            team will assist you with your flight booking.
          </p>

        </div>

        {/* INFORMATION CARD */}

        {/* <div className="flight-booking__info-card">

          <div className="flight-booking__illustration">
            <span>✈️</span>
          </div>

          <div className="flight-booking__info-content">

            <h2>
              Need help with your flight?
            </h2>

            <p>
              Our team can assist you with flight options,
              travel dates, airline preferences and
              pre-departure planning.
            </p>

            <a
              href="https://wa.me/2348150994222"
              target="_blank"
              rel="noopener noreferrer"
              className="flight-booking__info-button"
            >
              Chat With Us
            </a>

          </div>

        </div>

        {/* FORM */}

        <div className="flight-booking__box">

          <form
            className="flight-booking__form"
            onSubmit={handleSubmit}
            noValidate
          >
 
            {/* ERROR */}

            {submitError && (
              <div
                className="flight-booking__error"
                role="alert"
              >

                <strong>
                  Submission Error
                </strong>

                <p>
                  {submitError}
                </p>

                <small>
                  Your request has NOT been marked as
                  successful. Please correct the issue
                  and try again.
                </small>

              </div>
            )}

            {/* TRIP TYPE */}

            <div className="form-section">

              <div className="form-section__header">

                <h3>
                  Trip Type
                </h3>

                <p>
                  Select whether you need a one-way or
                  return flight.
                </p>

              </div>

              <div className="trip-type-options">

                <label
                  className={`trip-type-option ${
                    form.tripType === 'oneWay'
                      ? 'active'
                      : ''
                  }`}
                >

                  <input
                    type="radio"
                    name="tripType"
                    value="oneWay"
                    checked={
                      form.tripType === 'oneWay'
                    }
                    onChange={() =>
                      handleTripTypeChange(
                        'oneWay'
                      )
                    }
                  />

                  <span className="trip-type-option__content">

                    <strong>
                      One Way
                    </strong>

                    <small>
                      Travel to your destination only
                    </small>

                  </span>

                </label>

                <label
                  className={`trip-type-option ${
                    form.tripType === 'twoWay'
                      ? 'active'
                      : ''
                  }`}
                >

                  <input
                    type="radio"
                    name="tripType"
                    value="twoWay"
                    checked={
                      form.tripType === 'twoWay'
                    }
                    onChange={() =>
                      handleTripTypeChange(
                        'twoWay'
                      )
                    }
                  />

                  <span className="trip-type-option__content">

                    <strong>
                      Two Way
                    </strong>

                    <small>
                      Travel and return flight
                    </small>

                  </span>

                </label>

              </div>

            </div>

            {/* FLIGHT INFORMATION */}

            <div className="form-section">

              <div className="form-section__header">

                <h3>
                  Flight Information
                </h3>

                <p>
                  Tell us where and when you would like
                  to travel.
                </p>

              </div>

              <div className="form-row">

                {/* DEPARTURE */}

                <div className="form-group">

                  <label htmlFor="departureCity">
                    Departure City
                    <span>*</span>
                  </label>

                  <input
                    id="departureCity"
                    name="departureCity"
                    type="text"
                    value={form.departureCity}
                    onChange={handleChange}
                    placeholder="e.g. Port Harcourt"
                    autoComplete="address-level2"
                  />

                  {errors.departureCity && (
                    <small className="form-error">
                      {errors.departureCity}
                    </small>
                  )}

                </div>

                {/* DESTINATION */}

                <div className="form-group">

                  <label htmlFor="destination">
                    Destination
                    <span>*</span>
                  </label>

                  <input
                    id="destination"
                    name="destination"
                    type="text"
                    value={form.destination}
                    onChange={handleChange}
                    placeholder="e.g. London"
                  />

                  {errors.destination && (
                    <small className="form-error">
                      {errors.destination}
                    </small>
                  )}

                </div>

              </div>

              <div className="form-row">

                {/* TRAVEL DATE */}

                <div className="form-group">

                  <label htmlFor="travelDate">
                    Travel Date
                    <span>*</span>
                  </label>

                  <input
                    id="travelDate"
                    name="travelDate"
                    type="date"
                    value={form.travelDate}
                    min={
                      new Date()
                        .toISOString()
                        .split('T')[0]
                    }
                    onChange={handleChange}
                  />

                  {errors.travelDate && (
                    <small className="form-error">
                      {errors.travelDate}
                    </small>
                  )}

                </div>

                {/* RETURN DATE */}

                {form.tripType === 'twoWay' && (
                  <div className="form-group">

                    <label htmlFor="returnDate">
                      Return Date
                      <span>*</span>
                    </label>

                    <input
                      id="returnDate"
                      name="returnDate"
                      type="date"
                      value={form.returnDate}
                      min={
                        form.travelDate ||
                        new Date()
                          .toISOString()
                          .split('T')[0]
                      }
                      onChange={handleChange}
                    />

                    {errors.returnDate && (
                      <small className="form-error">
                        {errors.returnDate}
                      </small>
                    )}

                  </div>
                )}

              </div>

              {/* AIRLINE */}

              <div className="form-group">

                <label htmlFor="preferredAirline">
                  Preferred Airline
                </label>

                <input
                  id="preferredAirline"
                  name="preferredAirline"
                  type="text"
                  value={form.preferredAirline}
                  onChange={handleChange}
                  placeholder="e.g. Qatar Airways, Emirates, Turkish Airlines"
                />

              </div>

            </div>

            {/* PASSENGERS */}

            <div className="form-section passenger-details-section">

              <div className="form-section__header">

                <h3>
                  Passenger Details
                </h3>

                <p>
                  Select the number of passengers in
                  each category.
                </p>

              </div>

              {/* ADULT */}

              <div className="passenger-dropdown">

                <button
                  type="button"
                  className="passenger-dropdown__header"
                  onClick={() =>
                    togglePassenger('adult')
                  }
                  aria-expanded={
                    openPassenger === 'adult'
                  }
                >

                  <span className="passenger-dropdown__title">

                    <span className="passenger-dropdown__icon">
                      👤
                    </span>

                    <span>
                      <strong>
                        Adults
                      </strong>

                      <small>
                        12 years and above
                      </small>
                    </span>

                  </span>

                  <span className="passenger-dropdown__arrow">
                    {openPassenger === 'adult'
                      ? '−'
                      : '+'}
                  </span>

                </button>

                {openPassenger === 'adult' && (
                  <div className="passenger-dropdown__content">

                    <label htmlFor="adultPassengers">
                      Number of Adults
                    </label>

                    <select
                      id="adultPassengers"
                      name="adultPassengers"
                      value={
                        form.adultPassengers
                      }
                      onChange={(e) =>
                        handlePassengerChange(
                          'adultPassengers',
                          e.target.value
                        )
                      }
                    >
                      <option value="1">
                        1 Adult
                      </option>

                      <option value="2">
                        2 Adults
                      </option>

                      <option value="3">
                        3 Adults
                      </option>

                      <option value="4">
                        4 Adults
                      </option>

                      <option value="5">
                        5 Adults
                      </option>

                      <option value="6">
                        6 Adults
                      </option>

                      <option value="7">
                        7 Adults
                      </option>

                      <option value="8">
                        8 Adults
                      </option>

                      <option value="9">
                        9 Adults
                      </option>

                      <option value="10">
                        10 Adults
                      </option>

                    </select>

                  </div>
                )}

              </div>

              {/* CHILD */}

              <div className="passenger-dropdown">

                <button
                  type="button"
                  className="passenger-dropdown__header"
                  onClick={() =>
                    togglePassenger('child')
                  }
                  aria-expanded={
                    openPassenger === 'child'
                  }
                >

                  <span className="passenger-dropdown__title">

                    <span className="passenger-dropdown__icon">
                      🧒
                    </span>

                    <span>

                      <strong>
                        Children
                      </strong>

                      <small>
                        2–11 years
                      </small>

                    </span>

                  </span>

                  <span className="passenger-dropdown__arrow">
                    {openPassenger === 'child'
                      ? '−'
                      : '+'}
                  </span>

                </button>

                {openPassenger === 'child' && (
                  <div className="passenger-dropdown__content">

                    <label htmlFor="childPassengers">
                      Number of Children
                    </label>

                    <select
                      id="childPassengers"
                      name="childPassengers"
                      value={
                        form.childPassengers
                      }
                      onChange={(e) =>
                        handlePassengerChange(
                          'childPassengers',
                          e.target.value
                        )
                      }
                    >

                      <option value="0">
                        0 Children
                      </option>

                      <option value="1">
                        1 Child
                      </option>

                      <option value="2">
                        2 Children
                      </option>

                      <option value="3">
                        3 Children
                      </option>

                      <option value="4">
                        4 Children
                      </option>

                      <option value="5">
                        5 Children
                      </option>

                      <option value="6">
                        6 Children
                      </option>

                      <option value="7">
                        7 Children
                      </option>

                      <option value="8">
                        8 Children
                      </option>

                      <option value="9">
                        9 Children
                      </option>

                      <option value="10">
                        10 Children
                      </option>

                    </select>

                  </div>
                )}

              </div>

              {/* INFANT */}

              <div className="passenger-dropdown">

                <button
                  type="button"
                  className="passenger-dropdown__header"
                  onClick={() =>
                    togglePassenger('infant')
                  }
                  aria-expanded={
                    openPassenger === 'infant'
                  }
                >

                  <span className="passenger-dropdown__title">

                    <span className="passenger-dropdown__icon">
                      👶
                    </span>

                    <span>

                      <strong>
                        Infants
                      </strong>

                      <small>
                        Under 2 years
                      </small>

                    </span>

                  </span>

                  <span className="passenger-dropdown__arrow">
                    {openPassenger === 'infant'
                      ? '−'
                      : '+'}
                  </span>

                </button>

                {openPassenger === 'infant' && (
                  <div className="passenger-dropdown__content">

                    <label htmlFor="infantPassengers">
                      Number of Infants
                    </label>

                    <select
                      id="infantPassengers"
                      name="infantPassengers"
                      value={
                        form.infantPassengers
                      }
                      onChange={(e) =>
                        handlePassengerChange(
                          'infantPassengers',
                          e.target.value
                        )
                      }
                    >

                      <option value="0">
                        0 Infants
                      </option>

                      <option value="1">
                        1 Infant
                      </option>

                      <option value="2">
                        2 Infants
                      </option>

                      <option value="3">
                        3 Infants
                      </option>

                      <option value="4">
                        4 Infants
                      </option>

                      <option value="5">
                        5 Infants
                      </option>

                    </select>

                  </div>
                )}

              </div>

              {/* TOTAL */}

              <div className="passenger-total">

                <span>
                  Total Passengers
                </span>

                <strong>
                  {totalPassengers}
                </strong>

              </div>

            </div>

            {/* CONTACT */}

            <div className="form-section">

              <div className="form-section__header">

                <h3>
                  Contact Information
                </h3>

                <p>
                  We will use these details to contact
                  you about your booking.
                </p>

              </div>

              <div className="form-row">

                {/* PHONE */}

                <div className="form-group">

                  <label htmlFor="phone">
                    Phone Number
                    <span>*</span>
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+234 815 099 4222"
                    autoComplete="tel"
                  />

                  {errors.phone && (
                    <small className="form-error">
                      {errors.phone}
                    </small>
                  )}

                </div>

                {/* EMAIL */}

                <div className="form-group">

                  <label htmlFor="email">
                    Email Address
                    <span>*</span>
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />

                  {errors.email && (
                    <small className="form-error">
                      {errors.email}
                    </small>
                  )}

                </div>

              </div>

            </div>

            {/* PASSPORT INFORMATION */}

            <div className="form-section">

              <div className="form-section__header">

                <h3>
                  Passport Information
                </h3>

                <p>
                  Enter your international passport
                  details.
                </p>

              </div>

              <div className="form-row">

                {/* PASSPORT NUMBER */}

                <div className="form-group">

                  <label htmlFor="passportNo">
                    Passport No.
                    <span>*</span>
                  </label>

                  <input
                    id="passportNo"
                    name="passportNo"
                    type="text"
                    value={form.passportNo}
                    onChange={handleChange}
                    placeholder="Enter passport number"
                    autoComplete="off"
                  />

                  {errors.passportNo && (
                    <small className="form-error">
                      {errors.passportNo}
                    </small>
                  )}

                </div>

                {/* ISSUE DATE */}

                <div className="form-group">

                  <label htmlFor="passportIssueDate">
                    Issue Date
                    <span>*</span>
                  </label>

                  <input
                    id="passportIssueDate"
                    name="passportIssueDate"
                    type="date"
                    value={
                      form.passportIssueDate
                    }
                    onChange={handleChange}
                  />

                  {errors.passportIssueDate && (
                    <small className="form-error">
                      {
                        errors.passportIssueDate
                      }
                    </small>
                  )}

                </div>

              </div>

              {/* EXPIRY DATE */}

              <div className="form-row">

                <div className="form-group">

                  <label htmlFor="passportExpiryDate">
                    Expiry Date
                    <span>*</span>
                  </label>

                  <input
                    id="passportExpiryDate"
                    name="passportExpiryDate"
                    type="date"
                    value={
                      form.passportExpiryDate
                    }
                    min={
                      form.passportIssueDate ||
                      undefined
                    }
                    onChange={handleChange}
                  />

                  {errors.passportExpiryDate && (
                    <small className="form-error">
                      {
                        errors.passportExpiryDate
                      }
                    </small>
                  )}

                </div>

              </div>

            </div>

            {/* SPECIAL REQUESTS */}

            <div className="form-section">

              <div className="form-section__header">

                <h3>
                  Special Requests
                </h3>

                <p>
                  Let us know if there is anything else
                  we should consider.
                </p>

              </div>

              <div className="form-group">

                <label htmlFor="specialRequests">
                  Special Requests / Additional Information
                </label>

                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  rows="6"
                  value={
                    form.specialRequests
                  }
                  onChange={handleChange}
                  placeholder="Enter any special requests, preferred travel time, seating preference or other information..."
                  maxLength="2000"
                />

                <div className="character-count">
                  {form.specialRequests.length}/2000
                </div>

                {errors.specialRequests && (
                  <small className="form-error">
                    {errors.specialRequests}
                  </small>
                )}

              </div>

            </div>

            {/* SUBMIT */}

            <div className="flight-booking__submit-wrapper">

              <button
                type="submit"
                className="flight-booking__submit"
                disabled={submitting}
              >

                {submitting ? (
                  <>
                    <span className="submit-spinner"></span>
                    Submitting Request...
                  </>
                ) : (
                  <>
                    Submit Flight Booking Request
                    <span>→</span>
                  </>
                )}

              </button>

              <p className="flight-booking__privacy">
                By submitting this form, you agree that
                Usben Consults may contact you regarding
                your flight booking request.
              </p>

            </div>

          </form>

        </div>

      </div>

    </section>
  )
}

export default FlightBooking