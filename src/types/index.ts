
export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  publishedAt: string;
  updatedAt?: string; // Added this optional property
  likes: number;
  author: {
    name: string;
    avatar: string;
  };
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

export type Comment = {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
};

export type SocialStats = {
  platform: 'twitter' | 'facebook' | 'instagram' | 'linkedin';
  followers: number;
  engagement: number;
  growth: number;
};

export type GalleryItem = {
  id: number | string;
  title: string;
  description: string;
  imageUrl: string;
  type: "image" | "video";
};
