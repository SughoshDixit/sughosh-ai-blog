
// Updated to use the Python backend API

import { BlogPost, Comment } from "@/types";

// Get all blog posts from API
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch('http://localhost:5000/api/blog/posts');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return getMockPosts(); // Fallback to mock data if the API fails
  }
};

// Get single post by slug
export const getPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  try {
    const response = await fetch(`http://localhost:5000/api/blog/posts/${slug}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return undefined;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return getMockPosts().find(post => post.slug === slug); // Fallback to mock data
  }
};

// Get comments for a post
export const getCommentsByPostId = async (postId: string): Promise<Comment[]> => {
  try {
    const response = await fetch(`http://localhost:5000/api/blog/comments/${postId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    // Return mock comments as fallback
    return [
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
  }
};

// Get notebooks for a post
export const getNotebooksByPostId = async (postId: string): Promise<any[]> => {
  try {
    const response = await fetch(`http://localhost:5000/api/blog/notebooks/${postId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching notebooks for post ${postId}:`, error);
    // Return empty array as fallback
    return [];
  }
};

// Updated mock posts data with real content (kept as fallback)
export const getMockPosts = (): BlogPost[] => [
  {
    id: "1",
    title: "Analyzing Indian GDP Growth Patterns",
    slug: "analyzing-indian-gdp-growth-patterns",
    excerpt: "A comprehensive data-driven analysis of India's economic growth patterns and factors influencing GDP fluctuations over the past decade.",
    content: `
      <p>India's economic journey over the past decade presents a fascinating case study for data scientists. In this analysis, I've used Python and various data science libraries to uncover patterns and insights in the GDP growth trajectory.</p>
      
      <h2>Data Collection and Preparation</h2>
      
      <p>I gathered quarterly GDP data from 2010 to 2023, along with various economic indicators including inflation rates, foreign direct investment, manufacturing output, service sector growth, and agricultural production. The dataset required significant cleaning and normalization to account for seasonal adjustments and reporting inconsistencies.</p>
      
      <p>{{notebook:notebook-1}}</p>
      
      <h2>Key Findings</h2>
      
      <p>The analysis revealed several interesting patterns:</p>
      
      <ul>
        <li>Service sector growth has consistently outpaced overall GDP growth by an average of 2.3% annually</li>
        <li>Agricultural output shows strong correlation with monsoon patterns, with a 3-month lag effect on GDP figures</li>
        <li>Manufacturing shows increased sensitivity to global supply chain disruptions post-2020</li>
        <li>FDI inflows demonstrate a strong positive correlation (0.78) with GDP growth in subsequent quarters</li>
      </ul>
      
      <h2>Predictive Modeling</h2>
      
      <p>Using these insights, I built several predictive models using time series analysis techniques. The ARIMA model with exogenous variables performed best, achieving an RMSE of 0.42 percentage points when predicting quarterly GDP growth.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1604594849809-dfedbc827105",
    category: "Economic Analysis",
    publishedAt: "2023-10-15T14:20:00Z",
    updatedAt: "2023-11-02T10:15:00Z",
    likes: 142,
    hasNotebooks: true,
    author: {
      name: "Sughosh Dixit",
      avatar: "/lovable-uploads/07f53509-f9a1-4c27-923a-c1cc0bac748b.png",
    },
  },
  {
    id: "2",
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
    updatedAt: "2023-09-02T10:15:00Z",
    likes: 127,
    author: {
      name: "Sughosh Dixit",
      avatar: "/lovable-uploads/07f53509-f9a1-4c27-923a-c1cc0bac748b.png",
    },
  },
  {
    id: "3",
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
    updatedAt: "2022-07-15T14:45:00Z",
    likes: 89,
    author: {
      name: "Sughosh Dixit",
      avatar: "/lovable-uploads/07f53509-f9a1-4c27-923a-c1cc0bac748b.png",
    },
  },
  {
    id: "4",
    title: "Sentiment Analysis of COVID-19 Tweets: A Machine Learning Approach",
    slug: "sentiment-analysis-covid19-tweets",
    excerpt: "Applying NLP and machine learning techniques to analyze public sentiment during different phases of the COVID-19 pandemic through Twitter data.",
    content: `
      <p>The COVID-19 pandemic generated unprecedented public discourse on social media platforms. In this study, I collected over 500,000 tweets related to COVID-19 from January 2020 to December 2021 to analyze how public sentiment evolved throughout different phases of the pandemic.</p>
      
      <h2>Methodology</h2>
      
      <p>Using Python's Natural Language Processing libraries, I preprocessed the tweets by removing stopwords, URLs, and special characters. I then applied tokenization, stemming, and vectorization to prepare the data for analysis.</p>
      
      <p>For sentiment classification, I implemented and compared multiple models:</p>
      <ul>
        <li>BERT (Bidirectional Encoder Representations from Transformers)</li>
        <li>Random Forest classifier</li>
        <li>Naive Bayes classifier</li>
        <li>LSTM (Long Short-Term Memory) neural network</li>
      </ul>
      
      <p>{{notebook:notebook-1}}</p>
      
      <h2>Key Findings</h2>
      
      <p>The BERT model achieved the highest accuracy at 87.3%, confirming its effectiveness for contextual understanding of text. Temporal analysis revealed several interesting patterns:</p>
      
      <ul>
        <li>Sentiment negativity peaked during announcements of lockdowns and case surges</li>
        <li>Vaccine announcements correlated with significant positive sentiment shifts</li>
        <li>Public sentiment became increasingly polarized over time, with fewer neutral expressions</li>
        <li>Geographical differences in sentiment aligned with varying pandemic impacts and policy responses</li>
      </ul>
    `,
    coverImage: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57",
    category: "Machine Learning",
    publishedAt: "2023-02-18T11:30:00Z",
    updatedAt: "2023-03-05T16:45:00Z",
    likes: 156,
    hasNotebooks: true,
    author: {
      name: "Sughosh Dixit",
      avatar: "/lovable-uploads/07f53509-f9a1-4c27-923a-c1cc0bac748b.png",
    },
  },
];
