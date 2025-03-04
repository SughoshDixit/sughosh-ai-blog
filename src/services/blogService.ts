
import { BlogPost, Comment } from "@/types";

// Updated blog posts data with real content
export const getMockPosts = (): BlogPost[] => [
  {
    id: "1",
    title: "Gratitude for Being Born in the Ancient Civilization of Bharatavarsha",
    slug: "gratitude-for-being-born-in-the-ancient-civilization-of-bharatavarsha",
    excerpt: "Reflecting on the privilege of being born in Bharatavarsha (India), a land of ancient wisdom, spirituality, and a continuous civilization spanning thousands of years.",
    content: `
      <p>As I sit down to write this, I am overwhelmed with a deep sense of gratitude for being born in a land that has nurtured and preserved the most ancient civilization known to mankind. Bharatavarsha, as India was traditionally known, is not just a geographical entity but a living, breathing testament to human potential and spiritual exploration.</p>
      
      <h2>A Civilization Unlike Any Other</h2>
      
      <p>Most civilizations throughout history have risen, flourished for a while, and then perished, leaving behind only archaeological remnants. But India stands as an exception—a civilization that has continued unbroken for over 5,000 years, adapting and evolving while maintaining its core spiritual and philosophical foundations.</p>
      
      <p>While the Egyptian, Mesopotamian, Greek, and Roman civilizations now exist only in museums and history books, the traditions, rituals, and spiritual practices of ancient India continue to thrive today. The same mantras that echoed in the valleys of the Himalayas thousands of years ago are still chanted in homes and temples across the country.</p>
      
      <h2>The Cradle of Wisdom</h2>
      
      <p>Being born in this ancient land means having access to a treasure trove of wisdom that has been refined and passed down through countless generations. The Vedas, Upanishads, Puranas, and other ancient texts offer profound insights into the nature of reality, consciousness, and human existence.</p>
      
      <p>India's contribution to human knowledge goes far beyond spirituality. From mathematics and astronomy to medicine and metallurgy, ancient Indians made remarkable discoveries and innovations that were ahead of their time. The concept of zero, the decimal system, algebra, trigonometry, and the calculation of pi to several decimal places—all these originated in India.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1598091383060-24f83fdc7296",
    category: "Culture & Heritage",
    publishedAt: "2023-08-15T14:20:00Z",
    likes: 127,
    author: {
      name: "Sughosh Dixit",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  },
  {
    id: "2",
    title: "Being a Liverpool Fan: An Emotional Rollercoaster",
    slug: "being-ardent-liverpool-fan",
    excerpt: "The highs and lows of being a devoted Liverpool Football Club supporter through the years - a personal reflection.",
    content: `
      <p>Being an ardent Liverpool fan, I can tell that one of the most electrifying experiences is seeing your team play at Anfield, the historic home of Liverpool Football Club. The atmosphere is absolutely incredible, with 54,000 passionate fans singing "You'll Never Walk Alone" in unison, creating a wall of sound that can intimidate even the most formidable opponents.</p>
      
      <h2>The Glory and the Heartbreak</h2>
      
      <p>Liverpool's rich history is filled with tremendous highs and devastating lows. From winning the Champions League in miraculous fashion in Istanbul in 2005 to the heartbreaking slip in 2014 that cost us the Premier League title, being a Liverpool fan means experiencing the full spectrum of emotions.</p>
      
      <p>The 30-year wait for a Premier League title was finally ended in 2020, but it came during the COVID-19 pandemic when fans couldn't even be in the stadium to celebrate it properly. Such is the life of a Liverpool fan - even in moments of triumph, there's often a bittersweet element.</p>
      
      <h2>The Klopp Era</h2>
      
      <p>Jürgen Klopp's arrival at Liverpool in 2015 transformed the club's fortunes. His charismatic leadership, tactical acumen, and ability to forge a deep connection with the fans brought back the glory days to Liverpool. Under his guidance, Liverpool won the Champions League, Premier League, FIFA Club World Cup, FA Cup, and League Cup.</p>
      
      <p>The heavy metal football that Klopp introduced was characterized by high pressing, quick transitions, and a never-say-die attitude. This approach perfectly resonated with Liverpool's ethos of playing with passion and determination.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1623607915902-d28d86ade6ee",
    category: "Sports",
    publishedAt: "2022-06-20T09:30:00Z",
    likes: 89,
    author: {
      name: "Sughosh Dixit",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
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
    content: "Great article! I really enjoyed reading your perspective on this topic.",
    createdAt: "2023-05-16T14:23:00Z",
  },
  {
    id: "comment-2",
    postId: postId,
    userId: "user-3",
    userName: "Mark Wilson",
    userAvatar: "https://randomuser.me/api/portraits/men/41.jpg",
    content: "This was very insightful. Looking forward to more posts like this in the future.",
    createdAt: "2023-05-17T09:45:00Z",
  },
];
