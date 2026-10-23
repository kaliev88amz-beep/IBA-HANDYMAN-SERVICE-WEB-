import { PricingConfig, HandymanServiceItem, FaqItem, WorkShowcaseItem } from '../types';

export const INITIAL_PRICING_CONFIG: PricingConfig = {
  minimumOrder: 99,
  tvSizes: {
    '32-43': { label: '32" - 43"', price: 129 },
    '44-55': { label: '44" - 55"', price: 129 },
    '56-65': { label: '56" - 65"', price: 149 },
    '66-75': { label: '66" - 75"', price: 169 },
    '76+': { label: '76"+ (Extra large / Heavy)', price: 199 },
  },
  wallMaterials: {
    drywall: { nameEn: 'Drywall (standard studs)', nameRu: 'Гипсокартон (стандартные стойки)', surcharge: 0 },
    brick: { nameEn: 'Exposed Brick', nameRu: 'Кирпичная стена', surcharge: 45 },
    concrete: { nameEn: 'Solid Concrete / Cinder block', nameRu: 'Бетон / шлакоблок', surcharge: 50 },
    tile: { nameEn: 'Ceramic / Porcelain Tile', nameRu: 'Керамическая плитка', surcharge: 55 },
    stone: { nameEn: 'Natural / Decorative Stone', nameRu: 'Натуральный / искусственный камень', surcharge: 70 },
    unknown: { nameEn: 'Unknown / Needs inspection', nameRu: 'Не знаю / требуется осмотр', surcharge: null, customQuote: true },
  },
  fireplaceSurcharge: 100, // $129 + $100 = $229 as on banner
  mounts: {
    customerProvided: 0,
    fixedMountProvided: 20,
    tiltingMountProvided: 20, // $129 + $20 = $149 as on banner
    fullMotionMountProvided: 60, // $129 + $60 = $189 as on banner
  },
  wireManagement: {
    none: 0,
    raceway: 45, // Paintable external surface raceway
    inWallLowVoltage: 99, // In-wall wire concealment ($99 on banner)
  },
  addOns: {
    soundbar: 79, // $79 on banner
    floatingShelf: 45,
  },
};

