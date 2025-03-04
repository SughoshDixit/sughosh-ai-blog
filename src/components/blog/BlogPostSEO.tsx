
import { Helmet } from "react-helmet-async";
import { BlogPost, Comment } from "@/types";
import { SEOHead } from "@/components/seo/SEOHead";

interface BlogPostSEOProps {
  post: BlogPost;
  comments: Comment[];
}

export const BlogPostSEO = ({ post, comments }: BlogPostSEOProps) => {
  // Format ISO date for structured data
  const formatISODate = (dateString: string) => {
    return new Date(dateString).toISOString();
  };

  // Create structured data for BlogPosting
  const createBlogPostingStructuredData = (post: BlogPost) => {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "image": post.coverImage,
      "wordcount": post.content.trim().split(/\s+/).length,
      "publisher": {
        "@type": "Organization",
        "name": "Sughosh Dixit",
        "logo": {
          "@type": "ImageObject",
          "url": "https://sughoshdixit.com/og-image.png"
        }
      },
      "url": `https://sughoshdixit.com/blog/${post.slug}`,
      "datePublished": formatISODate(post.publishedAt),
      "dateCreated": formatISODate(post.publishedAt),
      "dateModified": post.updatedAt ? formatISODate(post.updatedAt) : formatISODate(post.publishedAt),
      "description": post.excerpt,
      "author": {
        "@type": "Person",
        "name": post.author.name
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://sughoshdixit.com/blog/${post.slug}`
      },
      "comment": comments.map(comment => ({
        "@type": "Comment",
        "author": {
          "@type": "Person",
          "name": comment.userName
        },
        "datePublished": formatISODate(comment.createdAt),
        "text": comment.content
      }))
    };
  };

  // Create breadcrumb structured data
  const createBreadcrumbStructuredData = (post: BlogPost) => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://sughoshdixit.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://sughoshdixit.com/blog"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.title,
          "item": `https://sughoshdixit.com/blog/${post.slug}`
        }
      ]
    };
  };

  return (
    <>
      <SEOHead
        title={`${post.title} | Blog | Sughosh Dixit`}
        description={post.excerpt}
        canonicalUrl={`/blog/${post.slug}`}
        ogType="article"
        ogImage={post.coverImage}
        article={{
          publishedTime: formatISODate(post.publishedAt),
          modifiedTime: post.updatedAt ? formatISODate(post.updatedAt) : undefined,
          author: post.author.name,
          tags: [post.category]
        }}
      />
      
      {/* Structured Data for BlogPosting and BreadcrumbList */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(createBlogPostingStructuredData(post))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(createBreadcrumbStructuredData(post))}
        </script>
      </Helmet>
    </>
  );
};
