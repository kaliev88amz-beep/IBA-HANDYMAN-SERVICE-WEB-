/**
 * TV mounting prices (labor) and the price quiz. Single source for the TV page,
 * the home page price card, the FAQ and the AI helper.
 * Every TV in an order gets the same options; multi-TV discounts apply to the total.
 */

export type TvQuizKey = 'count' | 'size' | 'wall' | 'mount' | 'wires';

export interface TvQuizOption {
  id: string;
  labelEn: string;
  labelRu: string;
  /** Per-TV price added by this option (dollars). */
  add?: number;
  /** Price is confirmed by the owner (photos / visit). */
  quote?: boolean;
  hintEn?: string;
  hintRu?: string;
}

export interface TvQuizStep {
  key: TvQuizKey;
  titleEn: string;
  titleRu: string;
  options: TvQuizOption[];
}

/** Small TVs cost less when mounted together with another TV. */
export const SMALL_TV_WITH_ANOTHER = 69;

export const TV_SIZE_PRICES = {
  s: 99, // up to 32"
  m: 150, // 33"–64"
  l: 175, // 65"–75"
  xl: 220, // 76"+ (two technicians), starting price
} as const;

export const MULTI_TV_DISCOUNT: Record<number, number> = { 1: 0, 2: 0.1, 3: 0.15, 4: 0.2 };

export const TV_ADDONS = {
  fireplace: 99,
  brickStone: 69,
  fixedMount: 49,
  tiltingMount: 59,
  fullMotionMount: 89,
  cordCover: 49,
  inWallWires: 95,
};

export const TV_QUIZ_STEPS: TvQuizStep[] = [
  {
    key: 'count',
    titleEn: 'How many TVs?',
    titleRu: 'Сколько телевизоров?',
    options: [
      { id: '1', labelEn: '1 TV', labelRu: '1 ТВ', hintEn: `from $${TV_SIZE_PRICES.s}`, hintRu: `от $${TV_SIZE_PRICES.s}` },
      { id: '2', labelEn: '2 TVs', labelRu: '2 ТВ', hintEn: 'save 10%', hintRu: 'скидка 10%' },
      { id: '3', labelEn: '3 TVs', labelRu: '3 ТВ', hintEn: 'save 15%', hintRu: 'скидка 15%' },
      { id: '4', labelEn: '4+ TVs', labelRu: '4+ ТВ', hintEn: 'save 20%', hintRu: 'скидка 20%' },
    ],
  },
  {
    key: 'size',
    titleEn: 'TV size?',
    titleRu: 'Размер телевизора?',
    options: [
      { id: 's', labelEn: 'Up to 32"', labelRu: 'До 32"', hintEn: `$${TV_SIZE_PRICES.s} · $${SMALL_TV_WITH_ANOTHER} with another TV`, hintRu: `$${TV_SIZE_PRICES.s} · $${SMALL_TV_WITH_ANOTHER} вместе с другим ТВ` },
      { id: 'm', labelEn: '33"–64"', labelRu: '33"–64"', hintEn: `$${TV_SIZE_PRICES.m}`, hintRu: `$${TV_SIZE_PRICES.m}` },
      { id: 'l', labelEn: '65"–75"', labelRu: '65"–75"', hintEn: `$${TV_SIZE_PRICES.l}`, hintRu: `$${TV_SIZE_PRICES.l}` },
      { id: 'xl', labelEn: '76" or bigger', labelRu: '76" и больше', hintEn: `from $${TV_SIZE_PRICES.xl}`, hintRu: `от $${TV_SIZE_PRICES.xl}`, quote: true },
    ],
  },
  {
    key: 'wall',
    titleEn: 'Where does it go?',
    titleRu: 'Куда вешаем?',
    options: [
      { id: 'drywall', labelEn: 'Regular wall (drywall)', labelRu: 'Обычная стена (гипсокартон)', hintEn: '+$0', hintRu: '+$0' },
      { id: 'fireplace', labelEn: 'Above fireplace', labelRu: 'Над камином', add: TV_ADDONS.fireplace, hintEn: `+$${TV_ADDONS.fireplace}`, hintRu: `+$${TV_ADDONS.fireplace}` },
      { id: 'brick', labelEn: 'Brick or stone', labelRu: 'Кирпич или камень', add: TV_ADDONS.brickStone, hintEn: `+$${TV_ADDONS.brickStone}`, hintRu: `+$${TV_ADDONS.brickStone}` },
      { id: 'unsure', labelEn: 'Not sure', labelRu: 'Не знаю', quote: true, hintEn: "we'll check", hintRu: 'уточним' },
    ],
  },
  {
    key: 'mount',
    titleEn: 'Do you have a mount?',
    titleRu: 'Есть кронштейн?',
    options: [
      { id: 'own', labelEn: 'Yes, I have one', labelRu: 'Да, есть свой', hintEn: '+$0', hintRu: '+$0' },
      { id: 'fixed', labelEn: 'Fixed', labelRu: 'Фиксированный', add: TV_ADDONS.fixedMount, hintEn: `+$${TV_ADDONS.fixedMount}`, hintRu: `+$${TV_ADDONS.fixedMount}` },
      { id: 'tilting', labelEn: 'Tilting', labelRu: 'Наклонный', add: TV_ADDONS.tiltingMount, hintEn: `+$${TV_ADDONS.tiltingMount}`, hintRu: `+$${TV_ADDONS.tiltingMount}` },
      { id: 'full', labelEn: 'Full-motion', labelRu: 'Поворотный', add: TV_ADDONS.fullMotionMount, hintEn: `+$${TV_ADDONS.fullMotionMount}`, hintRu: `+$${TV_ADDONS.fullMotionMount}` },
      { id: 'pulldown', labelEn: 'Fireplace pull-down', labelRu: 'Опускаемый над камином', quote: true, hintEn: 'quote', hintRu: 'по запросу' },
      { id: 'help', labelEn: 'Help me choose', labelRu: 'Помогите выбрать', quote: true, hintEn: "we'll advise", hintRu: 'подскажем' },
    ],
  },
  {
    key: 'wires',
    titleEn: 'What about the wires?',
    titleRu: 'Что с проводами?',
    options: [
      { id: 'visible', labelEn: 'Leave them', labelRu: 'Оставить как есть', hintEn: '+$0', hintRu: '+$0' },
      { id: 'cover', labelEn: 'Cord cover on wall', labelRu: 'Короб на стене', add: TV_ADDONS.cordCover, hintEn: `+$${TV_ADDONS.cordCover}`, hintRu: `+$${TV_ADDONS.cordCover}` },
      { id: 'inwall', labelEn: 'Hide inside wall', labelRu: 'Спрятать в стену', add: TV_ADDONS.inWallWires, hintEn: `+$${TV_ADDONS.inWallWires}`, hintRu: `+$${TV_ADDONS.inWallWires}` },
      { id: 'unsure', labelEn: 'Not sure', labelRu: 'Не знаю', quote: true, hintEn: "we'll advise", hintRu: 'подскажем' },
    ],
  },
];

