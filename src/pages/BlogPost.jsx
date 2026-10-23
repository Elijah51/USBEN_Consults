
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import SEO from "../components/SEO";
import "./Blog.css";

export default function BlogPost() {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;

    async function loadPost() {
      setLoading(true);
      setError(false);
      setPost(null);

      const { data, error: queryError } = await supabase
        .from("blog_posts")
        .select(
          "title,slug,excerpt,content,cover_image,category,author_name,published_at,created_at"
        )
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

      if (!alive) return;

      if (queryError || !data) {
        setError(true);
      } else {
        setPost(data);
      }

      setLoading(false);
    }

    loadPost();

    return () => {
      alive = false;
    };
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="ub-blog-container ub-blog-state">
        Loading article…
      </div>
    );
  }

  // Article not found or unpublished
  if (error || !post) {
    return (
      <>
        <SEO
          title="Article Not Found | Usben Consults"
          description="The requested article could not be found. Visit the Usben Consults blog for study abroad, visa support, and travel guidance."
          path={`/blog/${slug || ""}`}
          noIndex={true}
        />

        <div className="ub-blog-container ub-blog-empty">
          <h1>Article not found</h1>

          <p>
            This article may have been moved or is not published.
          </p>

          <Link className="ub-blog-read-more" to="/blog">
            ← Back to blog
          </Link>
        </div>
      </>
    );
  }

  // Format the publication date
  const publicationDate = post.published_at || post.created_at;

  const formattedDate = publicationDate
    ? new Date(publicationDate).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  // SEO description
  const seoDescription =
    post.excerpt ||
    `Read ${post.title} for study abroad, visa support, international education, and travel guidance from Usben Consults Limited.`;

  return (
    <>
      <SEO
        title={`${post.title} | Usben Consults`}
        description={seoDescription}
        path={`/blog/${post.slug}`}
        image={post.cover_image || "/images/hero1.jpg"}
      />

      <article className="ub-blog-article">
        <div className="ub-blog-article__top">
          <Link to="/blog" className="ub-blog-back">
            ← All articles
          </Link>

          {post.category && (
            <span className="ub-blog-card__category">
              {post.category}
            </span>
          )}

          <h1>{post.title}</h1>

          {post.excerpt && (
            <p className="ub-blog-article__excerpt">
              {post.excerpt}
            </p>
          )}

          <div className="ub-blog-card__meta">
            <span>
              {post.author_name || "Usben Consults Ltd"}
            </span>

            {formattedDate && <span>{formattedDate}</span>}
          </div>
        </div>

        {post.cover_image && (
          <img
            className="ub-blog-article__cover"
            src={post.cover_image}
            alt={post.title}
          />
        )}

        <div className="ub-blog-article__content">
          {(post.content || "")
            .split(/\r?\n/)
            .map((line, index) =>
              line.trim() ? (
                <p key={index}>{line}</p>
              ) : (
                <br key={index} />
              )
            )}
        </div>

        <div className="ub-blog-article__bottom">
          <Link className="ub-blog-read-more" to="/blog">
            Explore more articles →
          </Link>
        </div>
      </article>
    </>
  );
}