export const HANDYMAN_SERVICES: HandymanServiceItem[] = [
  {
    id: 'tv-mounting',
    titleEn: 'TV Mounting & Setup',
    titleRu: 'Монтаж телевизоров и настройка',
    shortDescEn: 'Secure mounting on drywall, brick, tile or above fireplaces with clean cable management.',
    shortDescRu: 'Надёжный монтаж на гипсокартон, кирпич, плитку или над камином с аккуратной укладкой проводов.',
    featuresEn: [
      'Sizes from 32" to 85"+',
      'All wall types: Drywall, brick, stone, tile',
      'Surface raceway or in-wall low-voltage routing',
      'Leveling, stud scanning & hardware supplied'
    ],
    featuresRu: [
      'Диагонали от 32" до 85"+',
      'Любые стены: гипсокартон, кирпич, плитка, камень',
      'Внешний кабель-канал или скрытая проводка сигнальных кабелей',
      'Поиск стоек, выравнивание по уровню, качественный крепёж'
    ],
    demoPriceGuideEn: 'From $99 · instant price quiz',
    demoPriceGuideRu: 'От $99 · расчёт цены онлайн',
    iconName: 'Tv',
  },
  {
    id: 'furniture-assembly',
    titleEn: 'Furniture Assembly',
    titleRu: 'Сборка мебели',
    shortDescEn: 'Expert assembly of IKEA, Wayfair, Amazon, bed frames, dressers, desks, and dining sets.',
    shortDescRu: 'Сборка мебели из IKEA, Wayfair, Amazon: кровати, шкафы, комоды, столы и гарнитуры.',
    featuresEn: [
      'Bed frames, dressers, wardrobes',
      'Desks, gaming setups, office chairs',
      'Outdoor patio sets & gazebos',
      'Wall anchoring for anti-tip child safety'
    ],
    featuresRu: [
      'Кровати, комоды, шкафы',
      'Письменные столы, офисная и игровая мебель',
      'Садовая мебель для патио',
      'Фиксация к стене для защиты детей от опрокидывания'
    ],
    demoPriceGuideEn: 'From $80',
    demoPriceGuideRu: 'От $80',
    iconName: 'Armchair',
  },
  {
    id: 'drywall-repair',
    titleEn: 'Drywall Repair & Patching',
    titleRu: 'Ремонт гипсокартона и шпаклёвка',
    shortDescEn: 'Fix holes, cracks, doorknob punctures, water spots, and blend textures ready for paint.',
    shortDescRu: 'Устранение дыр от дверных ручек, трещин, следов протечек и текстурирование под покраску.',
    featuresEn: [
      'Hole patching up to 12"x12"',
      'Doorknob dent & stress crack fixes',
      'Smooth or orange peel texture matching',
      'Dust-controlled sanding & prep'
    ],
    featuresRu: [
      'Заделка отверстий до 30х30 см',
      'Следы от ручек дверей и усадочные трещины',
      'Восстановление текстуры (гладкая, orange peel)',
      'Аккуратное шлифование без лишней пыли'
    ],
    demoPriceGuideEn: 'From $90',
    demoPriceGuideRu: 'От $90',
    iconName: 'Hammer',
  },
  {
    id: 'interior-painting',
    titleEn: 'Interior Touch-up & Accent Walls',
    titleRu: 'Интерьерная покраска и акцентные стены',
    shortDescEn: 'Accent walls, room refreshing, trim & baseboard touch-ups, door repainting.',
    shortDescRu: 'Покраска акцентных стен, комнат, плинтусов, наличников и межкомнатных дверей.',
    featuresEn: [
      'Accent walls & single rooms',
      'Baseboards, door casings & trim',
      'Clean lines with painter tape prep',
      'Furniture & floor tarp protection'
    ],
    featuresRu: [
      'Акцентные стены и отдельные комнаты',
      'Плинтуса, наличники и откосы',
      'Идеально ровные линии и малярная лента',
      'Защита мебели и полов плёнкой'
    ],
    demoPriceGuideEn: 'From $120',
    demoPriceGuideRu: 'От $120',
    iconName: 'Paintbrush',
  },
  {
    id: 'shelves-curtains-blinds',
    titleEn: 'Shelves, Curtain Rods & Blinds',
    titleRu: 'Полки, карнизы и жалюзи',
    shortDescEn: 'Laser-level mounting of floating shelves, heavy mirrors, curtain rods, and window blinds.',
    shortDescRu: 'Установка плавающих полок по лазерному уровню, тяжёлых зеркал, карнизов и жалюзи.',
    featuresEn: [
      'Floating shelves & heavy wall decor',
      'Curtain rods & drapery hardware',
      'Horizontal & roller window blinds',
      'Heavy mirror & gallery picture hanging'
    ],
    featuresRu: [
      'Плавающие полки и настенный декор',
      'Карнизы для штор и портьер',
      'Горизонтальные и рулонные жалюзи',
      'Тяжёлые зеркала и развеска картин'
    ],
    demoPriceGuideEn: 'From $75',
    demoPriceGuideRu: 'От $75',
    iconName: 'Ruler',
  },
  {
    id: 'other-handyman',
    titleEn: 'Other Handyman Projects',
    titleRu: 'Другие мелкие бытовые работы',
    shortDescEn: 'Door handle swaps, smoke detector battery replacement, weatherstripping, small fixes.',
    shortDescRu: 'Замена дверных ручек, датчиков дыма, уплотнителей дверей и мелкий ремонт по дому.',
    featuresEn: [
      'Door locks, deadbolts & smart locks',
      'Cabinet hardware & hinges adjustment',
      'Smoke detector battery / replacement',
      'Weatherstripping & draft insulation'
    ],
    featuresRu: [
      'Дверные замки и ручки',
      'Регулировка петель и мебельных фасадов',
      'Замена батареек и датчиков дыма',
      'Уплотнение окон и входных дверей'
    ],
    demoPriceGuideEn: 'Custom quote required',
    demoPriceGuideRu: 'Индивидуальная оценка',
    iconName: 'Wrench',
    isCustomOnly: true,
  },
];

export const SERVICE_AREAS = [
  { city: 'Raleigh', county: 'Wake', primary: true, sampleZips: ['27601', '27603', '27607', '27609', '27612', '27613', '27615', '27617'] },
  { city: 'Cary', county: 'Wake', primary: true, sampleZips: ['27511', '27513', '27518', '27519'] },
  { city: 'Apex', county: 'Wake', primary: true, sampleZips: ['27502', '27523', '27539'] },
  { city: 'Durham', county: 'Durham', primary: true, sampleZips: ['27701', '27705', '27707', '27713'] },
  { city: 'Chapel Hill', county: 'Orange', primary: true, sampleZips: ['27514', '27516', '27517'] },
  { city: 'Wake Forest', county: 'Wake', primary: true, sampleZips: ['27587', '27588'] },
  { city: 'Clayton', county: 'Johnston', primary: false, sampleZips: ['27520', '27527'] },
  { city: 'Knightdale', county: 'Wake', primary: false, sampleZips: ['27545'] },
  { city: 'Hillsborough', county: 'Orange', primary: false, sampleZips: ['27278'] },
];

