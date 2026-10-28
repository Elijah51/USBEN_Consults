import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { makeSlug } from "./Blog";
import "./Blog.css";
import RichTextEditor from "./RichTextEditor";

const ADMIN_EMAILS = [
  "elijahsimon820@gmail.com",
  "usbenconsults@gmail.com",
];
const EMPTY_FORM = {
  id: null, title: "", slug: "", excerpt: "", content: "",
  category: "Study Abroad", author_name: "Usben Consults Ltd",
  cover_image: "", status: "draft",
};

export default function AdminBlog() {
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState(ADMIN_EMAILS[0]);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [autoSlug, setAutoSlug] = useState(true);

  const isAdmin = useMemo(
    () => ADMIN_EMAILS.includes(session?.user?.email?.toLowerCase() || ""),
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
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setCheckingSession(false);
    });
    return () => {
      alive = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isAdmin) loadPosts();
    // loadPosts is intentionally called when admin status changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  async function loadPosts() {
    setLoadingPosts(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) setMessage(`Could not load posts: ${error.message}`);
    else setPosts(data || []);
    setLoadingPosts(false);
  }

  async function signIn(event) {
    event.preventDefault();
    setAuthError("");
    if (!ADMIN_EMAILS.includes(email.trim().toLowerCase())) {
      setAuthError(`Please sign in with one of these authorized emails: ${ADMIN_EMAILS.join(", ")}.`);
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
    setPosts([]);
    setForm(EMPTY_FORM);
    setMessage("");
  }

  function startNewPost() {
    setForm(EMPTY_FORM);
    setImageFile(null);
    setAutoSlug(true);
    setMessage("");
  }

  function editPost(post) {
    setForm({
      id: post.id, title: post.title || "", slug: post.slug || "",
      excerpt: post.excerpt || "", content: post.content || "",
      category: post.category || "Study Abroad",
      author_name: post.author_name || "Usben Consults Ltd",
      cover_image: post.cover_image || "", status: post.status || "draft",
    });
    setImageFile(null);
    setAutoSlug(false);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateField(field, value) {
    setForm(current => {
      const next = { ...current, [field]: value };
      if (field === "title" && autoSlug) next.slug = makeSlug(value);
      return next;
    });
  }

  async function savePost(event) {
    event.preventDefault();
    setMessage("");
    if (!form.title.trim() || !form.slug.trim() || !form.content.trim()) {
      setMessage("Please add a title, URL slug, and article content.");
      return;
    }
    setSaving(true);
    try {
      let coverImage = form.cover_image;
      if (imageFile) {
        const extension = imageFile.name.split(".").pop()?.toLowerCase() || "jpg";
        const filePath = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
        const { error: uploadError } = await supabase.storage
          .from("blog-covers")
          .upload(filePath, imageFile, { upsert: false, contentType: imageFile.type });
        if (uploadError) throw uploadError;
        const { data: publicData } = supabase.storage.from("blog-covers").getPublicUrl(filePath);
        coverImage = publicData.publicUrl;
      }
      const payload = {
        title: form.title.trim(),
        slug: makeSlug(form.slug),
        excerpt: form.excerpt.trim(),
        content: form.content.trim(),
        category: form.category.trim() || "News",
        author_name: form.author_name.trim() || "Usben Consults Ltd",
        cover_image: coverImage || null,
        status: form.status,
        published_at: form.status === "published" ? new Date().toISOString() : null,
      };
      const query = form.id
        ? supabase.from("blog_posts").update(payload).eq("id", form.id)
        : supabase.from("blog_posts").insert(payload);
      const { error } = await query;
      if (error) throw error;
      setMessage(form.status === "published" ? "Article published successfully." : "Draft saved successfully.");
      setForm(EMPTY_FORM);
      setImageFile(null);
      setAutoSlug(true);
      await loadPosts();
    } catch (error) {
      setMessage(`Save failed: ${error.message || "Unknown error"}`);
    } finally {
      setSaving(false);
    }
  }

  async function deletePost(post) {
    if (!window.confirm(`Delete "${post.title}" permanently?`)) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", post.id);
    if (error) setMessage(`Delete failed: ${error.message}`);
    else {
      setMessage("Article deleted.");
      if (form.id === post.id) setForm(EMPTY_FORM);
      await loadPosts();
    }
  }

  if (checkingSession) return <div className="ub-blog-container ub-blog-state">Checking administrator session…</div>;

  if (!isAdmin) {
    return (
      <section className="ub-admin-page">
        <form className="ub-admin-login" onSubmit={signIn}>
          <Link to="/" className="ub-blog-back">← Usben Consults Ltd website</Link>
          <p className="ub-blog-eyebrow">RESTRICTED AREA</p>
          <h1>Blog administrator login</h1>
          <p>Sign in using the authorized administrator account.</p>
          <label>Email address
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="username" required />
          </label>
          <label>Password
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" required />
          </label>
          {authError && <p className="ub-admin-message ub-blog-error">{authError}</p>}
          <button className="ub-admin-button" type="submit">Sign in</button>
          <p className="ub-admin-help">If you need to reset your password, use the password reset option in your Supabase Auth setup or contact your project administrator.</p>
        </form>
      </section>
    );
  }

  return (
    <section className="ub-admin-page">
      <div className="ub-admin-header">
        <div>
          <p className="ub-blog-eyebrow">USBEN CONSULTS LTD</p>
          <h1>Blog dashboard</h1>
          <p>Signed in as {session.user.email}</p>
        </div>
        <div className="ub-admin-header__actions">
          <Link className="ub-admin-secondary" to="/blog">View public blog</Link>
          <button className="ub-admin-secondary" type="button" onClick={signOut}>Sign out</button>
        </div>
      </div>

      {message && <p className="ub-admin-message">{message}</p>}

      <div className="ub-admin-layout">
        <form className="ub-admin-editor" onSubmit={savePost}>
          <div className="ub-admin-editor__title">
            <h2>{form.id ? "Edit article" : "Write an article"}</h2>
            <button type="button" className="ub-admin-secondary" onClick={startNewPost}>New post</button>
          </div>
          <label>Article title
            <input value={form.title} onChange={e => updateField("title", e.target.value)} maxLength={180} required />
          </label>
          <label>URL slug
            <input value={form.slug} onChange={e => { setAutoSlug(false); updateField("slug", e.target.value); }} required />
            <small>URL: /blog/{makeSlug(form.slug || "your-article-title")}</small>
          </label>
          <label>Short summary
            <textarea value={form.excerpt} onChange={e => updateField("excerpt", e.target.value)} rows="3" maxLength={350} />
          </label>
          <div className="ub-admin-form-row">
            <label>Category
              <select value={form.category} onChange={e => updateField("category", e.target.value)}>
                <option>Study Abroad</option><option>Education</option><option>Immigration</option>
                <option>Career Advice</option><option>Recruitment</option><option>Company News</option>
              </select>
            </label>
            <label>Status
              <select value={form.status} onChange={e => updateField("status", e.target.value)}>
                <option value="draft">Draft</option><option value="published">Published</option>
              </select>
            </label>
          </div>
          <label>Author
            <input value={form.author_name} onChange={e => updateField("author_name", e.target.value)} />
          </label>
          <label>Cover image (JPG, PNG, WEBP or GIF; max 5 MB)
            <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={e => setImageFile(e.target.files?.[0] || null)} />
          </label>
          {form.cover_image && !imageFile && <img className="ub-admin-image-preview" src={form.cover_image} alt="Current cover" />}
          {imageFile && <p className="ub-admin-help">Selected: {imageFile.name}</p>}
          {/* <label>Article content
            <textarea className="ub-admin-content-input" value={form.content} onChange={e => updateField("content", e.target.value)} rows="14" required />
            <small>Use blank lines between paragraphs. This editor currently supports plain text.</small>
          </label> */}
          <div className="ub-admin-content-field">
  <label>Article content</label>

  <RichTextEditor
    value={form.content}
    onChange={(value) => updateField("content", value)}
  />

  {!form.content.replace(/<[^>]*>/g, "").trim() && (
    <small>Please enter your article content.</small>
  )}
</div>

          <div className="ub-admin-editor__actions">
            <button className="ub-admin-button" type="submit" disabled={saving}>{saving ? "Saving…" : form.status === "published" ? "Publish article" : "Save draft"}</button>
            {form.id && <button type="button" className="ub-admin-secondary" onClick={startNewPost}>Cancel edit</button>}
          </div>
        </form>

        <aside className="ub-admin-posts">
          <div className="ub-admin-posts__title"><h2>Articles</h2><button type="button" className="ub-admin-secondary" onClick={loadPosts}>Refresh</button></div>
          {loadingPosts && <p>Loading articles…</p>}
          {!loadingPosts && posts.length === 0 && <p>No articles yet. Write your first article.</p>}
          {posts.map(post => (
            <div className="ub-admin-post-row" key={post.id}>
              <div><strong>{post.title}</strong><span className={`ub-admin-status ub-admin-status--${post.status}`}>{post.status}</span></div>
              <small>Updated {new Date(post.updated_at).toLocaleDateString()}</small>
              <div className="ub-admin-post-row__actions">
                <button type="button" onClick={() => editPost(post)}>Edit</button>
                {post.status === "published" && <Link to={`/blog/${post.slug}`} target="_blank" rel="noreferrer">View</Link>}
                <button type="button" className="ub-admin-delete" onClick={() => deletePost(post)}>Delete</button>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
