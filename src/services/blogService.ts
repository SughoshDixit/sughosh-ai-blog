
import { BlogPost, Comment } from "@/types";

// Mock blog posts data
export const getMockPosts = (): BlogPost[] => [
  {
    id: "1",
    title: "The Future of Web Development: What's Coming in 2023",
    slug: "future-web-development-2023",
    excerpt: "Explore the upcoming trends and technologies shaping the future of web development in 2023 and beyond.",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</p>
      
      <h2>The Rise of Web Components</h2>
      
      <p>Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere. Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
      
      <p>Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p>
      
      <h2>AI-Powered Development Tools</h2>
      
      <p>Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</p>
      
      <p>Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    category: "Web Development",
    publishedAt: "2023-05-15T10:00:00Z",
    likes: 42,
    author: {
      name: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  },
  {
    id: "2",
    title: "Mastering CSS Grid: Advanced Layout Techniques",
    slug: "mastering-css-grid-advanced-techniques",
    excerpt: "Learn advanced CSS Grid techniques to create complex and responsive layouts for modern websites.",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</p>
      
      <h2>Understanding CSS Grid Fundamentals</h2>
      
      <p>Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere. Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
      
      <p>Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p>
      
      <h2>Advanced Grid Techniques</h2>
      
      <p>Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</p>
      
      <p>Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    category: "CSS",
    publishedAt: "2023-04-28T09:30:00Z",
    likes: 38,
    author: {
      name: "Samantha Lee",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  },
  {
    id: "3",
    title: "Building Accessible Web Applications: Best Practices",
    slug: "accessible-web-applications-best-practices",
    excerpt: "A comprehensive guide to implementing accessibility features in your web applications following WCAG standards.",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</p>
      
      <h2>Why Accessibility Matters</h2>
      
      <p>Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere. Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
      
      <p>Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p>
      
      <h2>Implementing WCAG Standards</h2>
      
      <p>Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</p>
      
      <p>Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    category: "Accessibility",
    publishedAt: "2023-04-15T14:20:00Z",
    likes: 65,
    author: {
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    },
  },
];

// Get single post by slug
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return getMockPosts().find(post => post.slug === slug);
};

// Mock comments data
export const getCommentsByPostId = (postId: string): Comment[] => [
  {
    id: "comment-1",
    postId: postId,
    userId: "user-2",
    userName: "Jane Smith",
    userAvatar: "https://randomuser.me/api/portraits/women/65.jpg",
    content: "Great article! I especially liked the part about web components. Can't wait to see how they evolve in the coming years.",
    createdAt: "2023-05-16T14:23:00Z",
  },
  {
    id: "comment-2",
    postId: postId,
    userId: "user-3",
    userName: "Mark Wilson",
    userAvatar: "https://randomuser.me/api/portraits/men/41.jpg",
    content: "I think AI-powered development tools will completely change the workflow for developers. We're already seeing some amazing things with GitHub Copilot.",
    createdAt: "2023-05-17T09:45:00Z",
  },
];
