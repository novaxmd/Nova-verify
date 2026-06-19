import type { Express, Request, Response } from "express";
import { type Server } from "http";
import { YouTube } from "youtube-sr";

const COMPANY_INFO = {
  company: "BWM XMD",
  channel: "https://whatsapp.com/channel/0029VaZuGSxEawdxZK9CzM0Y",
  creator: "Ibrahim Adams",
  website: "https://bwmxmd.co.ke"
};

const TRENDING_CATEGORIES = [  
  // Adult Content & Mature Themes
  'Adult comedy skits uncensored',
  'Dating fails and hookup stories',
  'Hot Instagram models and OnlyFans',
  'Spicy TikTok challenges 18+',
  'Adult comedy roasts and burns',
  'Relationship drama and breakups',
  'College party footage wild',
  'Hot girls dancing provocative',
  'Adult humor memes dark comedy',
  'Bedroom tips and advice 18+',
  
  // Music That Teens Actually Love
  'Trap music bangers 2025',
  'Drill rap street anthems',
  'Hip hop club bangers',
  'Afrobeats party vibes',
  'SoundCloud rap underground',
  'Rap beef and diss tracks',
  'Hood classics throwback',
  'Gangsta rap motivation',
  'R&B slow jams romantic',
  'Electronic dance rave music',
  
  // Movies & Series Teens Watch
  'Marvel superhero action movies',
  'Horror movies scary films',
  'Fast and Furious action',
  'Netflix teen romance series',
  'Anime action adventure',
  'Comedy movies raunchy humor',
  'Thriller psychological movies',
  'Crime documentaries true stories',
  'Zombie apocalypse movies',
  'Superhero vs villain battles',
  'Car Customization & Mods',  
  'Makeup Tutorials (Gen Z Style)',  
  'Prank Videos & Social Experiments',  
  'AI Tools & ChatGPT Hacks',  
  'Travel Vlogs (Budget Trips)',  
  'NFT & Crypto News Simplified',  
  'Dream Interpretation & Zodiac',  
  '3D Printing & DIY Projects',
  'Food Recipes Cooking Shows',
  'Horror Movies Scary Content',
  'Action Movies Trailers 2025',
  'Romance Movies Love Stories',
  'Documentary Nature Science',
  'Educational Learning Content',
  'Breaking News World Updates',
  'Business Success Stories',
  'Health Fitness Wellness',
  'Art Drawing Painting',
  'Photography Camera Tips',
  'Dance Choreography Videos',
  'Motivational Success Stories',
  'Book Reviews Literature',
  'History Ancient Modern',
  'Science Experiments Fun',
  'Language Learning Tips',
  'Meditation Relaxation ASMR',
  'Home Improvement DIY',
  'Pets Animals Cute Videos',
  'Baby Kids Family Vlogs',
  'Wedding Planning Ideas',
  'Interior Design Home Decor',
  'Architecture Modern Design',
  'Engineering Innovation Tech',
  'Medicine Health Science',
  'Psychology Mental Health',
  'Philosophy Deep Thoughts',
  'Religion Spirituality Faith',
  'Social Issues Awareness',
  'Environment Climate Change',
  'Space NASA Astronomy Stars',
  'Ocean Marine Life Discovery',
  'Wildlife Animals Safari',
  'Adventure Extreme Sports',
  'Mountain Climbing Hiking',
  'Beach Ocean Summer Vibes',
  'Winter Snow Skiing Fun',
  'Spring Nature Flowers',
  'Autumn Fall Colors',
  'City Life Urban Culture',
  'Rural Country Village Life',
  'Vintage Retro Classic Style',
  'Modern Contemporary Trends',
  'Future Technology Predictions',
  'Past Historical Events',
  'Present Current Global Trends',
  'Cryptocurrency Bitcoin Trading',
  'Startup Business Ideas',
  'Real Estate Investment Tips',
  'Stock Market Trading',
  'Personal Finance Money',
  'Career Development Jobs',
  'Online Education Courses',
  'Software Development Coding',
  'Web Design Programming',
  'Mobile App Development',
  'Digital Marketing SEO',
  'Social Media Growth',
  'YouTube Creator Tips',
  'Instagram Reels Trends',
  'Facebook Marketing',
  'Twitter Viral Content',
  'LinkedIn Professional',
  'Discord Community Building',
  'Twitch Streaming Gaming',
  'Podcast Creation Tips',
  'Blog Writing Content',
  'Email Marketing Strategies',
  'E-commerce Online Business',
  'Dropshipping Success',
  'Amazon FBA Business',
  'Shopify Store Setup',
  'WordPress Website Building',
  'Graphic Design Tutorials',
  'Video Editing Techniques',
  'Music Production Beats',
  'Sound Engineering Audio',
  'Voice Acting Training',
  'Public Speaking Confidence',
  'Presentation Skills Tips',
  'Time Management Productivity',
  'Goal Setting Achievement',
  'Mindset Success Habits',
  'Leadership Management',
  'Team Building Communication',
  'Negotiation Skills Business',
  'Sales Techniques Closing',
  'Customer Service Excellence',
  'Product Development Innovation',
  'Market Research Analysis',
  'Brand Building Marketing',
  'Content Creation Strategy',
  'Influencer Marketing Trends',
  'Viral Video Strategies',
  'Meme Culture Internet',
  'Gen Z Trends Culture',
  'Millennial Lifestyle',
  'Boomer Generation Wisdom',
  'Gen Alpha Future Kids',
  'Family Relationships Love',
  'Friendship Social Skills',
  'Dating Modern Romance',
  'Marriage Wedding Life',
  'Parenting Kids Tips',
  'Elder Care Respect',
  'Community Building Social',
  'Volunteer Work Charity',
  'Environmental Protection',
  'Sustainability Green Living',
  'Zero Waste Lifestyle',
  'Minimalism Simple Living',
  'Self Improvement Growth',
  'Confidence Building Tips',
  'Stress Management Relief',
  'Anxiety Depression Help',
  'Mental Health Awareness',
  'Physical Health Fitness',
  'Nutrition Diet Plans',
  'Weight Loss Journey',
  'Muscle Building Gym',
  'Yoga Stretching Flexibility',
  'Running Marathon Training',
  'Swimming Water Sports',
  'Cycling Bike Adventures',
  'Hiking Nature Trails',
  'Camping Outdoor Survival',
  'Fishing Peaceful Hobby',
  'Hunting Wildlife Sports',
  'Gardening Plant Care',
  'Farming Agriculture',
  'Cooking Recipe Videos',
  'Baking Sweet Treats',
  'Coffee Tea Culture',
  'Wine Tasting Culture',
  'Beer Brewing Craft',
  'Cocktails Mixology',
  'Restaurant Food Reviews',
  'Street Food Adventures',
  'Cultural Food Traditions',
  'Vegetarian Vegan Lifestyle',
  'Keto Diet Health',
  'Mediterranean Diet',
  'Asian Cuisine Cooking',
  'Italian Food Pasta',
  'Mexican Spicy Food',
  'Indian Curry Spices',
  'African Traditional Food',
  'European Cuisine',
  'American BBQ Grilling',
  'Seafood Ocean Catch',
  'Desserts Sweet Recipes',
  'Healthy Snack Ideas'
];

