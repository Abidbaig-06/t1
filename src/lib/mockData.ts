export interface CreatorWork {
  id: string;
  title: string;
  category: 'Videos' | 'Images' | 'Animations' | 'Graphics';
  thumbnail: string;
  tag?: string;
  description?: string;
  tools?: string[];
}

export interface Creator {
  id: string;
  name: string;
  avatar: string;
  role: string;
  location: string;
  experience: string;
  verified: boolean;
  verificationStatus: 'verified' | 'pending';
  startingPrice: number;
  responseTime: string;
  availability: string;
  tools: string[];
  specialization: string;
  contentType: string;
  skills: string[];
  rating: number;
  reviewsCount: number;
  matchScore?: number;
  works: CreatorWork[];
  about: string;
  workflow: string;
  badges: string[];
}

export interface BrandBrief {
  id: string;
  brand: string;
  brandLogo?: string;
  verified: boolean;
  title: string;
  description: string;
  budget: string;
  minBudget: number;
  maxBudget: number;
  deadline: string;
  tags: string[];
  platform: string;
  duration?: string;
  commercialRights: string;
  applicantsCount?: number;
  contentType?: string;
  style?: string;
  aspectRatio?: string;
  campaignRequirements?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  creator: string;
  category: 'Videos' | 'Images' | 'Animations' | 'Graphics';
  thumbnail: string;
  views: string;
  likes: string;
  tag: string;
}

