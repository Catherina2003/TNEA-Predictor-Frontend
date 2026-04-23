import type { Community, SchoolBoard, Stream, SchoolType, GovtSchoolType, DaType } from './types'

// ── Dropdown options ───────────────────────────────────────────────────────

export const COMMUNITY_OPTIONS: { value: Community; label: string }[] = [
  { value: 'OC',  label: 'OC — Open Category' },
  { value: 'BC',  label: 'BC — Backward Class' },
  { value: 'BCM', label: 'BCM — Backward Class Muslim' },
  { value: 'MBC', label: 'MBC — Most Backward Class' },
  { value: 'SC',  label: 'SC — Scheduled Caste' },
  { value: 'SCA', label: 'SCA — Scheduled Caste Arunthathiyar' },
  { value: 'ST',  label: 'ST — Scheduled Tribe' },
]

export const SCHOOL_BOARD_OPTIONS: { value: SchoolBoard; label: string }[] = [
  { value: 'State', label: 'Tamil Nadu State Board' },
  { value: 'CBSE',  label: 'CBSE' },
  { value: 'ICSE',  label: 'ICSE' },
]

export const STREAM_OPTIONS: { value: Stream; label: string }[] = [
  { value: 'ACADEMIC',   label: 'Academic Stream' },
  { value: 'VOCATIONAL', label: 'Vocational Stream' },
]

export const SCHOOL_TYPE_OPTIONS: { value: SchoolType; label: string }[] = [
  { value: 'Govt',    label: 'Government School' },
  { value: 'Private', label: 'Private School' },
]

export const GOVT_SCHOOL_TYPE_OPTIONS: { value: GovtSchoolType; label: string }[] = [
  { value: 'Corporation',      label: 'Corporation School' },
  { value: 'Municipality',     label: 'Municipality School' },
  { value: 'AdiDravidar',      label: 'Adi Dravidar Welfare School' },
  { value: 'TribalWelfare',    label: 'Tribal Welfare School' },
  { value: 'KallarReclamation',label: 'Kallar Reclamation School' },
  { value: 'ForestDept',       label: 'Forest Department School' },
  { value: 'ApprovedAided',    label: 'Approved Aided School' },
]

export const DA_TYPE_OPTIONS: { value: DaType; label: string }[] = [
  { value: 'Visual',    label: 'Visual Impairment' },
  { value: 'Hearing',   label: 'Hearing Impairment' },
  { value: 'Locomotor', label: 'Locomotor Disability' },
  { value: 'Other',     label: 'Other Disability' },
]

// ── Wizard step metadata ───────────────────────────────────────────────────

export const WIZARD_STEPS = [
  { step: 1, label: 'Basic Info',        description: 'Name, email and password' },
  { step: 2, label: 'Academic Profile',  description: 'Community, board and stream' },
  { step: 3, label: 'Special Categories',description: 'Reservations and special flags' },
  { step: 4, label: 'Your Marks',        description: 'Subject marks for cutoff calculation' },
  { step: 5, label: 'Preferences',       description: 'Preferred districts (optional)' },
  { step: 6, label: 'TNEA Rank',         description: 'Enter if rank list is released' },
] as const

// ── API endpoints ──────────────────────────────────────────────────────────

export const API = {
  auth: {
    registerStep: (n: number) => `/api/auth/register/step/${n}`,
    verify:         '/api/auth/verify',
    login:          '/api/auth/login',
    logout:         '/api/auth/logout',
    me:             '/api/auth/me',
    forgotPassword: '/api/auth/forgot-password',
    resetPassword:  '/api/auth/reset-password',
  },
  reference: {
    districts:        '/api/districts',
    vocationalGroups: '/api/vocational-groups',
  },
} as const