const MUSIC_CATEGORIES = [  
  // Explicit & Raw Hip Hop
  'Drill rap uncensored lyrics',
  'Gangsta rap street stories',
  'Trap beats hard bass',
  'Hip hop money drugs flex',
  'Rap beef diss tracks',
  'Underground rap raw',
  'Mumble rap codeine lean',
  'SoundCloud rap emotional',
  'Old school 90s rap',
  'New school rap 2025',
  
  // Party & Club Music
  'Club bangers dance floor',
  'Party anthems turn up',
  'EDM festival drops',
  'House music deep bass',
  'Techno rave music',
  'Afrobeats party vibes',
  'Amapiano dance moves',
  'Reggaeton latin beats',
  'Dancehall caribbean vibes',
  'Twerk music booty bounce',
  'Gospel Christian Music',
  'Country Western Songs',
  'Rock Metal Alternative',
  'Jazz Blues Soul Music',
  'Classical Orchestra Symphony',
  'Electronic House Techno',
  'World Music International',
  'Instrumental Background',
  'R&B Smooth Vocals',
  'Indie Alternative Music',
  'Punk Rock Rebellion',
  'Ska Reggae Fusion',
  'Latin Salsa Bachata',
  'Bollywood Indian Music',
  'K-Pop Korean Wave',
  'J-Pop Japanese Music',
  'C-Pop Chinese Music',
  'Arabic Middle Eastern',
  'African Traditional Music',
  'Celtic Irish Scottish',
  'Folk Acoustic Storytelling',
  'Blues Deep Emotion',
  'Funk Groove Bass',
  'Disco Dance Floor',
  'New Wave 80s Style',
  'Grunge 90s Alternative',
  'Nu Metal Modern Rock',
  'Progressive Complex Music',
  'Ambient Chill Relaxing',
  'Trap Modern Hip Hop',
  'Drill Aggressive Rap',
  'Mumble Rap Modern',
  'Conscious Rap Meaningful',
  'Battle Rap Competitive',
  'Freestyle Improvisation',
  'Beatbox Human Percussion',
  'Acapella Vocal Harmony',
  'Opera Classical Vocal',
  'Musical Theatre Broadway',
  'Soundtrack Movie Music',
  'Video Game Music',
  'Anime Opening Theme',
  'Workout Gym Music',
  'Study Focus Music',
  'Sleep Peaceful Sounds',
  'Meditation Spiritual',
  'Nature Sounds Relaxing',
  'ASMR Musical Triggers',
  'Lo-Fi Hip Hop Chill',
  'Synthwave Retro Future',
  'Vaporwave Aesthetic',
  'Phonk Underground Bass',
  'Hardstyle Festival Energy',
  'Trance Uplifting Dance',
  'Dubstep Heavy Bass',
  'Drum and Bass Fast',
  'Garage UK Underground',
  'Breakbeat Electronic',
  'Ambient Drone Experimental',
  'Noise Experimental Sound',
  'Industrial Dark Electronic',
  'Darkwave Gothic Electronic',
  'Shoegaze Dream Rock',
  'Post Rock Instrumental',
  'Math Rock Complex Time',
  'Emo Emotional Rock',
  'Screamo Intense Vocal',
  'Metalcore Heavy Breakdown',
  'Deathcore Extreme Metal',
  'Black Metal Dark Atmospheric',
  'Death Metal Technical Heavy',
  'Thrash Metal Fast Aggressive',
  'Power Metal Epic Fantasy',
  'Gothic Metal Dark Beauty',
  'Symphonic Metal Orchestra',
  'Folk Metal Cultural Fusion',
  'Viking Metal Norse Themes',
  'Pirate Metal Adventure',
  'Kawaii Metal Cute Heavy',
  'Djent Progressive Metal',
  'Stoner Rock Psychedelic',
  'Doom Metal Slow Heavy',
  'Sludge Metal Dirty Heavy',
  'Post Metal Atmospheric Heavy',
  'Blackgaze Atmospheric Black',
  'Shoegaze Metal Dreamy Heavy'
];

