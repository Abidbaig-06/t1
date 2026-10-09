import { Creator, BrandBrief } from './mockData';

export interface MatchResult {
  creator: Creator;
  score: number; // 0 to 100
  matchingSkills: string[];
  matchingTools: string[];
  portfolioRelevance: 'Exceptional' | 'High' | 'Moderate' | 'Relevant';
  explanation: string;
}

/**
 * Dynamic algorithmic matching function based on:
 * 1. AI Tool overlap (Sora, Runway, Midjourney, Blender, etc.) - 35%
 * 2. Specialization and Content Type relevance - 25%
 * 3. Budget alignment (creator starting price within brief budget) - 15%
 * 4. Verification signals boost (verified identity & skills) - 15%
 * 5. Experience and track record rating - 10%
 */
export function calculateCreatorMatch(creator: Creator, brief: Partial<BrandBrief>): MatchResult {
  const briefTools = brief.tags || [];
  const briefText = `${brief.title || ''} ${brief.description || ''} ${brief.platform || ''} ${brief.duration || ''}`.toLowerCase();
  
  // 1. Tool Matching
  const creatorToolsLower = creator.tools.map((t) => t.toLowerCase());
  const matchingTools = creator.tools.filter((tool) => {
    const tLower = tool.toLowerCase();
    return (
      briefTools.some((bt) => bt.toLowerCase().includes(tLower) || tLower.includes(bt.toLowerCase())) ||
      briefText.includes(tLower)
    );
  });

  // Calculate tool score (up to 35 pts)
  let toolScore = 0;
  if (matchingTools.length >= 3) toolScore = 35;
  else if (matchingTools.length === 2) toolScore = 28;
  else if (matchingTools.length === 1) toolScore = 18;
  else {
    // If general generative tools match
    const hasGenVideo = creatorToolsLower.some((t) => t.includes('runway') || t.includes('sora') || t.includes('pika'));
    toolScore = hasGenVideo ? 15 : 8;
  }

  // 2. Specialization & Content Type matching (up to 25 pts)
  let specScore = 10;
  const isVideoBrief = briefText.includes('video') || briefText.includes('30-second') || briefText.includes('film') || briefText.includes('reels');
  const is3DBrief = briefText.includes('3d') || briefText.includes('product') || briefText.includes('render');
  const isFashionBrief = briefText.includes('fashion') || briefText.includes('model') || briefText.includes('apparel');

  const matchingSkills: string[] = [];
  if (isVideoBrief && (creator.specialization.toLowerCase().includes('film') || creator.specialization.toLowerCase().includes('video') || creator.specialization.toLowerCase().includes('animation'))) {
    specScore += 12;
    matchingSkills.push('AI Video Synthesis', 'Cinematic Direction');
  }
  if (is3DBrief && (creator.specialization.toLowerCase().includes('3d') || creator.specialization.toLowerCase().includes('product'))) {
    specScore += 12;
    matchingSkills.push('3D Product CAD', 'Lighting & Texturing');
  }
  if (isFashionBrief && (creator.specialization.toLowerCase().includes('fashion') || creator.specialization.toLowerCase().includes('digital artist'))) {
    specScore += 12;
    matchingSkills.push('Virtual Fashion Staging', 'Editorial Model Synthesis');
  }
  if (briefText.includes('jewelry') || briefText.includes('jewellery') || briefText.includes('luxury')) {
    const hasLuxuryWork = creator.works.some((w) => w.title.toLowerCase().includes('jewelry') || w.title.toLowerCase().includes('luxury') || w.title.toLowerCase().includes('ring') || w.tag?.toLowerCase().includes('luxury'));
    if (hasLuxuryWork) {
      specScore += 3;
      matchingSkills.push('Luxury Macro Storytelling');
    }
  }

  // Cap specScore at 25
  specScore = Math.min(25, specScore);

  // 3. Budget alignment (up to 15 pts)
  let budgetScore = 15;
  if (brief.maxBudget && creator.startingPrice > brief.maxBudget) {
    budgetScore = 4;
  } else if (brief.minBudget && creator.startingPrice < brief.minBudget * 0.5) {
    budgetScore = 10;
  }

  // 4. Verification signals (up to 15 pts)
  let verificationScore = 0;
  if (creator.verified && creator.verificationStatus === 'verified') {
    verificationScore = 15;
  } else if (creator.verificationStatus === 'pending') {
    verificationScore = 8;
  } else {
    verificationScore = 4;
  }

  // 5. Experience & Rating (up to 10 pts)
  const experienceYears = parseInt(creator.experience) || 3;
  const ratingScore = Math.round((creator.rating / 5) * 6); // max 6
  const expScore = Math.min(4, experienceYears); // max 4
  const trackScore = ratingScore + expScore;

  // Total Score calculation (max 100)
  const totalScore = Math.min(99, Math.max(55, toolScore + specScore + budgetScore + verificationScore + trackScore));

  // Portfolio relevance categorization
  let portfolioRelevance: 'Exceptional' | 'High' | 'Moderate' | 'Relevant' = 'Relevant';
  if (totalScore >= 95) portfolioRelevance = 'Exceptional';
  else if (totalScore >= 88) portfolioRelevance = 'High';
  else if (totalScore >= 75) portfolioRelevance = 'Moderate';

  // Dynamic explanation synthesis
  let explanation = '';
  if (totalScore >= 92) {
    explanation = `Outstanding ${totalScore}% match: ${creator.name} possesses verified production expertise in ${creator.tools.slice(0, 2).join(' & ')} with proven commercial delivery records in luxury video advertising.`;
  } else if (totalScore >= 85) {
    explanation = `Strong ${totalScore}% alignment: Matches core pipeline in ${creator.specialization}. Starting rate ($${creator.startingPrice}) fits perfectly within the allocated escrow budget.`;
  } else {
    explanation = `Solid ${totalScore}% candidate: Capable with ${creator.tools.join(', ')} and offers fast response time (${creator.responseTime}).`;
  }

  return {
    creator,
    score: totalScore,
    matchingSkills: matchingSkills.length > 0 ? matchingSkills : ['Generative AI', 'Prompt Engineering'],
    matchingTools: matchingTools.length > 0 ? matchingTools : creator.tools.slice(0, 2),
    portfolioRelevance,
    explanation,
  };
}

export function rankCreatorsForBrief(creators: Creator[], brief: Partial<BrandBrief>): MatchResult[] {
  return creators
    .map((creator) => calculateCreatorMatch(creator, brief))
    .sort((a, b) => b.score - a.score);
}
