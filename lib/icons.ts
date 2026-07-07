/**
 * Curated Lucide icon registry — the single source of icons for the app.
 *
 * Rules (00_FOUNDATION): Lucide only, 1.5px stroke, 16px dense / 18px nav, color via
 * tokens (slate default, blue active). Import icons from here — never directly from
 * "lucide-react" in feature code — so a global swap touches only this file.
 */
import type { LucideIcon } from "lucide-react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Bell,
  // Editor toolbar
  Bold,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  CircleAlert,
  CircleCheck,
  Clock,
  Copy,
  CreditCard,
  Database,
  Download,
  ExternalLink,
  FileText,
  Filter,
  // Nav — Build
  FolderKanban,
  Gauge,
  Globe,
  // Nav — Support / Account
  GraduationCap,
  Heading2,
  Image as ImageIcon,
  Inbox,
  // Status & feedback
  Info,
  Italic,
  Landmark,
  // Nav — Research
  LayoutDashboard,
  LifeBuoy,
  Lightbulb,
  Link2,
  List,
  Loader,
  Loader2,
  LogOut,
  Moon,
  MoreHorizontal,
  Network,
  Newspaper,
  Pencil,
  // Actions & controls
  Plus,
  Quote,
  Radar,
  RefreshCw,
  Search,
  Settings,
  SlidersHorizontal,
  Sparkles,
  Star,
  // Theme
  Sun,
  Target,
  Trash2,
  TrendingDown,
  // Data / domain
  TrendingUp,
  TriangleAlert,
  User,
  X,
  Zap,
} from "lucide-react";

export type { LucideIcon };

export const Icons = {
  // Research
  dashboard: LayoutDashboard,
  search: Search,
  domainScan: Radar,
  trustFlow: Radar,
  domainInventory: Database,
  // Build
  projects: FolderKanban,
  websiteBuilder: Globe,
  blog: Newspaper,
  articles: FileText,
  // Support / Account
  support: LifeBuoy,
  account: Settings,
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
  next: ArrowRight,
  outbound: ArrowUpRight,
  export: Download,
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
  notifications: Bell,
  // Data / domain context
  delta: TrendingUp,
  trendUp: TrendingUp,
  trendDown: TrendingDown,
  topicalMap: Network,
  generate: Sparkles,
  fresh: Zap,
  historic: Landmark,
  backlink: Link2,
  star: Star,
  target: Target,
  gauge: Gauge,
  calendar: Calendar,
  clock: Clock,
  // Status
  info: Info,
  success: CircleCheck,
  warning: CircleAlert,
  error: CircleAlert,
  alert: TriangleAlert,
  spinner: Loader2,
  loading: Loader,
  // Theme
  sun: Sun,
  moon: Moon,
  // Data / domain
  empty: Inbox,
  // Editor toolbar
  bold: Bold,
  italic: Italic,
  heading: Heading2,
  list: List,
  link: Link2,
  image: ImageIcon,
  quote: Quote,
  edit: Pencil,
  trash: Trash2,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof Icons;
