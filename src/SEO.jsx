import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.usbenconsults.com";

export default function SEO({
  title = "Usben Consults Limited",
  description = "Explore study abroad opportunities, visa support, and international flight booking services with Usben Consults Limited.",
  path = "/",
  image,
}) {
  const canonicalUrl = new URL(path, SITE_URL).href;

  return (
    <Helmet>
      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      <link
        rel="canonical"
        href={canonicalUrl}
      />

      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:site_name"
        content="Usben Consults Limited"
      />

      <meta
        property="og:title"
        content={title}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:url"
        content={canonicalUrl}
      />

      {image && (
        <meta
          property="og:image"
          content={image}
        />
      )}
    </Helmet>
  );
}