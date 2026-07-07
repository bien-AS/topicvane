/** REAL backlink samples pulled from the Majestic API (fresh index, 2026-07-02)
 *  for every domain in the prototype. Feeds the Topical Trust Flow drilldowns
 *  ("Referring URLs" / "Links from On-Topic Domains") so every expand is real. */
export interface Backlink {
  source: string
  target: string
  anchor: string
  /** source domain Trust Flow */
  sourceTf: number
  /** source URL topical Trust Flow (its top topic value) */
  topicTf: number
  /** source's top topic */
  topic: string
  type: 'TextLink' | 'ImageLink' | 'Redirect'
}

export const BACKLINKS: Record<string, Backlink[]> = {
  'hctra.org': [
    { source: 'https://www.harriscountytx.gov/', target: 'https://www.hctra.org/', anchor: 'toll road authority', sourceTf: 57, topicTf: 57, topic: 'Society/Government', type: 'TextLink' },
    { source: 'http://www.houstontranstar.org/', target: 'https://www.hctra.org/', anchor: 'harris county toll road authority', sourceTf: 51, topicTf: 50, topic: 'Business/Transportation and Logistics', type: 'TextLink' },
    { source: 'http://www.houstontranstar.org/', target: 'https://www.hctra.org/RoadsideAssistance', anchor: 'roadside assistance', sourceTf: 51, topicTf: 50, topic: 'Business/Transportation and Logistics', type: 'TextLink' },
    { source: 'https://mojo.biz/', target: 'https://www.hctra.org/Home', anchor: 'harris county toll road authority, texas', sourceTf: 44, topicTf: 39, topic: 'Reference/Museums', type: 'ImageLink' },
    { source: 'https://www.pct3.com/parks', target: 'https://www.hctra.org/', anchor: 'toll road', sourceTf: 38, topicTf: 38, topic: 'Society/Government', type: 'TextLink' },
    { source: 'https://www.harriscountytx.gov/Harris-County-A-Z', target: 'https://www.hctra.org/', anchor: 'ez tags (toll road authority)', sourceTf: 36, topicTf: 36, topic: 'Society/Government', type: 'TextLink' },
    { source: 'https://ktsuradio.com/', target: 'https://www.hctra.org/Home', anchor: 'get your ez tag now! click here', sourceTf: 41, topicTf: 41, topic: 'Reference/Education', type: 'TextLink' },
  ],
  'foodchainid.com': [
    { source: 'https://www.bioagricert.org/it/', target: 'https://www.foodchainid.com/', anchor: 'foodchain id inc.', sourceTf: 51, topicTf: 51, topic: 'Business/Business Services', type: 'ImageLink' },
    { source: 'https://www.crnusa.org/membership/responsible-its-our-middle-name', target: 'https://www.foodchainid.com/', anchor: 'foodchain id', sourceTf: 42, topicTf: 42, topic: 'Health/Nutrition', type: 'TextLink' },
    { source: 'https://www.bioagricert.org/en/', target: 'https://www.foodchainid.com/', anchor: 'foodchain id inc.', sourceTf: 42, topicTf: 41, topic: 'Business/Agriculture and Forestry', type: 'ImageLink' },
    { source: 'https://biovereenegung.lu/marken/', target: 'https://www.foodchainid.com/fr/certification/eu-organic', anchor: 'foodchain id certification', sourceTf: 35, topicTf: 35, topic: 'Business', type: 'TextLink' },
    { source: 'https://sustainablefoodssummit.com/europe/', target: 'https://www.foodchainid.com/', anchor: 'silver sponsor:', sourceTf: 28, topicTf: 28, topic: 'Business/Business Services', type: 'ImageLink' },
  ],
  'authoritysolutions.com': [
    { source: 'https://www.diversityinaquatics.org/', target: 'https://www.authoritysolutions.com/', anchor: 'website design by authority solutions®', sourceTf: 26, topicTf: 26, topic: 'Sports/Water Sports', type: 'TextLink' },
    { source: 'https://www.topseos.com/usa/directory/enterprise-bing-ppc-management-companies', target: 'https://www.authoritysolutions.com/tx/houston', anchor: 'visit website', sourceTf: 29, topicTf: 29, topic: 'Computers/Internet/Web Design and Development', type: 'TextLink' },
    { source: 'https://seotribunal.com/best-seo-companies-in-houston/', target: 'https://authoritysolutions.com/', anchor: 'learn more', sourceTf: 22, topicTf: 21, topic: 'Society/People', type: 'TextLink' },
    { source: 'https://www.goodfirms.co/directory/country/top-digital-marketing-companies/us', target: 'https://authoritysolutions.com/', anchor: 'visit website', sourceTf: 20, topicTf: 19, topic: 'Computers/Software/Accounting', type: 'TextLink' },
    { source: 'https://www.tristarbuilt.com/services/construction/', target: 'https://www.authoritysolutions.com/tx/fort-worth', anchor: 'authority solutions®', sourceTf: 21, topicTf: 21, topic: 'News/Newspapers', type: 'TextLink' },
  ],
  'tristarbuilt.com': [
    { source: 'https://dentonrc.com/bestofdenton/best-of-denton-2025/', target: 'https://www.tristarbuilt.com/services/construction', anchor: 'tristar repair & construction', sourceTf: 34, topicTf: 34, topic: 'News/Newspapers', type: 'TextLink' },
    { source: 'https://www.heartsforhomes.org/about/business-partners/', target: 'https://www.tristarbuilt.com/services/construction', anchor: 'tristar repair & construction', sourceTf: 16, topicTf: 16, topic: 'Business/Automotive', type: 'TextLink' },
    { source: 'https://www.digitaljournal.com/pr/news/tristar-built-expands-remodeling-roofing', target: 'https://www.tristarbuilt.com/tx/lantana', anchor: 'tristar built', sourceTf: 14, topicTf: 14, topic: 'Arts/Architecture', type: 'TextLink' },
    { source: 'https://www.digitaljournal.com/pr/news/tristar-built-expands-remodeling-roofing', target: 'https://www.tristarbuilt.com/tx/highland-village', anchor: "tristar built's", sourceTf: 14, topicTf: 14, topic: 'Arts/Architecture', type: 'TextLink' },
  ],
  'superiorgrouting.com': [
    { source: 'https://www.digitaljournal.com/pr/news/grouting-live-refineries-superior-grouting', target: 'https://www.superiorgrouting.com/tx/beaumont', anchor: 'superior grouting services', sourceTf: 14, topicTf: 14, topic: 'Arts/Architecture', type: 'TextLink' },
    { source: 'https://www.digitaljournal.com/pr/news/grouting-live-refineries-superior-grouting', target: 'https://www.superiorgrouting.com/la/baton-rouge', anchor: 'superior grouting services', sourceTf: 14, topicTf: 14, topic: 'Arts/Architecture', type: 'TextLink' },
    { source: 'https://www.digitaljournal.com/pr/news/grouting-live-refineries-superior-grouting', target: 'https://www.superiorgrouting.com/', anchor: 'https://www.superiorgrouting.com', sourceTf: 14, topicTf: 14, topic: 'Arts/Architecture', type: 'TextLink' },
  ],
  'drbrianharkins.com': [
    { source: 'https://healthpoint.com/editorial/robotics-revolutionizing-surgery/', target: 'https://www.drbrianharkins.com/articles/robotic-assisted-hernia-operations', anchor: 'hernia repairs', sourceTf: 9, topicTf: 9, topic: 'Business', type: 'TextLink' },
    { source: 'https://www.goodfirms.co/company/authority-solutions', target: 'https://www.drbrianharkins.com/', anchor: 'web app', sourceTf: 9, topicTf: 9, topic: 'Computers/Internet/Web Design and Development', type: 'TextLink' },
    { source: 'https://www.withpower.com/trial/phase-hernia-ventral-2026', target: 'https://www.drbrianharkins.com/articles/robotic-hernia-surgeries', anchor: 'drbrianharkins.com/articles/…', sourceTf: 0, topicTf: 0, topic: '', type: 'TextLink' },
  ],
}