export type TvQuizAnswers = Partial<Record<TvQuizKey, string>>;

export interface TvEstimate {
  tvCount: number;
  perTv: number;
  discountRate: number;
  total: number;
  /** Some choices need the owner's confirmation; the total is a starting price. */
  hasQuoteItems: boolean;
}

export const estimateTvJob = (answers: TvQuizAnswers): TvEstimate => {
  const tvCount = Number(answers.count) || 1;
  let perTv: number;
  if (answers.size === 's' || !answers.size) {
    perTv = tvCount > 1 ? SMALL_TV_WITH_ANOTHER : TV_SIZE_PRICES.s;
  } else {
    perTv = TV_SIZE_PRICES[answers.size as keyof typeof TV_SIZE_PRICES];
  }
  let hasQuoteItems = false;
  for (const step of TV_QUIZ_STEPS) {
    const option = step.options.find(o => o.id === answers[step.key]);
    if (option?.add) perTv += option.add;
    if (option?.quote) hasQuoteItems = true;
  }
  const discountRate = MULTI_TV_DISCOUNT[Math.min(tvCount, 4)] ?? 0;
  return { tvCount, perTv, discountRate, total: Math.round(perTv * tvCount * (1 - discountRate)), hasQuoteItems };
};

/** Readable answer list for emails and messages. */
export const describeTvAnswers = (answers: TvQuizAnswers, ru = false): string[] =>
  TV_QUIZ_STEPS.filter(s => answers[s.key]).map(s => {
    const o = s.options.find(x => x.id === answers[s.key])!;
    return `${ru ? s.titleRu : s.titleEn} ${ru ? o.labelRu : o.labelEn}`;
  });

/** Plain-text price list for the AI helper. */
export const TV_PRICES_TEXT = [
  `Labor per TV by size: up to 32" $${TV_SIZE_PRICES.s} ($${SMALL_TV_WITH_ANOTHER} when mounted with another TV); 33"-64" $${TV_SIZE_PRICES.m}; 65"-75" $${TV_SIZE_PRICES.l}; 76"+ from $${TV_SIZE_PRICES.xl} (two technicians).`,
  `Add-ons per TV: above fireplace +$${TV_ADDONS.fireplace}; brick or stone wall +$${TV_ADDONS.brickStone}.`,
  `Mount supplied by us: fixed +$${TV_ADDONS.fixedMount}, tilting +$${TV_ADDONS.tiltingMount}, full-motion +$${TV_ADDONS.fullMotionMount}; fireplace pull-down mount: quote. Customer's own mount: no extra charge.`,
  `Wires: cord cover on wall +$${TV_ADDONS.cordCover}; hide inside wall +$${TV_ADDONS.inWallWires}.`,
  'Multi-TV discount on the total: 2 TVs 10%, 3 TVs 15%, 4+ TVs 20%.',
].join('\n');
