export interface AssessmentOption {
  value: string
  label: string
}

export interface AssessmentQuestion {
  id: string
  question: string
  options: AssessmentOption[]
}

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'concern',
    question: 'What is your primary concern?',
    options: [
      { value: 'fine-lines', label: 'Fine Lines & Wrinkles' },
      { value: 'laxity', label: 'Skin Laxity' },
      { value: 'tone', label: 'Uneven Skin Tone' },
      { value: 'sun-damage', label: 'Sun Damage' },
      { value: 'volume', label: 'Volume Loss' },
      { value: 'acne-scarring', label: 'Acne Scarring' },
    ],
  },
  {
    id: 'skin-type',
    question: 'How would you describe your skin?',
    options: [
      { value: 'dry', label: 'Dry' },
      { value: 'combination', label: 'Combination' },
      { value: 'oily', label: 'Oily' },
      { value: 'sensitive', label: 'Sensitive' },
      { value: 'normal', label: 'Normal' },
    ],
  },
  {
    id: 'age',
    question: 'What is your age range?',
    options: [
      { value: '25-34', label: '25-34' },
      { value: '35-44', label: '35-44' },
      { value: '45-54', label: '45-54' },
      { value: '55-64', label: '55-64' },
      { value: '65+', label: '65+' },
    ],
  },
  {
    id: 'goal',
    question: 'What type of result are you hoping for?',
    options: [
      { value: 'smoother', label: 'Smoother Skin' },
      { value: 'brighter', label: 'Brighter Complexion' },
      { value: 'defined', label: 'More Defined Features' },
      { value: 'younger', label: 'Younger Appearance' },
      { value: 'refresh', label: 'Natural Refresh' },
    ],
  },
  {
    id: 'timeline',
    question: 'How soon are you hoping to see results?',
    options: [
      { value: 'asap', label: 'As Soon As Possible' },
      { value: '1-3-months', label: 'Within 1-3 Months' },
      { value: 'exploring', label: "I'm Exploring Options" },
    ],
  },
]

export interface TreatmentRecommendation {
  name: string
  explanation: string
}

export interface AssessmentResult {
  primary: TreatmentRecommendation
  match: number
  secondary: TreatmentRecommendation
}

const TREATMENTS: Record<string, string> = {
  botox: 'Botox & Wrinkle Relaxers',
  fillers: 'Dermal Fillers',
  microneedling: 'Microneedling',
  ipl: 'IPL Photofacial',
  laser: 'Laser Resurfacing',
  hydrafacial: 'HydraFacial',
}

const PRIMARY_EXPLANATIONS: Record<string, string> = {
  botox:
    'A precise, physician-administered relaxer that softens dynamic lines while keeping your expressions natural and unmistakably you.',
  fillers:
    'Carefully placed to restore lost volume and refine facial balance, delivering a refreshed look that still looks entirely like you.',
  microneedling:
    'Stimulates your skin’s own collagen to smooth texture and improve firmness gradually, with results that build naturally over time.',
  ipl: 'Targets sun damage and uneven pigmentation to reveal a clearer, brighter, and more even complexion.',
  laser:
    'Resurfaces the skin to refine texture, tone, and quality, addressing deeper concerns with controlled, lasting results.',
  hydrafacial:
    'A deeply nourishing treatment that cleanses, exfoliates, and hydrates for an immediate, luminous glow.',
}

const SECONDARY_EXPLANATIONS: Record<string, string> = {
  hydrafacial:
    'Pairs beautifully with your primary treatment to deepen hydration and amplify your natural radiance.',
  microneedling:
    'Supports long-term skin quality by encouraging collagen renewal alongside your primary plan.',
  ipl: 'Refines tone and clarity to complement and enhance your overall results.',
  fillers:
    'Adds subtle balance and definition to round out a complete, harmonious result.',
}

/**
 * Deterministic recommendation logic. Primary treatment is driven by the
 * primary concern (Q1) and refined by skin type (Q2) and goal (Q4). The
 * confidence match is derived from how cohesively the answers align,
 * staying within an 88–97 range.
 */
export function getRecommendation(
  answers: Record<string, string>,
): AssessmentResult {
  const concern = answers['concern']
  const goal = answers['goal']
  const skin = answers['skin-type']

  let primaryKey = 'hydrafacial'
  switch (concern) {
    case 'fine-lines':
      primaryKey = 'botox'
      break
    case 'laxity':
      primaryKey = 'microneedling'
      break
    case 'tone':
      primaryKey = 'ipl'
      break
    case 'sun-damage':
      primaryKey = 'ipl'
      break
    case 'volume':
      primaryKey = 'fillers'
      break
    case 'acne-scarring':
      primaryKey = 'microneedling'
      break
  }

  // Goal can refine the primary recommendation.
  if (goal === 'defined' && concern !== 'fine-lines') primaryKey = 'fillers'
  if (goal === 'brighter' && concern !== 'volume') primaryKey = 'ipl'

  // Secondary recommendation: complementary treatment.
  let secondaryKey = 'hydrafacial'
  if (primaryKey === 'hydrafacial') secondaryKey = 'microneedling'
  else if (primaryKey === 'ipl') secondaryKey = 'hydrafacial'
  else if (primaryKey === 'microneedling') secondaryKey = 'ipl'
  else if (primaryKey === 'botox') secondaryKey = 'hydrafacial'
  else if (primaryKey === 'fillers') secondaryKey = 'microneedling'

  // Confidence: 88 base, rewarded for aligned goal + defined skin type.
  let match = 88
  if (goal) match += 4
  if (skin && skin !== 'sensitive') match += 3
  if (concern) match += 2
  match = Math.min(97, match)

  return {
    primary: {
      name: TREATMENTS[primaryKey],
      explanation: PRIMARY_EXPLANATIONS[primaryKey],
    },
    match,
    secondary: {
      name: TREATMENTS[secondaryKey],
      explanation:
        SECONDARY_EXPLANATIONS[secondaryKey] ??
        'A thoughtful complement to enhance and extend your results.',
    },
  }
}

export const loadingMessages = [
  'Analyzing Your Responses…',
  'Creating Your Personalized Treatment Plan…',
  'Preparing Your Recommendations…',
]
