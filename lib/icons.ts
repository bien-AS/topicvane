/**
 * Curated Lucide icon registry — the single source of icons for the app.
 *
 * Rules (00_FOUNDATION): Lucide only, 1.5px stroke, 16px dense / 18px nav, color via
 * tokens (slate default, blue active). Import icons from here — never directly from
 * "lucide-react" in feature code — so a global swap touches only this file.
 */
import type { LucideIcon } from "lucide-react";
import {
  // Nav — Research
  LayoutGrid,
  Search,
  Radar,
  Waypoints,
  // Nav — Build
  FolderKanban,
  Globe,
  FileText,
  // Nav — Support / Account
  GraduationCap,
  Lightbulb,
  LifeBuoy,
  Settings,
  CreditCard,
  User,
  LogOut,
  // Actions & controls
  Plus,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronsUpDown,
  ArrowUpRight,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  SlidersHorizontal,
  Filter,
  RefreshCw,
  Download,
  ExternalLink,
  Copy,
  // Status & feedback
  Info,
  CircleCheck,
  CircleAlert,
  TriangleAlert,
  CircleX,
  Loader2,
  // Theme
  Sun,
  Moon,
  // Data / domain
  TrendingUp,
  TrendingDown,
  Link2,
  Star,
  Inbox,
} from "lucide-react";

export type { LucideIcon };

export const Icons = {
  // Research
  dashboard: LayoutGrid,
  search: Search,
  domainScan: Radar,
  trustFlow: Waypoints,
  // Build
  projects: FolderKanban,
  websiteBuilder: Globe,
  articles: FileText,
  // Support / Account
  tutorials: GraduationCap,
  requestFeature: Lightbulb,
  ticket: LifeBuoy,
  settings: Settings,
  billing: CreditCard,
  user: User,
  logout: LogOut,
  // Actions
  add: Plus,
  check: Check,
  close: X,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  sort: ChevronsUpDown,
  linkOut: ArrowUpRight,
  caretUp: ArrowUp,
  caretDown: ArrowDown,
  more: MoreHorizontal,
  adjust: SlidersHorizontal,
  filter: Filter,
  refresh: RefreshCw,
  download: Download,
  external: ExternalLink,
  copy: Copy,
  // Status
  info: Info,
  success: CircleCheck,
  warning: CircleAlert,
  error: CircleX,
  alert: TriangleAlert,
  spinner: Loader2,
  // Theme
  sun: Sun,
  moon: Moon,
  // Data / domain
  trendUp: TrendingUp,
  trendDown: TrendingDown,
  backlink: Link2,
  star: Star,
  empty: Inbox,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof Icons;
