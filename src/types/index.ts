export type Language = 'en' | 'ru';

export type WallMaterial = 'drywall' | 'brick' | 'concrete' | 'tile' | 'stone' | 'unknown';
export type MountOwnership = 'customer_mount' | 'handyman_mount';
export type MountType = 'fixed' | 'tilting' | 'full_motion';
export type WireManagement = 'none' | 'raceway' | 'in_wall_low_voltage';

export interface TvSetupParams {
  tvSize: string; // e.g. "32-43", "44-55", "56-65", "66-75", "76+"
  wallMaterial: WallMaterial;
  aboveFireplace: boolean;
  mountOwnership: MountOwnership;
  mountType: MountType;
  wireManagement: WireManagement;
  soundbar: boolean;
  floatingShelf: boolean;
}

export interface QuoteCalculationItem {
  id: string;
  nameEn: string;
  nameRu: string;
  price: number | null; // null means custom quote required
  isCustomQuote?: boolean;
  noteEn?: string;
  noteRu?: string;
}

export interface QuoteCalculationResult {
  items: QuoteCalculationItem[];
  subtotal: number;
  minimumOrderFee: number;
  total: number;
  hasCustomItems: boolean;
  tv1Details: TvSetupParams;
  hasSecondTv: boolean;
  tv2Details?: TvSetupParams;
  zipCode: string;
  disclaimerEn: string;
  disclaimerRu: string;
}

export interface HandymanServiceItem {
  id: string;
  titleEn: string;
  titleRu: string;
  shortDescEn: string;
  shortDescRu: string;
  featuresEn: string[];
  featuresRu: string[];
  demoPriceGuideEn: string;
  demoPriceGuideRu: string;
  iconName: string;
  isCustomOnly?: boolean;
}

export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'estimate_sent'
  | 'approved'
  | 'scheduled'
  | 'completed'
  | 'cancelled';

export interface LeadInquiry {
  id: string;
  createdAt: string;
  source: 'website_calculator' | 'website_form' | 'direct_phone' | 'repeat_customer';
  firstName: string;
  lastName?: string;
  phone: string;
  email?: string;
  zip: string;
  streetAddress?: string;
  serviceId: string;
  serviceTitle: string;
  description: string;
  calculatedQuote?: QuoteCalculationResult;
  estimatedPrice: number | null;
  agreedPrice: number | null;
  requestedDate?: string;
  requestedTimeSlot?: string;
  isDateConfirmed: boolean;
  confirmedDate?: string;
  preferredContactMethod: 'phone' | 'sms' | 'email';
  optInSms: boolean;
  optInMarketingEmail: boolean;
  photos: string[];
  status: LeadStatus;
  ownerNotes: string;
}

export interface ClientRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  zip: string;
  totalJobs: number;
  totalRevenue: number;
  lastJobDate: string;
  notes?: string;
}

export interface PricingConfig {
  minimumOrder: number;
  tvSizes: Record<string, { label: string; price: number }>;
  wallMaterials: Record<WallMaterial, { nameEn: string; nameRu: string; surcharge: number | null; customQuote?: boolean }>;
  fireplaceSurcharge: number;
  mounts: {
    customerProvided: number;
    fixedMountProvided: number;
    tiltingMountProvided: number;
    fullMotionMountProvided: number;
  };
  wireManagement: {
    none: number;
    raceway: number;
    inWallLowVoltage: number;
  };
  addOns: {
    soundbar: number;
    floatingShelf: number;
  };
}

export interface FaqItem {
  id: string;
  questionEn: string;
  questionRu: string;
  answerEn: string;
  answerRu: string;
  category: 'tv' | 'general' | 'booking' | 'pricing';
}

export interface WorkShowcaseItem {
  id: string;
  titleEn: string;
  titleRu: string;
  category: 'tv_mounting' | 'assembly' | 'drywall' | 'shelving' | 'painting' | 'outdoor' | 'install';
  /** Omit for a single "finished" photo (no before/after slider) */
  beforeImage?: string;
  afterImage: string;
  captionEn: string;
  captionRu: string;
  detailsEn: string;
  detailsRu: string;
  /** Use a taller frame for vertical photos */
  portrait?: boolean;
}
