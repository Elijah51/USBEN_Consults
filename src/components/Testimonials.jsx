import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";


const MAX_NAME = 100;
const MAX_COMPANY = 120;
const MAX_REVIEW = 1500;

function StarRating({ rating, interactive = false, onChange }) {
  return (
    <div
      className={`review-stars ${interactive ? "review-stars--interactive" : ""}`}
      role={interactive ? "radiogroup" : "img"}
      aria-label={interactive ? "Choose a rating from 1 to 5 stars" : `${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        interactive ? (
          <button
            key={star}
            type="button"
            className={`review-star-button ${star <= rating ? "is-selected" : ""}`}
            onClick={() => onChange(star)}
            role="radio"
            aria-checked={rating === star}
            aria-label={`${star} star${star === 1 ? "" : "s"}`}
          >
            ★
          </button>
        ) : (
          <span key={star} className={star <= rating ? "is-selected" : ""} aria-hidden="true">
            ★
          </span>
        )
      ))}
    </div>
  );
}

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState({ type: "", text: "" });
  const [form, setForm] = useState({
    name: "",
    company: "",
    rating: 5,
    review: "",
    website: "", // Honeypot field for simple bot detection
  });

  useEffect(() => {
    let active = true;

    async function loadReviews() {
      const { data, error } = await supabase
        .from("customer_reviews")
        .select("id, customer_name, company_name, rating, review, created_at")
        .order("created_at", { ascending: false });

      if (!active) return;

      if (error) {
        console.error("Could not load customer reviews:", error.message);
        setLoadError("Reviews are temporarily unavailable. Please try again later.");
      } else {
        setReviews((data || []).map((item) => ({ ...item, name: item.customer_name, company: item.company_name })));
        setLoadError("");
      }
      setLoading(false);
    }

    loadReviews();

    const channel = supabase
      .channel("public-customer-reviews")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "customer_reviews" },
        (payload) => {
          if (!active) return;
          setReviews((current) => {
            if (current.some((item) => item.id === payload.new.id)) return current;
            return [{ ...payload.new, name: payload.new.customer_name, company: payload.new.company_name }, ...current].sort(
              (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
          });
        }
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, []);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormMessage({ type: "", text: "" });

    // Honeypot: silently reject submissions that fill the hidden field.
    if (form.website.trim()) {
      setFormMessage({ type: "success", text: "Thank you for your feedback." });
      return;
    }

    const name = form.name.trim();
    const company = form.company.trim();
    const review = form.review.trim();
    const rating = Number(form.rating);

    if (name.length < 2 || name.length > MAX_NAME) {
      setFormMessage({ type: "error", text: "Please enter a name between 2 and 100 characters." });
      return;
    }
    if (company.length > MAX_COMPANY) {
      setFormMessage({ type: "error", text: "Company name must be 120 characters or fewer." });
      return;
    }
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      setFormMessage({ type: "error", text: "Please select a rating from 1 to 5 stars." });
      return;
    }
    if (review.length < 10 || review.length > MAX_REVIEW) {
      setFormMessage({ type: "error", text: "Your review must be between 10 and 1,500 characters." });
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase
        .from("customer_reviews")
        .insert([{ customer_name: name, company_name: company || null, rating, review }])
        .select("id, customer_name, company_name, rating, review, created_at")
        .single();

      if (error) throw error;

      const savedReview = {
        ...data,
        name: data.customer_name,
        company: data.company_name,
      };

      setReviews((current) => {
        if (current.some((item) => item.id === savedReview.id)) return current;
        return [savedReview, ...current].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      });
      setForm({
        name: "",
        company: "",
        rating: 5,
        review: "",
        website: "",
      });
      setFormMessage({
        type: "success",
        text: "Thank you! Your review has been published and is now visible on the website.",
      });
    } catch (error) {
      console.error("Could not submit customer review:", error);
      setFormMessage({
        type: "error",
        text: "We couldn't submit your review right now. Please try again in a moment.",
      });
    } finally {
      setSubmitting(false);
    }

  }

  const averageRating = reviews.length
    ? (reviews.reduce((total, item) => total + Number(item.rating), 0) / reviews.length).toFixed(1)
    : null;

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-container">
        <div className="testimonials-heading">
          <span className="testimonials-subtitle">CLIENT TESTIMONIALS</span>
          <h2>
            Trusted by Clients, <br />
            <span>Driven by Results.</span>
          </h2>
          <p>
            Have you worked with Usben Consults Ltd? Share your experience
            and help others learn about our services.
          </p>
          {averageRating && (
            <div className="review-summary" aria-live="polite">
              <strong>{averageRating}/5</strong>
              <StarRating rating={Math.round(Number(averageRating))} />
              <span>Based on {reviews.length} {reviews.length === 1 ? "review" : "reviews"}</span>
            </div>
          )}
        </div>

        <div className="review-form-card">
          <div className="review-form-heading">
            <h3>Share Your Experience</h3>
            <p>Your review will appear on this website after you submit it.</p>
          </div>

          <form className="review-form" onSubmit={handleSubmit}>
            <div className="review-form-row">
              <label>
                Full name <span aria-hidden="true">*</span>
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={updateField}
                  minLength={2}
                  maxLength={MAX_NAME}
                  required
                  placeholder="Enter your name"
                />
              </label>

              <label>
                Company name <span className="review-optional">(optional)</span>
                <input
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={form.company}
                  onChange={updateField}
                  maxLength={MAX_COMPANY}
                  placeholder="Enter your company"
                />
              </label>
            </div>

            <fieldset className="review-rating-field">
              <legend>Your rating <span aria-hidden="true">*</span></legend>
              <StarRating
                rating={Number(form.rating)}
                interactive
                onChange={(rating) => setForm((current) => ({ ...current, rating }))}
              />
            </fieldset>

            <label>
              Your review <span aria-hidden="true">*</span>
              <textarea
                name="review"
                value={form.review}
                onChange={updateField}
                minLength={10}
                maxLength={MAX_REVIEW}
                required
                rows={5}
                placeholder="Tell us about your experience with Usben Consults Ltd..."
              />
              <span className="review-character-count">{form.review.length}/{MAX_REVIEW}</span>
            </label>

            <label className="review-honeypot" aria-hidden="true">
              Leave this field empty
              <input
                name="website"
                type="text"
                tabIndex="-1"
                autoComplete="off"
                value={form.website}
                onChange={updateField}
              />
            </label>

            <button className="review-submit-button" type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Review"}
              {!submitting && <span aria-hidden="true"> →</span>}
            </button>

            {formMessage.text && (
              <p className={`review-form-message is-${formMessage.type}`} role="status">
                {formMessage.text}
              </p>
            )}
          </form>
        </div>

        <div className="reviews-list-heading">
          <h3>What Our Clients Say</h3>
          <p>Recent feedback shared by our clients.</p>
        </div>

        {loading ? (
          <p className="reviews-status">Loading reviews...</p>
        ) : loadError ? (
          <p className="reviews-status is-error">{loadError}</p>
        ) : reviews.length === 0 ? (
          <p className="reviews-status">
            No reviews yet. If you've worked with us, be the first to share your experience.
          </p>
        ) : (
          <div className="testimonials-grid" aria-live="polite">
            {reviews.map((item) => {
              const initials = item.name
                .trim()
                .split(/\s+/)
                .slice(0, 2)
                .map((part) => part.charAt(0).toUpperCase())
                .join("");

              return (
                <article className="testimonial-card" key={item.id}>
                  <div className="testimonial-top">
                    <span className="testimonial-quote" aria-hidden="true">“</span>
                    <StarRating rating={Number(item.rating)} />
                  </div>
                  <p className="testimonial-review">{item.review}</p>
                  <div className="testimonial-divider" />
                  <div className="testimonial-author">
                    <div className="testimonial-avatar" aria-hidden="true">{initials || "C"}</div>
                    <div className="testimonial-author-info">
                      <h3>{item.name}</h3>
                      {item.company && <p>{item.company}</p>}
                      <span>{formatDate(item.created_at)}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* <div className="testimonials-cta">
          <div className="testimonials-cta-text">
            <h3>Ready to Work With Us?</h3>
            <p>
              Let us help you take the next step toward your goals.
              Contact Usben Consults Ltd to discuss your needs.
            </p>
          </div>
          <a href="/contact" className="testimonials-cta-button">
            Contact Us <span aria-hidden="true">→</span>
          </a>
        </div> */}
      </div>
    </section>
  );
}

export default Testimonials;
