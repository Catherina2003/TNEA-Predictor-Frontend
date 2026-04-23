// ── Enums (mirror backend) ─────────────────────────────────────────────────

export type Community = 'OC' | 'BC' | 'BCM' | 'MBC' | 'SC' | 'SCA' | 'ST'
export type SchoolBoard = 'State' | 'CBSE' | 'ICSE'
export type Stream = 'ACADEMIC' | 'VOCATIONAL'
export type SchoolType = 'Govt' | 'Private'
export type GovtSchoolType =
  | 'Corporation'
  | 'Municipality'
  | 'AdiDravidar'
  | 'TribalWelfare'
  | 'KallarReclamation'
  | 'ForestDept'
  | 'ApprovedAided'
export type DaType = 'Visual' | 'Hearing' | 'Locomotor' | 'Other'
export type Plan = 'FREE' | 'PREMIUM'
export type Tier = 'TIER1' | 'TIER2' | 'TIER3'
export type ChanceLabel = 'SAFE' | 'MODERATE' | 'AMBITIOUS' | 'OUT_OF_REACH'

// ── Auth DTOs ──────────────────────────────────────────────────────────────

export interface AuthUser {
  id: number
  name: string
  email: string
  emailVerified: boolean
}

export interface MessageResponse {
  message: string
}

// ── Registration wizard steps ──────────────────────────────────────────────

export interface Step1Data {
  name: string
  email: string
  password: string
}

export interface Step2Data {
  community: Community
  schoolBoard: SchoolBoard
  stream: Stream
  vocationalGroupName: string | null
  schoolType: SchoolType
  govtSchoolType: GovtSchoolType | null
  studiedClass6To12: boolean | null
}

export interface Step3Data {
  isFirstGenGraduate: boolean
  isDifferentlyAbled: boolean
  daType: DaType | null
  isExServicemenWard: boolean
  isEminentSports: boolean
  sportsAchievement: string | null
}

export interface Step4Data {
  maths: number
  subject1: number
  subject2: number
}

export interface Step5Data {
  preferredDistrictNames: string[]
}

export interface Step6Data {
  tneaRank: number | null
}

export interface WizardData {
  step1?: Step1Data
  step2?: Step2Data
  step3?: Step3Data
  step4?: Step4Data
  step5?: Step5Data
  step6?: Step6Data
  completedStep: number
}

// ── Reference data ─────────────────────────────────────────────────────────

export interface District {
  id: number
  name: string
  nameTamil: string | null
  zone: string | null
}

export interface VocationalGroup {
  id: number
  name: string
  code: string
  subject1Name: string
  subject2Name: string
  subject1Weight: number
  subject2Weight: number
}

// ── College ────────────────────────────────────────────────────────────────

export interface CollegeCard {
  id: number
  name: string
  nameTamil?: string
  district: string
  type: string
  affiliationType: string
  tier: Tier
  tierScore: number
  nirfRank?: number
  chanceLabel?: ChanceLabel
  chancePct?: number
  roundEligible?: number
}