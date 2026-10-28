import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Blog.css";

const ADMIN_EMAILS = [
  "elijahsimon820@gmail.com",
  "usbenconsults@gmail.com",
];

const EMPTY_FORM = {
id: null,
image_url: "",
heading: "",
description: "",
button_text: "Learn More",
button_target: "/programs",
display_order: 0,
is_published: false,
};

export default function AdminSlider() {
const [session, setSession] = useState(null);
const [checkingSession, setCheckingSession] = useState(true);
const [email, setEmail] = useState(ADMIN_EMAILS[0]);
const [password, setPassword] = useState("");
const [authError, setAuthError] = useState("");
const [slides, setSlides] = useState([]);
const [form, setForm] = useState(EMPTY_FORM);
const [imageFile, setImageFile] = useState(null);
const [loading, setLoading] = useState(false);
const [saving, setSaving] = useState(false);
const [message, setMessage] = useState("");

const isAdmin = useMemo(
() =>
ADMIN_EMAILS.includes(
session?.user?.email?.toLowerCase() || ""
),
[session]
);

useEffect(() => {
let alive = true;


supabase.auth.getSession().then(({ data }) => {
  if (alive) {
    setSession(data.session);
    setCheckingSession(false);
  }
});

const { data: listener } = supabase.auth.onAuthStateChange(
  (_event, nextSession) => {
    setSession(nextSession);
    setCheckingSession(false);
  }
);

return () => {
  alive = false;
  listener.subscription.unsubscribe();
};


}, []);

useEffect(() => {
if (isAdmin) loadSlides();
}, [isAdmin]);

async function loadSlides() {
setLoading(true);
setMessage("");


const { data, error } = await supabase
  .from("homepage_slides")
  .select("*")
  .order("display_order", { ascending: true });

if (error) {
  setMessage(`Could not load slides: ${error.message}`);
} else {
  setSlides(data || []);
}

setLoading(false);


}

async function signIn(event) {
event.preventDefault();
setAuthError("");


if (!ADMIN_EMAILS.includes(email.trim().toLowerCase())) {
  setAuthError("Please use an authorized administrator email.");
  return;
}

const { error } = await supabase.auth.signInWithPassword({
  email: email.trim(),
  password,
});

if (error) setAuthError(error.message);
setPassword("");


}

async function signOut() {
await supabase.auth.signOut();
setSlides([]);
setForm(EMPTY_FORM);
setMessage("");
}

function updateField(field, value) {
setForm((current) => ({ ...current, [field]: value }));
}

function startNewSlide() {
setForm({
...EMPTY_FORM,
display_order: slides.length,
});
setImageFile(null);
setMessage("");
}

function editSlide(slide) {
setForm({ ...slide });
setImageFile(null);
setMessage("");
window.scrollTo({ top: 0, behavior: "smooth" });
}

// async function saveSlide(event) {
// event.preventDefault();
// setMessage(
// "The save function will be enabled in the next step."
// );
// }

async function saveSlide(event) {
event.preventDefault();
setSaving(true);
setMessage("");

try {
let imageUrl = form.image_url.trim();


if (imageFile) {
  if (!["image/jpeg", "image/png", "image/webp"].includes(imageFile.type)) {
    throw new Error("Please select a JPG, PNG, or WebP image.");
  }

  if (imageFile.size > 5 * 1024 * 1024) {
    throw new Error("The image must be smaller than 5 MB.");
  }

  const safeName = imageFile.name
    .replace(/[^a-zA-Z0-9._-]/g, "-");

  const filePath = `${Date.now()}-${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from("homepage-slides")
    .upload(filePath, imageFile, {
      cacheControl: "3600",
      upsert: false,
      contentType: imageFile.type,
    });

  if (uploadError) throw uploadError;

  const { data: publicData } = supabase.storage
    .from("homepage-slides")
    .getPublicUrl(filePath);

  imageUrl = publicData.publicUrl;
}

if (!imageUrl) {
  throw new Error("Please select an image or enter an image URL.");
}

const slideData = {
  image_url: imageUrl,
  heading: form.heading.trim(),
  description: form.description.trim(),
  button_text: form.button_text.trim() || "Learn More",
  button_target: form.button_target.trim() || "/programs",
  display_order: Number(form.display_order) || 0,
  is_published: Boolean(form.is_published),
  updated_at: new Date().toISOString(),
};

let result;

if (form.id) {
  result = await supabase
    .from("homepage_slides")
    .update(slideData)
    .eq("id", form.id)
    .select()
    .single();
} else {
  result = await supabase
    .from("homepage_slides")
    .insert(slideData)
    .select()
    .single();
}

if (result.error) throw result.error;

setMessage("Slide saved successfully!");
setForm({ ...EMPTY_FORM, display_order: slides.length + 1 });
setImageFile(null);

await loadSlides();


} catch (error) {
setMessage(`Could not save slide: ${error.message}`);
} finally {
setSaving(false);
}
}


async function deleteSlide(slide) {
if (
!window.confirm(
`Delete this slider record permanently?`
)
) {
return;
}


const { error } = await supabase
  .from("homepage_slides")
  .delete()
  .eq("id", slide.id);

if (error) {
  setMessage(`Delete failed: ${error.message}`);
} else {
  setMessage("Slide deleted.");
  if (form.id === slide.id) setForm(EMPTY_FORM);
  await loadSlides();
}


}

if (checkingSession) {
return ( <div className="ub-blog-container ub-blog-state">
Checking administrator session… </div>
);
}

if (!isAdmin) {
return ( <section className="ub-admin-page"> <form className="ub-admin-login" onSubmit={signIn}> <Link to="/" className="ub-blog-back">
← Usben Consults Ltd website </Link>


      <p className="ub-blog-eyebrow">RESTRICTED AREA</p>
      <h1>Homepage slider administration</h1>
      <p>Sign in with an authorized administrator account.</p>

      <label>
        Email address
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="username"
          required
        />
      </label>

      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
        />
      </label>

      {authError && (
        <p className="ub-admin-message ub-blog-error">
          {authError}
        </p>
      )}

      <button className="ub-admin-button" type="submit">
        Sign in
      </button>
    </form>
  </section>
);


}

return ( <section className="ub-admin-page"> <div className="ub-admin-header"> <div> <p className="ub-blog-eyebrow">USBEN CONSULTS LTD</p> <h1>Homepage slider dashboard</h1> <p>Signed in as {session.user.email}</p> </div>

    <div className="ub-admin-header__actions">
      <Link className="ub-admin-secondary" to="/">
        View website
      </Link>
      <button
        className="ub-admin-secondary"
        type="button"
        onClick={signOut}
      >
        Sign out
      </button>
    </div>
  </div>

  {message && <p className="ub-admin-message">{message}</p>}

  <div className="ub-admin-layout">
    <form className="ub-admin-editor" onSubmit={saveSlide}>
      <div className="ub-admin-editor__title">
        <h2>{form.id ? "Edit slide" : "New slide"}</h2>
        <button
          type="button"
          className="ub-admin-secondary"
          onClick={startNewSlide}
        >
          New slide
        </button>
      </div>

      <label>
        Slide image
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) =>
            setImageFile(event.target.files?.[0] || null)
          }
        />
      </label>

      {imageFile && (
        <p>Selected image: {imageFile.name}</p>
      )}

      <label>
        Image URL
        <input
          value={form.image_url}
          onChange={(event) =>
            updateField("image_url", event.target.value)
          }
          placeholder="Uploaded image URL will appear here"
        />
      </label>

      <label>
        Heading
        <input
          value={form.heading}
          onChange={(event) =>
            updateField("heading", event.target.value)
          }
          maxLength={180}
        />
      </label>

      <label>
        Description
        <textarea
          value={form.description}
          onChange={(event) =>
            updateField("description", event.target.value)
          }
          rows={3}
        />
      </label>

      <label>
        Button text
        <input
          value={form.button_text}
          onChange={(event) =>
            updateField("button_text", event.target.value)
          }
        />
      </label>

      <label>
        Button destination
        <input
          value={form.button_target}
          onChange={(event) =>
            updateField("button_target", event.target.value)
          }
          placeholder="/programs"
        />
      </label>

      <label>
        Display order
        <input
          type="number"
          min={0}
          value={form.display_order}
          onChange={(event) =>
            updateField(
              "display_order",
              Number(event.target.value)
            )
          }
        />
      </label>

      <label className="ub-admin-checkbox">
        <input
          type="checkbox"
          checked={form.is_published}
          onChange={(event) =>
            updateField("is_published", event.target.checked)
          }
        />
        Publish this slide
      </label>

      <button
        className="ub-admin-button"
        type="submit"
        disabled={saving}
      >
        {saving ? "Saving…" : "Save slide"}
      </button>
    </form>

    <div className="ub-admin-posts">
      <h2>Existing slides</h2>

      {loading && <p>Loading slides…</p>}

      {!loading && slides.length === 0 && (
        <p>No slider records found yet.</p>
      )}

      {slides.map((slide) => (
        <article className="ub-admin-post-row" key={slide.id}>
          {slide.image_url && (
            <img
              src={slide.image_url}
              alt={slide.heading || "Homepage slide"}
              style={{
                width: 100,
                height: 65,
                objectFit: "cover",
                borderRadius: 6,
              }}
            />
          )}

          <div>
            <strong>{slide.heading || "Image-only slide"}</strong>
            <p>
              Order: {slide.display_order} ·{" "}
              {slide.is_published ? "Published" : "Hidden"}
            </p>
          </div>

          <button
            type="button"
            className="ub-admin-secondary"
            onClick={() => editSlide(slide)}
          >
            Edit
          </button>

          <button
            type="button"
            className="ub-admin-secondary"
            onClick={() => deleteSlide(slide)}
          >
            Delete
          </button>
        </article>
      ))}
    </div>
  </div>
</section>

);
}