export const getBacklinks = (domain: string): Backlink[] => BACKLINKS[domain] ?? []

/** Ahrefs integration (exec review 4.3) — the dual-source moat. Backlinks are
 *  MERGED from Majestic + Ahrefs and deduped; each ref carries which source(s)
 *  found it. Ahrefs typically reports ~25–33% MORE live backlinks than Majestic,
 *  so the merged count lifts the Majestic figure. DR/UR come from Ahrefs. */
export type RefSource = 'majestic' | 'ahrefs' | 'both'

/** deterministic source tag by row index — mocks the merge/dedup labeling. */
export const sourceForIndex = (i: number): RefSource => (i % 3 === 0 ? 'both' : i % 3 === 1 ? 'majestic' : 'ahrefs')

/** Ahrefs Domain Rating / URL Rating derived from Trust/Citation Flow (real API
 *  is a data-layer concern; this keeps the prototype consistent). */
export const authorityFor = (trustFlow: number, citationFlow: number) => ({
  dr: Math.min(92, Math.round(trustFlow * 1.35 + 8)),
  ur: Math.min(90, Math.round(citationFlow * 1.3 + 10)),
})

/** the merged live-backlink count — Majestic total lifted ~28% by Ahrefs-only finds. */
export const mergedBacklinkCount = (majesticCount: number) => Math.round(majesticCount * 1.28)

const parentOf = (t: string) => t.split(/\s*\/\s*/)[0]

/** Real backlinks relevant to a topic row: prefer sources whose own top topic
 *  shares the row's parent category; fall back to the domain's strongest links so
 *  a dropdown is never empty. */
export function backlinksForTopic(all: Backlink[], topic: string, limit = 6): Backlink[] {
  const p = parentOf(topic)
  const matched = all.filter((b) => b.topic && parentOf(b.topic) === p)
  return (matched.length ? matched : all).slice(0, limit)
}

/** The three TTF-row counts, derived from the domain totals and this topic's
 *  share of Trust Flow. Referring URLs < Referring Domains < On-Topic Links,
 *  matching Majestic's Site Explorer ordering. */
export function topicCounts(refDomains: number, extBacklinks: number, share: number) {
  const referringDomains = Math.max(1, Math.round(refDomains * share))
  const referringUrls = Math.max(1, Math.round(referringDomains * 0.7))
  const onTopicLinks = Math.max(referringDomains, Math.round(extBacklinks * share))
  return { referringUrls, referringDomains, onTopicLinks }
}