/**
 * Office location for the Service Area map.
 * Leave officeAddress empty until the office opens; the map then shows the Raleigh service zone.
 * Once set (e.g. '123 Main St, Raleigh, NC 27601'), the map pins the office and a
 * "Get Directions" button opens Google Maps with a route to it.
 */
/** Social media profiles (shown in the footer, contact section and Our Work). Leave empty to hide. */
export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/profile.php?id=61558158815982',
  instagram: 'https://www.instagram.com/iba_handyman_services/',
  instagramHandle: '@iba_handyman_services',
  thumbtack: 'https://www.thumbtack.com/nc/raleigh/furniture-assembly/iba-handyman-services/service/510032879357419534',
  google: 'https://www.google.com/maps?cid=16603545639945974732',
  // Direct "write a review" link from Google Business ("Ask for reviews"); falls back to the profile link
  googleReview: '',
};

/**
 * Thumbtack profile stats shown on the site. Update by hand when the profile changes
 * (last checked 2026-10-12).
 */
export const THUMBTACK_STATS = {
  rating: 4.9,
  reviewCount: 58,
  hires: 138,
  topPro: true,
  backgroundChecked: true,
};

/**
 * Customer reviews displayed on the site. Add only reviews the owner chose to feature,
 * keeping the customer's first name + last initial and linking back to Thumbtack.
 */
export const FEATURED_REVIEWS: {
  name: string;
  date: string;
  service: string;
  rating: number;
  text: string;
}[] = [
  {
    name: 'Shannon S.',
    date: 'Sep 7, 2026',
    service: 'Interior Painting',
    rating: 5,
    text: "I couldn't be happier with how my ceiling turned out! The guys did an absolutely amazing job. They were professional, meticulous, and clearly took pride in their work. The finished ceiling looks incredibly smooth and clean, and the difference it made in the room is huge. They also kept everything neat throughout the process and left the space looking great when they were finished. I really appreciate the quality of their work and attention to detail. I would absolutely recommend them to anyone and will definitely use them again for future projects!",
  },
  {
    name: 'Jennifer Z.',
    date: 'Dec 29, 2025',
    service: 'Fireplace TV Mounting',
    rating: 5,
    text: 'Excellent work on a tricky fireplace TV mount! Arrived on time, reviewed job details and placement before starting. Took care to minimize dust spread during drilling and removed shoes on entering the house. The care is greatly appreciated!',
  },
  {
    name: 'Ravi N.',
    date: 'Jul 24, 2026',
    service: 'Gazebo Installation',
    rating: 5,
    text: 'I could not be more happy with them, showed up on time, communicated very well prior to appointment and did the job with no fuss or muss. They installed our 24×14 Gazebo in about 7 hours and did a fantastic job - very knowledgeable handyman. I would highly recommend him and will be using him for other jobs',
  },
  {
    name: 'Colleen R.',
    date: 'Apr 15, 2026',
    service: 'Furniture Assembly',
    rating: 5,
    text: 'This was a great experience from start to finish! Aibek was extremely professional, and he was right on time. Also, the finished product was beautifully and solidly put together! I am so happy to have gone through Thumbtack. Will definitely recommend in the future and I will return for any projects needed!!!!',
  },
  {
    name: 'Derek C.',
    date: 'Nov 24, 2025',
    service: 'Drywall Repair',
    rating: 5,
    text: 'Iba was a very nice and professional handyman. As you can see from the pictures, his work is outstanding. Made it look like there was never a hole in the ceiling. He was respectful of my property. The only issue was sanding left a lot of dust in my kitchen. He swept up as much as he could. The price was fair and he was quick in responding and scheduling an appointment. I will be using him again.',
  },
  {
    name: 'Patricia C.',
    date: 'Jun 21, 2026',
    service: 'Picture Hanging',
    rating: 5,
    text: 'Aibek arrived with a comprehensive tool kit to hang about 15 pictures after we moved into our new home. He used provided French cleats for the larger pieces which requires more skill. I would use Aibek again.',
  },
  {
    name: 'Scot L.',
    date: 'Apr 1, 2026',
    service: 'TV Mounting',
    rating: 5,
    text: 'The technician was prompt and attentive to what I wanted done. He finished quickly and cleaned up any mess that resulted from the installation.',
  },
  {
    name: 'Debra B.',
    date: 'May 10, 2026',
    service: 'Fence Repair',
    rating: 5,
    text: 'He did a fantastic job on fence repair. Very responsive and fast to get the work done. I would definitely recommend him and would use him again!',
  },
  {
    name: 'Brittany M.',
    date: 'Nov 29, 2025',
    service: 'Window Installation',
    rating: 5,
    text: "He did a great job on my window today! Super professional, on time, and he worked with me to meet my budget, which I really appreciated. Only thing is he sent me to Lowe's for something I was so confused about 😂 but overall he got the job done and everything looks great. Would definitely recommend!",
  },
  {
    name: 'Gayle S.',
    date: 'May 20, 2025',
    service: 'Painting',
    rating: 5,
    text: 'IBA worked hard all day and did a beautiful job of painting our shutters and inside/outside front and back doors. He cleaned, sanded and painted. Our house looked like a new house when he finished. He was quiet, respectful, professional but friendly, and courteous. I would recommend him without reservation.',
  },
];

