
import { BlogPost } from "@/types";

// Mock blog posts data
export const getMockPosts = (): BlogPost[] => [
  {
    id: "1",
    title: "The Future of Web Development: What's Coming in 2023",
    slug: "future-web-development-2023",
    excerpt: "Explore the upcoming trends and technologies shaping the future of web development in 2023 and beyond.",
    content: "Lorem ipsum dolor sit amet...",
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
    content: "Lorem ipsum dolor sit amet...",
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
    content: "Lorem ipsum dolor sit amet...",
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