interface VideoResult {
  type: string;
  id: string;
  name: string;
  description: string;
  url: string;
  views: number;
  published: string;
  author: string;
  duration: string;
  thumbnail: string;
  isLive: boolean;
}

// Global cache pool
let trendingPool: VideoResult[] = [];
const searchCache: Map<string, { results: any; timestamp: number }> = new Map();
const SEARCH_CACHE_DURATION = 5 * 60 * 1000;

function setCorsHeaders(res: Response) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function sendPrettyJson(res: Response, data: any, statusCode: number = 200) {
  res.status(statusCode);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data, null, 2));
}

function formatDuration(durationValue: number | undefined): string {
  if (!durationValue || durationValue === 0) return "Live";
  
  // youtube-sr duration can be seconds or milliseconds depending on the exact result type
  let totalSeconds = durationValue;
  
  // Heuristic: If it's more than 24 hours in seconds (86400), it's likely milliseconds
  // or it's a "normal" YouTube duration that the library misreported.
  if (durationValue > 86400) {
    totalSeconds = Math.floor(durationValue / 1000);
  }

  // Final safety check: if it's still zero after conversion, return "Live"
  if (totalSeconds <= 0) return "Live";

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  if (hours > 0) {
    // Return H:MM:SS
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  // Return M:SS
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function mapVideoResult(video: any): VideoResult | null {
  // Gracefully handle missing data which often happens with age-restricted or private content
  if (!video) return null;
  
  // Basic ID check - handle object IDs or string IDs
  const id = typeof video.id === 'string' ? video.id : (video.id?.videoId || null);
  if (!id) return null;

  const isLive = video.isLive === true || video.duration === 0;
  
  return {
    type: "video",
    id: id,
    name: video.title || video.name || "Unknown Title",
    description: video.description || "",
    url: video.url || `https://www.youtube.com/watch?v=${id}`,
    views: isLive && video.live?.viewers ? video.live.viewers : (video.views || 0),
    published: isLive ? "Live now" : (video.uploadedAt || video.publishedAt || video.published || "Recently"),
    author: video.channel?.name || video.author?.name || video.author || "Unknown",
    duration: isLive ? "Live" : formatDuration(video.duration),
    thumbnail: video.thumbnail?.url || (video.thumbnails?.[0]?.url) || video.thumbnail || "",
    isLive
  };
}

async function refreshTrendingPool() {
  console.log("Refreshing trending pool starting...");
  const allCats = [...TRENDING_CATEGORIES, ...MUSIC_CATEGORIES];
  const categoryResultsMap: Record<string, VideoResult[]> = {};
  const newPool: VideoResult[] = [];

  // Shuffle and pick 30 random categories to fetch initially to avoid overloading
  const selectedToFetch = allCats.sort(() => 0.5 - Math.random()).slice(0, 40);

  // Parallelize the fetching to speed up startup
  await Promise.all(selectedToFetch.map(async (cat) => {
    try {
      const results = await YouTube.search(cat, { limit: 15, type: "video" });
      const mapped = results.map(mapVideoResult).filter((v): v is VideoResult => v !== null);
      if (mapped.length > 0) {
        categoryResultsMap[cat] = mapped;
        newPool.push(...mapped);
        console.log(`Fetched ${mapped.length} for ${cat}`);
      }
    } catch (e) {
      console.error(`Pool fetch error for ${cat}:`, e);
    }
  }));

  if (newPool.length > 0) {
    trendingPool = newPool;
    (global as any).trendingCategoryMap = categoryResultsMap;
  }
  console.log(`Pool refreshed. Total size: ${trendingPool.length}, Categories: ${Object.keys(categoryResultsMap).length}`);
}

export async function registerRoutes(httpServer: Server, app: Express) {
  // Trigger refresh immediately but don't await so server starts fast
  refreshTrendingPool();
  setInterval(refreshTrendingPool, 30 * 60 * 1000);

  app.get("/api/v1/search", async (req, res) => {
    setCorsHeaders(res);
    const query = req.query.q as string;
    if (!query) return sendPrettyJson(res, { error: "Query required" }, 400);

    const cached = searchCache.get(query);
    if (cached && Date.now() - cached.timestamp < SEARCH_CACHE_DURATION) {
      return sendPrettyJson(res, cached.results);
    }

    try {
      const results = await YouTube.search(query, { limit: 20, type: "video" });
      const mapped = results.map(mapVideoResult).filter(v => v !== null);
      searchCache.set(query, { results: mapped, timestamp: Date.now() });
      sendPrettyJson(res, mapped);
    } catch (e) {
      sendPrettyJson(res, { error: "Search failed" }, 500);
    }
  });

  app.get("/api/v1/trending", (req, res) => {
    setCorsHeaders(res);
    
    const categoryMap = (global as any).trendingCategoryMap || {};
    const categories = Object.keys(categoryMap);
    
    // We want 15-20 categories
    const countNeeded = 15;
    const response: any[] = [];

    if (categories.length > 0) {
      const selectedCats = categories.sort(() => 0.5 - Math.random()).slice(0, countNeeded);
      selectedCats.forEach((catName, index) => {
        response.push({
          category: `cat_${index + 1}`,
          categoryName: catName,
          results: categoryMap[catName].slice(0, 10)
        });
      });
    }

    // Fallback if not enough categories found in map
    if (response.length < countNeeded && trendingPool.length > 0) {
      const pool = [...trendingPool].sort(() => 0.5 - Math.random());
      const remainingCount = countNeeded - response.length;
      
      for (let i = 0; i < remainingCount; i++) {
        const results = pool.splice(0, 10);
        if (results.length > 0) {
          const usedNames = response.map(r => r.categoryName);
          const availableNames = TRENDING_CATEGORIES.filter(n => !usedNames.includes(n));
          const catName = availableNames[i % availableNames.length] || `Trending ${i + 1}`;
          
          response.push({
            category: `cat_${response.length + 1}`,
            categoryName: catName,
            results
          });
        }
      }
    }

    if (response.length === 0) {
      // Emergency fetch if somehow everything is empty
      YouTube.search(TRENDING_CATEGORIES[0], { limit: 10, type: "video" })
        .then(results => {
          const mapped = results.map(mapVideoResult).filter(v => v !== null);
          sendPrettyJson(res, mapped.length > 0 ? [{
            category: "cat_1",
            categoryName: TRENDING_CATEGORIES[0],
            results: mapped
          }] : []);
        })
        .catch(() => sendPrettyJson(res, []));
      return;
    }

    sendPrettyJson(res, response);
  });

  return httpServer;
}