/**
 * Web3Forms access key: booking requests from the contact form are emailed to the address
 * this key was created for (get one free at https://web3forms.com). The key is meant to be public.
 */
export const WEB3FORMS_ACCESS_KEY = 'd57d2717-2375-4154-9bd5-7d1aed9c4ac1';

/** Show the in-browser "CRM Demo" owner panel links (header, mobile menu, footer). Hidden on the live site. */
export const SHOW_OWNER_CRM = false;

/** WhatsApp number in international format, digits only (country code 1 + area code + number). */
export const WHATSAPP_NUMBER = '19192646101';

/** Number for "Text us" (SMS) links and replies to helper leads, in +1 format. */
export const TEXT_NUMBER = '+19192646101';

/** Facebook Messenger chat link for the business page (m.me/<page id or username>). */
export const MESSENGER_URL = 'https://m.me/61558158815982';

export const BUSINESS_LOCATION = {
  officeAddress: '',
  serviceAreaCenter: 'Raleigh, NC',
};

export const DEFAULT_FAQS: FaqItem[] = [
  {
    id: 'faq-tv-price',
    category: 'tv',
    questionEn: 'How much does TV mounting cost?',
    questionRu: 'Сколько стоит монтаж телевизора?',
    answerEn: 'Labor on a regular wall: $99 for TVs up to 32" ($69 when mounted with another TV), $150 for 33"–64", $175 for 65"–75", and from $220 for 76"+. Add-ons per TV: above a fireplace +$99, brick or stone +$69, hiding wires inside the wall +$95, cord cover +$49. Need a mount? Fixed +$49, tilting +$59, full-motion +$89 — or use your own at no charge. 2 TVs save 10%, 3 save 15%, 4+ save 20%. Take the 5-question price quiz on our TV Mounting page for an instant estimate!',
    answerRu: 'Работа на обычной стене: $99 за ТВ до 32" ($69 вместе с другим ТВ), $150 за 33"–64", $175 за 65"–75" и от $220 за 76"+. Доплаты за каждый ТВ: над камином +$99, кирпич или камень +$69, провода в стене +$95, короб на стене +$49. Нужен кронштейн? Фиксированный +$49, наклонный +$59, поворотный +$89 — или ваш собственный без доплаты. 2 ТВ — скидка 10%, 3 — 15%, 4+ — 20%. Пройдите короткий квиз на странице «Монтаж ТВ» и сразу увидите цену!',
  },
  {
    id: 'faq-tv-fireplace',
    category: 'tv',
    questionEn: 'Can you mount a TV above a fireplace?',
    questionRu: 'Можно ли установить телевизор над камином?',
    answerEn: 'Yes! Mounting above a fireplace requires careful drilling into studs, brick, stone or masonry, and ensuring safe heat clearance. It involves specialized anchors and takes more time, so a fireplace installation fee applies (+$99 per TV). If you have natural thick uneven stone, an in-person photo check is required first.',
    answerRu: 'Да! Установка над камином требует сверления в стойки, кирпич или камень, а также проверки температурного зазора. Для этого требуются усиленные анкеры и дополнительное время (доплата $99 за ТВ). Если отделка из неровного природного камня, сначала потребуется фото для оценки.',
  },
  {
    id: 'faq-tv-bracket',
    category: 'tv',
    questionEn: 'Do I need to purchase a TV bracket in advance?',
    questionRu: 'Нужно ли мне заранее покупать крепление (кронштейн)?',
    answerEn: 'You have both options! If you already purchased a mount, we will inspect its weight rating and install it at no extra equipment fee. Alternatively, you can request heavy-duty fixed, tilting, or full-motion brackets directly from us when booking.',
    answerRu: 'Оба варианта возможны! Если вы уже купили кронштейн, мы проверим его совместимость по весу и установим без доплат за оборудование. Либо вы можете заказать надёжный кронштейн (фиксированный, наклонный или полноповоротный) у мастера при оформлении заявки.',
  },
  {
    id: 'faq-tv-wires',
    category: 'tv',
    questionEn: 'Can you hide the cables inside the wall?',
    questionRu: 'Можно ли спрятать провода внутри стены?',
    answerEn: 'We offer low-voltage signal cable concealment (HDMI, optical, soundbar cables) using clean wall grommet kits on standard hollow drywall. Important note: High-voltage electrical power cords (110V) cannot simply be dropped inside walls per US National Electrical Code (NEC). For power, we offer external paintable cord raceways or recommend code-compliant in-wall power bridge kits.',
    answerRu: 'Мы выполняем скрытую прокладку слаботочных сигнальных кабелей (HDMI, оптика, звук) через специальные настенные розетки-проходки в стандартном гипсокартоне. Важно: силовой шнур 220V/110V запрещено замуровывать в стену по нормам электробезопасности (NEC). Для питания мы используем аккуратный окрашиваемый кабель-канал либо сертифицированный power bridge комплект.',
  },
  {
    id: 'faq-service-area',
    category: 'general',
    questionEn: 'Do you service my neighborhood in the Triangle?',
    questionRu: 'Обслуживаете ли вы мой район в Triangle?',
    answerEn: 'We cover Raleigh, Cary, Apex, Durham, Wake Forest, Clayton, Knightdale, and Hillsborough (typically within a 30-40 minute travel window from our hub). Use the ZIP checker in our Service Area section to submit an address check request.',
    answerRu: 'Мы выезжаем в Роли, Кэри, Апекс, Дарем, Уэйк-Форест, Клейтон, Найтдейл и Хиллсборо (в пределах 30–40 минут езды от базы). Используйте проверку по ZIP-коду в разделе «Зона обслуживания» для предварительного запроса.',
  },
  {
    id: 'faq-send-photos',
    category: 'booking',
    questionEn: 'How can I send photos of my project?',
    questionRu: 'Как отправить фотографии места работ?',
    answerEn: 'You can attach photos directly inside our online request form (drag & drop or camera on mobile). Clear photos of your wall, outlets, and furniture help us confirm the exact quote and bring the right anchors without delays.',
    answerRu: 'Вы можете прикрепить фото прямо в форме заявки на сайте (выбрав файлы на телефоне или компьютере). Чёткие фотографии стены, розеток или мебели помогают сразу подтвердить точную смету и взять нужный крепёж.',
  },
  {
    id: 'faq-request-date',
    category: 'booking',
    questionEn: 'How do I request an appointment date?',
    questionRu: 'Как запросить удобную дату визита?',
    answerEn: 'Choose your preferred date and time slot in the service request form. Please note: this is a scheduling request, not an instant confirmed booking. We review our daily route and reply via your preferred contact method (SMS or phone call) to confirm the exact arrival window.',
    answerRu: 'Укажите желаемый день и интервал времени в форме заявки. Обратите внимание: это запрос на бронирование, а не гарантированная запись. Мы проверяем график маршрутов и связываемся с вами выбранным способом (SMS или звонок) для точного подтверждения визита.',
  },
];

