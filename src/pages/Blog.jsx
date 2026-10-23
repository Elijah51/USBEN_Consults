import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Blog.css";
import SEO from '../components/SEO';

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric", month: "long", day: "numeric",
  });
}

export function makeSlug(value) {
  return value.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function BlogCard({ post }) {
  return (
    <article className="ub-blog-card">
      <Link to={`/blog/${post.slug}`} className="ub-blog-card__image-link">
        {post.cover_image ? (
          <img className="ub-blog-card__image" src={post.cover_image} alt={post.title} />
        ) : (
          <div className="ub-blog-card__image ub-blog-card__placeholder">Usben Consults Ltd</div>
        )}
      </Link>
      <div className="ub-blog-card__body">
        <span className="ub-blog-card__category">{post.category || "News"}</span>
        <h2><Link to={`/blog/${post.slug}`}>{post.title}</Link></h2>
        <p>{post.excerpt || ""}</p>
        <div className="ub-blog-card__meta">
          <span>{post.author_name || "Usben Consults Ltd"}</span>
          <span>{formatDate(post.published_at || post.created_at)}</span>
        </div>
        <Link className="ub-blog-read-more" to={`/blog/${post.slug}`}>Read article →</Link>
      </div>
    </article>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    async function loadPosts() {
      const { data, error: queryError } = await supabase
        .from("blog_posts")
        .select("id,title,slug,excerpt,content,cover_image,category,author_name,status,published_at,created_at")
        .eq("status", "published")
        .order("published_at", { ascending: false, nullsFirst: false });
      if (!alive) return;
      if (queryError) setError("We could not load articles right now. Please refresh the page.");
      else setPosts(data || []);
      setLoading(false);
    }
    loadPosts();
    return () => { alive = false; };
  }, []);

  return (
    <section className="ub-blog-page">

      <SEO
  title="Study Abroad and Travel Advice Blog | Usben Consults"
  description="Read helpful articles about studying abroad, university applications, visa preparation, international education, and travel planning."
  path="/blog"
/>

      <div className="ub-blog-hero">
        <p className="ub-blog-eyebrow">USBEN CONSULTS LTD</p>
        <h1>Insights, Advice & Opportunities</h1>
        <p>Explore education, study abroad, career guidance, and helpful updates from our team.</p>
      </div>
      <div className="ub-blog-container">
        {loading && <p className="ub-blog-state">Loading articles…</p>}
        {error && <p className="ub-blog-state ub-blog-error">{error}</p>}
        {!loading && !error && posts.length === 0 && (
          <div className="ub-blog-empty">
            <h2>Our blog is coming soon</h2>
            <p>We are preparing helpful articles and updates. Please check back soon.</p>
          </div>
        )}
        {!loading && !error && posts.length > 0 && (
          <div className="ub-blog-grid">{posts.map(post => <BlogCard key={post.id} post={post} />)}</div>
        )}
      </div>
    </section>
  );
}