export const FEATURED_CREATORS: Creator[] = [
  {
    id: 'ava-chen',
    name: 'Ava Chen',
    avatar: '/assets/ava.jpg',
    role: 'AI Filmmaker & Commercial Director',
    location: 'New York, USA',
    experience: '5+ years',
    verified: true,
    verificationStatus: 'verified',
    startingPrice: 800,
    responseTime: '< 4 hours',
    availability: 'Available now',
    tools: ['Sora', 'Runway', 'Midjourney', 'After Effects', 'DaVinci Resolve'],
    specialization: 'Commercial Filmmaking',
    contentType: 'Video',
    skills: ['Cinematic Prompting', 'Color Grading', 'Sound Design', 'Storyboarding', 'Camera Directing'],
    rating: 4.98,
    reviewsCount: 42,
    matchScore: 98,
    about: 'Award-winning AI filmmaker specializing in luxury commercial storytelling, cinematic photorealism, and generative VFX pipelines for global brands.',
    workflow: 'Scripting & AI concept generation -> Sora & Runway video synthesis -> DaVinci color grading & spatial audio mastering.',
    badges: ['Verified Identity (Government ID)', 'Skills Verified (Portfolio review)', 'Verified Professional (Client reviews)'],
    works: [
      {
        id: 'w1',
        title: 'Ethereal - Luxury Jewelry Film',
        category: 'Videos',
        thumbnail: '/assets/ring.jpg',
        tag: 'Commercial Use ✓',
        description: 'A cinematic 30-second product film created with Sora and Runway. Full commercial rights available.',
        tools: ['Sora', 'Runway', 'DaVinci Resolve', 'After Effects'],
      },
      {
        id: 'w2',
        title: 'Cyberpunk Haute Couture',
        category: 'Images',
        thumbnail: '/assets/ava_portrait.jpg',
        tag: 'Fashion',
        description: 'High-fashion editorial campaign blending synthetic biology and neo-noir aesthetics.',
        tools: ['Midjourney v6', 'Photoshop'],
      },
      {
        id: 'w3',
        title: 'Midnight Speed - Hypercar',
        category: 'Videos',
        thumbnail: '/assets/car.jpg',
        tag: 'Automotive',
        description: 'Cinematic wet-surface automotive commercial with ray-traced reflections.',
        tools: ['Runway Gen-3', 'Unreal Engine'],
      },
    ],
  },
  {
    id: 'rohan-mehta',
    name: 'Rohan Mehta',
    avatar: '/assets/rohan.jpg',
    role: '3D & Product Visualization Specialist',
    location: 'Mumbai, India',
    experience: '4+ years',
    verified: true,
    verificationStatus: 'verified',
    startingPrice: 500,
    responseTime: '< 2 hours',
    availability: 'Available now',
    tools: ['Blender', 'Midjourney', 'Octane', 'Runway'],
    specialization: '3D & Product',
    contentType: '3D Visuals',
    skills: ['3D Modeling', 'Procedural Texturing', 'Lighting & Shading', 'Octane Rendering', 'Product Animation'],
    rating: 4.95,
    reviewsCount: 38,
    matchScore: 92,
    about: '3D artist bridging procedural CAD workflows with generative AI. Creating photorealistic luxury watch, cosmetics, and industrial visuals.',
    workflow: '3D base geometry in Blender -> Generative texturing in Midjourney -> Octane spectral rendering & post-FX.',
    badges: ['Verified Identity (Government ID)', 'Skills Verified (Portfolio review)', 'Top Rated 3D Artist'],
    works: [
      {
        id: 'w4',
        title: 'Tourbillon Chronograph Macro',
        category: 'Images',
        thumbnail: '/assets/watch.jpg',
        tag: 'Luxury 3D',
        description: 'Micro-mechanical precision render highlighting tourbillon mechanism.',
        tools: ['Blender', 'Octane', 'Photoshop'],
      },
      {
        id: 'w5',
        title: 'Lumière Nocturne Perfume',
        category: 'Images',
        thumbnail: '/assets/perfume.jpg',
        tag: 'Cosmetics',
        description: 'Atmospheric mist and studio lighting on dark cobalt glass bottle.',
        tools: ['Blender', 'Midjourney'],
      },
      {
        id: 'w6',
        title: 'Velocity Hypercar',
        category: 'Videos',
        thumbnail: '/assets/car.jpg',
        tag: 'Automotive',
        description: 'Dynamic commercial teaser for electric hypercar debut.',
        tools: ['Runway', 'Octane'],
      },
    ],
  },
  {
    id: 'maya-singh',
    name: 'Maya Singh',
    avatar: '/assets/maya.jpg',
    role: 'AI Animator & Motion Designer',
    location: 'Bengaluru, India',
    experience: '3+ years',
    verified: false,
    verificationStatus: 'pending',
    startingPrice: 650,
    responseTime: '< 4 hours',
    availability: 'Available now',
    tools: ['Runway', 'Pika', 'After Effects', 'Illustrator'],
    specialization: 'AI Animation',
    contentType: 'Animations',
    skills: ['Character Animation', 'Motion VFX', 'Kinetic Typography', 'Particle Simulation', 'Visual Storytelling'],
    rating: 4.90,
    reviewsCount: 24,
    matchScore: 88,
    about: 'Motion director creating whimsical, organic bioluminescent worlds and narrative AI animations for music videos and visionary brands.',
    workflow: 'Character illustration -> Pika motion synthesis -> Vector overlay & After Effects kinetic typography.',
    badges: ['Verification pending (Identity submitted)', 'Portfolio in Review'],
    works: [
      {
        id: 'w7',
        title: 'Spirit Forest AI Animation',
        category: 'Animations',
        thumbnail: '/assets/animation.jpg',
        tag: 'Narrative',
        description: 'Bioluminescent fantasy forest with spirit entities and fluid camera movement.',
        tools: ['Runway', 'Pika', 'After Effects'],
      },
      {
        id: 'w8',
        title: 'Lumière Mist Visuals',
        category: 'Videos',
        thumbnail: '/assets/perfume.jpg',
        tag: 'Motion',
        description: 'Atmospheric smoke fluid simulations with glowing particle streams.',
        tools: ['After Effects', 'Runway'],
      },
      {
        id: 'w9',
        title: 'Golden Ring Macro',
        category: 'Images',
        thumbnail: '/assets/ring.jpg',
        tag: 'Jewelry',
        description: 'Macro shimmer study for wedding collection.',
        tools: ['Midjourney', 'Illustrator'],
      },
    ],
  },
  {
    id: 'sara-khan',
    name: 'Sara Khan',
    avatar: '/assets/fashion.jpg',
    role: 'Digital Artist & Fashion Creator',
    location: 'London, UK',
    experience: '4+ years',
    verified: true,
    verificationStatus: 'verified',
    startingPrice: 750,
    responseTime: '< 3 hours',
    availability: 'Available now',
    tools: ['Midjourney', 'Photoshop', 'Runway', 'Magnific AI'],
    specialization: 'Fashion & Editorial',
    contentType: 'Fashion',
    skills: ['Virtual Fashion Lookbooks', 'Editorial Retouching', 'Prompt Engineering', 'Style Transfer', '8K Upscaling'],
    rating: 4.97,
    reviewsCount: 31,
    matchScore: 85,
    about: 'Editorial AI director crafting high-fashion virtual campaigns, synthetic runway lookbooks, and luxury apparel concept art.',
    workflow: 'Garment style transfer -> Generative model staging -> Magnific 8K upscaling & studio retouching.',
    badges: ['Verified Identity (Government ID)', 'Skills Verified (Portfolio review)', 'Vogue AI Featured'],
    works: [
      {
        id: 'w10',
        title: 'AI Fashion Campaign',
        category: 'Images',
        thumbnail: '/assets/fashion.jpg',
        tag: 'Editorial',
        description: 'Iridescent holographic couture dress lookbook shot in futuristic studio.',
        tools: ['Midjourney', 'Photoshop', 'Magnific AI'],
      },
      {
        id: 'w11',
        title: 'Neon Tokyo Speed',
        category: 'Videos',
        thumbnail: '/assets/car.jpg',
        tag: 'Visuals',
        description: 'Night street racing aesthetic editorial film.',
        tools: ['Runway', 'Photoshop'],
      },
      {
        id: 'w12',
        title: 'Solitaire Gold Sparkle',
        category: 'Images',
        thumbnail: '/assets/ring.jpg',
        tag: 'Jewelry',
        description: 'Studio campaign for bespoke diamond bridal collection.',
        tools: ['Midjourney'],
      },
    ],
  },
  {
    id: 'liam-park',
    name: 'Liam Park',
    avatar: '/assets/ava_portrait.jpg',
    role: 'AI Illustrator & Concept Artist',
    location: 'Seoul, South Korea',
    experience: '3+ years',
    verified: true,
    verificationStatus: 'verified',
    startingPrice: 600,
    responseTime: '< 5 hours',
    availability: 'In 2 days',
    tools: ['Midjourney', 'Stable Diffusion', 'Photoshop'],
    specialization: 'Concept Art',
    contentType: 'Graphics',
    skills: ['Concept Art', 'Matte Painting', 'SDXL LoRA Training', 'Photoshop Compositing', 'World Building'],
    rating: 4.92,
    reviewsCount: 19,
    matchScore: 81,
    about: 'Sci-fi concept artist specializing in futuristic cityscapes, vehicle design, and brand world-building visuals.',
    workflow: 'Rough sketch prompt -> SDXL LoRA refinement -> Photoshop compositing & lighting.',
    badges: ['Verified Identity (Government ID)', 'Skills Verified (Portfolio review)'],
    works: [
      {
        id: 'w13',
        title: 'Neo-Metropolis Speed',
        category: 'Graphics',
        thumbnail: '/assets/car.jpg',
        tag: 'Concept Art',
        description: 'Futuristic urban transport vehicle in nocturnal rain.',
        tools: ['Stable Diffusion', 'Photoshop'],
      },
      {
        id: 'w14',
        title: 'Enchanted Forest Lore',
        category: 'Graphics',
        thumbnail: '/assets/animation.jpg',
        tag: 'Fantasy',
        description: 'Mythical world-building concept matte painting.',
        tools: ['Midjourney', 'Photoshop'],
      },
      {
        id: 'w15',
        title: 'Chronos Precision',
        category: 'Graphics',
        thumbnail: '/assets/watch.jpg',
        tag: 'Product',
        description: 'Technical exploded view illustration.',
        tools: ['Photoshop', 'SDXL'],
      },
    ],
  },
];