export const WORK_SHOWCASE_ITEMS: WorkShowcaseItem[] = [
  {
    id: 'work-led-niche',
    category: 'tv_mounting',
    titleEn: 'Backlit TV Niche with Slat Wall & Built-in Fireplace',
    titleRu: 'ТВ в нише с подсветкой, стеной из реек и встроенным камином',
    afterImage: '/images/work/led-niche-tv-fireplace.jpg',
    captionEn: 'A recessed media niche with LED perimeter lighting, acoustic slat panels, floating TV and an electric fireplace below.',
    captionRu: 'Ниша под медиазону с LED-подсветкой по контуру, акустическими рейками, ТВ «в воздухе» и электрокамином снизу.',
    detailsEn: 'LED lighting • Slat panels • TV mount • Soundbar • Electric fireplace',
    detailsRu: 'LED-подсветка • Рейки • Монтаж ТВ • Саундбар • Электрокамин',
  },
  {
    id: 'work-white-panel',
    category: 'tv_mounting',
    titleEn: 'Slat Wall Media Center with Floating Console',
    titleRu: 'Медиастена из реек с подвесной тумбой',
    afterImage: '/images/work/slat-wall-tv-white-panel.jpg',
    captionEn: 'Black acoustic slats with a white TV panel, hidden LED backlighting and a floating console with built-in fireplace.',
    captionRu: 'Чёрные акустические рейки, белая панель под ТВ, скрытая LED-подсветка и подвесная тумба со встроенным камином.',
    detailsEn: 'Slat panels • TV panel • LED lighting • Floating console',
    detailsRu: 'Рейки • Панель под ТВ • LED-подсветка • Подвесная тумба',
  },
  {
    id: 'work-fireplace-wall',
    category: 'tv_mounting',
    titleEn: 'Custom TV & Electric Fireplace Feature Wall',
    titleRu: 'ТВ-стена с электрокамином под ключ',
    beforeImage: '/images/work/fireplace-tv-wall-before.jpg',
    afterImage: '/images/work/fireplace-tv-wall-after.jpg',
    captionEn: 'Built from bare framing: a recessed TV niche, wood mantel shelf and electric fireplace, finished in matte black.',
    captionRu: 'С нуля, от каркаса: ниша под ТВ, деревянная полка и электрокамин, отделка в матовом чёрном.',
    detailsEn: 'Framing • Drywall • Paint • TV mount • Fireplace install',
    detailsRu: 'Каркас • Гипсокартон • Покраска • Монтаж ТВ • Установка камина',
    portrait: true,
  },
  {
    id: 'work-home-office',
    category: 'shelving',
    titleEn: 'Custom Home Office Built-in',
    titleRu: 'Встроенный домашний кабинет',
    beforeImage: '/images/work/home-office-before.jpg',
    afterImage: '/images/work/home-office-after.jpg',
    captionEn: 'Floating shelves, a corner desk with cable grommets, slat wall panels and a full-height bookcase.',
    captionRu: 'Парящие полки, угловой стол с отверстиями под кабели, стеновые рейки и стеллаж до потолка.',
    detailsEn: 'Carpentry • Shelving • Desk • Slat panels',
    detailsRu: 'Столярные работы • Полки • Стол • Рейки',
    portrait: true,
  },
  {
    id: 'work-blue-led',
    category: 'tv_mounting',
    titleEn: 'Slat Wall TV with Blue LED Accents',
    titleRu: 'ТВ на стене из реек с синей подсветкой',
    afterImage: '/images/work/slat-wall-tv-blue-led.jpg',
    captionEn: 'Large TV on a black slat wall with a marble-look backdrop panel and vertical blue LED lines.',
    captionRu: 'Большой ТВ на чёрной стене из реек с панелью под мрамор и вертикальной синей подсветкой.',
    detailsEn: 'Slat panels • TV mount • LED lighting',
    detailsRu: 'Рейки • Монтаж ТВ • LED-подсветка',
  },
  {
    id: 'work-tile-fireplace',
    category: 'tv_mounting',
    titleEn: 'TV Above Tiled Fireplace Wall',
    titleRu: 'ТВ над камином на стене из плитки',
    afterImage: '/images/work/tile-fireplace-tv.jpg',
    captionEn: 'Large TV mounted on a marble-look tile fireplace surround, above a rustic wood mantel.',
    captionRu: 'Большой ТВ на облицовке камина из плитки под мрамор, над деревянной полкой в рустикальном стиле.',
    detailsEn: 'Tile wall drilling • TV mount • Mantel shelf',
    detailsRu: 'Сверление плитки • Монтаж ТВ • Полка над камином',
  },
  {
    id: 'work-stone-fireplace',
    category: 'tv_mounting',
    titleEn: 'TV Mounted Above Stone Fireplace',
    titleRu: 'ТВ над каменным камином',
    afterImage: '/images/work/stone-fireplace-tv.jpg',
    captionEn: 'Level TV mounting on a stacked-stone wall above the fireplace, with a wood mantel shelf.',
    captionRu: 'Ровный монтаж ТВ на стену из камня над камином, с деревянной полкой.',
    detailsEn: 'Stone wall • TV mount • Mantel shelf',
    detailsRu: 'Каменная стена • Монтаж ТВ • Полка над камином',
    portrait: true,
  },
  {
    id: 'work-shiplap-fireplace',
    category: 'tv_mounting',
    titleEn: 'Shiplap Feature Wall with Recessed TV & Fireplace',
    titleRu: 'Стена из вагонки с ТВ в нише и камином',
    afterImage: '/images/work/shiplap-fireplace-tv.jpg',
    captionEn: 'A white shiplap built-out wall with a recessed TV frame, floating mantel and linear electric fireplace.',
    captionRu: 'Выдвинутая стена из белой вагонки с нишей под ТВ, парящей полкой и линейным электрокамином.',
    detailsEn: 'Framing • Shiplap • TV mount • Electric fireplace',
    detailsRu: 'Каркас • Вагонка • Монтаж ТВ • Электрокамин',
    portrait: true,
  },
  {
    id: 'work-gray-shiplap',
    category: 'tv_mounting',
    titleEn: 'Gray Shiplap TV & Fireplace Wall',
    titleRu: 'ТВ-стена с камином в серой вагонке',
    afterImage: '/images/work/gray-shiplap-fireplace-tv.jpg',
    captionEn: 'A cozy built-out wall in gray shiplap with a recessed TV niche, rustic wood mantel and linear electric fireplace.',
    captionRu: 'Уютная выдвинутая стена из серой вагонки с нишей под ТВ, деревянной полкой и линейным электрокамином.',
    detailsEn: 'Framing • Shiplap • TV mount • Mantel • Fireplace',
    detailsRu: 'Каркас • Вагонка • Монтаж ТВ • Полка • Камин',
    portrait: true,
  },
  {
    id: 'work-picture-hanging',
    category: 'install',
    titleEn: 'Laser-Level Picture Hanging',
    titleRu: 'Развеска картин по лазерному уровню',
    afterImage: '/images/work/picture-hanging-laser.jpg',
    captionEn: 'Large framed art hung perfectly level and evenly spaced, using a laser line for exact alignment.',
    captionRu: 'Большие картины в рамах повешены строго ровно и с одинаковым отступом, по линии лазерного уровня.',
    detailsEn: 'Laser leveling • Wall anchors • Art installation',
    detailsRu: 'Лазерный уровень • Анкеры • Развеска картин',
    portrait: true,
  },
  {
    id: 'work-flush-mount',
    category: 'tv_mounting',
    titleEn: 'Flush-Mounted TV & Soundbar Above Mantel',
    titleRu: 'ТВ вплотную к стене и саундбар над камином',
    afterImage: '/images/work/flush-mount-tv-mantel.jpg',
    captionEn: 'An ultra-slim TV mounted flat against the wall above the mantel, with the soundbar aligned directly beneath.',
    captionRu: 'Тонкий ТВ закреплён вплотную к стене над камином, саундбар выровнен точно под ним.',
    detailsEn: 'Low-profile mount • Soundbar mount • Cable management',
    detailsRu: 'Плоский кронштейн • Крепление саундбара • Укладка кабелей',
  },
  {
    id: 'work-accent-wall',
    category: 'painting',
    titleEn: 'Black & Gold Accent Wall',
    titleRu: 'Акцентная стена: чёрный с золотом',
    beforeImage: '/images/work/black-gold-accent-wall-before.jpg',
    afterImage: '/images/work/black-gold-accent-wall-after.jpg',
    captionEn: 'A plain white wall turned into a statement piece with board-and-batten trim, deep black paint and gold accents.',
    captionRu: 'Обычная белая стена превращена в акцент: молдинги, глубокий чёрный цвет и золотые рейки.',
    detailsEn: 'Trim installation • Painting • Gold accent strips',
    detailsRu: 'Установка молдингов • Покраска • Золотые рейки',
  },
  {
    id: 'work-dark-wall',
    category: 'painting',
    titleEn: 'Dramatic Charcoal Media Room Walls',
    titleRu: 'Тёмные графитовые стены в медиакомнате',
    beforeImage: '/images/work/dark-accent-wall-before.jpg',
    afterImage: '/images/work/dark-accent-wall-after.jpg',
    captionEn: 'Light gray walls repainted in a deep charcoal with crisp, clean lines along the trim and ceiling.',
    captionRu: 'Светло-серые стены перекрашены в глубокий графитовый цвет с ровными линиями у плинтуса и потолка.',
    detailsEn: 'Surface prep • Masking • Two-coat paint',
    detailsRu: 'Подготовка • Малярный скотч • Покраска в два слоя',
  },
  {
    id: 'work-front-door',
    category: 'painting',
    titleEn: 'Front Door & Shutters Refresh',
    titleRu: 'Обновление входной двери и ставней',
    afterImage: '/images/work/front-door-shutters-paint.jpg',
    captionEn: 'Curb appeal upgrade: the front door and window shutters repainted in a bold, fresh blue.',
    captionRu: 'Обновлённый вид дома: входная дверь и ставни перекрашены в яркий свежий синий.',
    detailsEn: 'Prep & sanding • Exterior paint • Shutters',
    detailsRu: 'Подготовка и шлифовка • Фасадная краска • Ставни',
  },
  {
    id: 'work-wall-pergola',
    category: 'outdoor',
    titleEn: 'Wall-Mounted Patio Pergola with Curtains',
    titleRu: 'Пристенная пергола над патио со шторами',
    beforeImage: '/images/work/wall-pergola-before.jpg',
    afterImage: '/images/work/wall-pergola-after.jpg',
    captionEn: 'From boxes on an empty patio to a shaded outdoor room: metal frame, polycarbonate roof panels and privacy curtains.',
    captionRu: 'От коробок на пустом патио до уютной тени: металлический каркас, кровля из поликарбоната и шторы.',
    detailsEn: 'Assembly • Wall mounting • Roof panels • Curtains',
    detailsRu: 'Сборка • Крепление к стене • Кровельные панели • Шторы',
  },
  {
    id: 'work-louvered-pergola',
    category: 'outdoor',
    titleEn: 'Modern Louvered Aluminum Pergola',
    titleRu: 'Современная алюминиевая пергола с ламелями',
    afterImage: '/images/work/louvered-pergola.jpg',
    captionEn: 'A sleek louvered-roof pergola installed over a paver patio, perfectly square and level.',
    captionRu: 'Стильная пергола с ламельной крышей над патио из плитки, выставлена строго ровно.',
    detailsEn: 'Assembly • Anchoring • Louvered roof',
    detailsRu: 'Сборка • Крепление • Ламельная крыша',
  },
  {
    id: 'work-cedar-pergola',
    category: 'outdoor',
    titleEn: 'Cedar Pergola on Stone Patio',
    titleRu: 'Деревянная пергола на каменном патио',
    afterImage: '/images/work/cedar-pergola.jpg',
    captionEn: 'A classic cedar pergola assembled and anchored on a circular stamped-stone patio.',
    captionRu: 'Классическая деревянная пергола, собранная и закреплённая на круглом каменном патио.',
    detailsEn: 'Assembly • Anchoring • Cedar frame',
    detailsRu: 'Сборка • Крепление • Каркас из кедра',
  },
  {
    id: 'work-pool-gazebo',
    category: 'outdoor',
    titleEn: 'Hardtop Gazebo by the Pool',
    titleRu: 'Беседка с жёсткой крышей у бассейна',
    beforeImage: '/images/work/pool-gazebo-before.jpg',
    afterImage: '/images/work/pool-gazebo-after.jpg',
    captionEn: 'Wood-look frame anchored to the new pool deck, finished with a double metal roof and full mosquito netting.',
    captionRu: 'Каркас под дерево закреплён на новой площадке у бассейна, двойная металлическая крыша и москитная сетка.',
    detailsEn: 'Assembly • Concrete anchoring • Metal roof • Netting',
    detailsRu: 'Сборка • Анкеры в бетон • Металлическая крыша • Сетка',
  },
  {
    id: 'work-gazebo',
    category: 'outdoor',
    titleEn: 'Hardtop Gazebo Installation',
    titleRu: 'Установка беседки с жёсткой крышей',
    afterImage: '/images/work/gazebo-installation.jpg',
    captionEn: 'Large metal-roof gazebo assembled and installed poolside, complete with curtains and netting.',
    captionRu: 'Большая беседка с металлической крышей собрана и установлена у бассейна, со шторами и москитной сеткой.',
    detailsEn: 'Outdoor assembly • Anchoring • Curtains & netting',
    detailsRu: 'Сборка на улице • Крепление • Шторы и сетка',
  },
  {
    id: 'work-garden-shed',
    category: 'outdoor',
    titleEn: 'Backyard Storage Shed Build',
    titleRu: 'Сборка садового сарая',
    beforeImage: '/images/work/garden-shed-before.jpg',
    afterImage: '/images/work/garden-shed-after.jpg',
    captionEn: 'Framed, sheathed and finished on a new concrete pad: double doors, transom windows and a gable vent.',
    captionRu: 'Каркас, обшивка и отделка на новой бетонной площадке: двустворчатые двери, окна над дверью и вентиляция во фронтоне.',
    detailsEn: 'Framing • Sheathing • Doors & trim • Assembly',
    detailsRu: 'Каркас • Обшивка • Двери и отделка • Сборка',
  },
  {
    id: 'work-playset',
    category: 'outdoor',
    titleEn: 'Wooden Playset Assembly',
    titleRu: 'Сборка деревянной детской площадки',
    beforeImage: '/images/work/playset-before.jpg',
    afterImage: '/images/work/playset-after.jpg',
    captionEn: 'From boxes of parts to a finished backyard playset with clubhouse, slide and swings, set level and secure.',
    captionRu: 'Из коробок с деталями в готовую площадку с домиком, горкой и качелями, выставленную ровно и надёжно.',
    detailsEn: 'Playset assembly • Leveling • Swings & slide',
    detailsRu: 'Сборка площадки • Выравнивание • Качели и горка',
  },
  {
    id: 'work-ceiling-fan',
    category: 'install',
    titleEn: 'Modern Ceiling Fan Installation',
    titleRu: 'Установка современного потолочного вентилятора',
    afterImage: '/images/work/ceiling-fan-install.jpg',
    captionEn: 'A low-profile three-blade ceiling fan assembled and installed securely on the existing ceiling box.',
    captionRu: 'Низкопрофильный вентилятор с тремя лопастями собран и надёжно установлен на существующую потолочную коробку.',
    detailsEn: 'Fan assembly • Ceiling mount • Balancing',
    detailsRu: 'Сборка вентилятора • Крепление к потолку • Балансировка',
  },
];