export const BRAND_BRIEFS: BrandBrief[] = [
  {
    id: 'brief-1',
    brand: 'LuxeLabel',
    verified: true,
    title: '30-Second Luxury Jewelry Advertisement',
    description: 'A cinematic 30-second product film created with Sora and Runway for Instagram. Elegant, modern and luxury feel.',
    budget: '$1,500 – $3,000',
    minBudget: 1500,
    maxBudget: 3000,
    deadline: 'Jan 25, 2026',
    tags: ['Video', 'Luxury Product Focus', 'Instagram'],
    platform: 'Instagram (9:16)',
    duration: '30 seconds',
    commercialRights: 'Full Commercial Buyout included',
    applicantsCount: 14,
  },
  {
    id: 'brief-2',
    brand: 'NeonWear',
    verified: true,
    title: 'AI Fashion Campaign',
    description: 'Short-form AI videos and images for our new cyber-luxe streetwear collection.',
    budget: '$800 – $1,500',
    minBudget: 800,
    maxBudget: 1500,
    deadline: 'Jan 20, 2026',
    tags: ['Video', 'Fashion', 'Model', 'Social Media'],
    platform: 'Instagram Reels & TikTok',
    duration: '15 seconds + 5 stills',
    commercialRights: 'Digital & Social Media Rights',
    applicantsCount: 22,
  },
  {
    id: 'brief-3',
    brand: 'TerraSkincare',
    verified: true,
    title: 'Product Showcase Videos',
    description: 'Create 15–30 second AI videos highlighting organic ingredients and dew textures for our new botanical line.',
    budget: '$600 – $1,200',
    minBudget: 600,
    maxBudget: 1200,
    deadline: 'Jan 18, 2026',
    tags: ['Video', 'Product', 'Lifestyle', 'Instagram'],
    platform: 'Instagram Feed & Stories',
    duration: '20 seconds',
    commercialRights: 'Worldwide Online Rights',
    applicantsCount: 12,
  },
];

export const FEATURED_PORTFOLIOS: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'Luxury Product Film',
    creator: 'Ava Chen',
    category: 'Videos',
    thumbnail: '/assets/ring.jpg',
    views: '18.4k',
    likes: '1.2k',
    tag: 'Commercial Film',
  },
  {
    id: 'p2',
    title: 'AI Animation',
    creator: 'Maya Singh',
    category: 'Animations',
    thumbnail: '/assets/animation.jpg',
    views: '24.1k',
    likes: '2.8k',
    tag: 'Motion Art',
  },
  {
    id: 'p3',
    title: 'Product Visuals',
    creator: 'Rohan Mehta',
    category: 'Images',
    thumbnail: '/assets/perfume.jpg',
    views: '12.9k',
    likes: '980',
    tag: '3D Render',
  },
  {
    id: 'p4',
    title: 'AI Fashion Campaign',
    creator: 'Sara Khan',
    category: 'Images',
    thumbnail: '/assets/fashion.jpg',
    views: '31.2k',
    likes: '3.4k',
    tag: 'Haute Couture',
  },
];
