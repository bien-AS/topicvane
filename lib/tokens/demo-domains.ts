/** Demo domains — REAL Majestic data (fresh index, pulled 2026-07-02).
 *  Use these to seed every mock/screen so numbers are realistic (never yahoo.com).
 *  These are the ONLY approved demo domains (no consultant/client references).
 *  Topics are raw Majestic Topical Trust Flow (parent/child); color via getTtfColor. */

export interface DemoTopic { topic: string; value: number }
export interface DemoAnchor { text: string; refDomains: number; totalLinks: number }

export interface DemoDomain {
  domain: string
  title: string
  trustFlow: number
  citationFlow: number
  extBacklinks: number
  refDomains: number
  refIPs: number
  refSubnets: number
  indexedURLs: number
  refDomainsEDU: number
  refDomainsGOV: number
  ip: string
  /** operator's read on the domain as a PBN candidate */
  quality: 'strong' | 'moderate' | 'weak'
  topics: DemoTopic[]
  anchors?: DemoAnchor[]
}

export const DEMO_DOMAINS: DemoDomain[] = [
  {
    domain: 'foodchainid.com',
    title: 'FoodChain ID — Technology & services for the food supply chain',
    trustFlow: 31, citationFlow: 41,
    extBacklinks: 14285, refDomains: 1049, refIPs: 664, refSubnets: 526,
    indexedURLs: 7831, refDomainsEDU: 4, refDomainsGOV: 2, ip: '141.193.213.10',
    quality: 'strong',
    topics: [
      { topic: 'Business/Business Services', value: 30 },
      { topic: 'Business/Agriculture and Forestry', value: 25 },
      { topic: 'Health/Nutrition', value: 22 },
      { topic: 'Business', value: 21 },
      { topic: 'Business/Textiles and Nonwovens', value: 21 },
      { topic: 'Business/Consumer Goods and Services', value: 21 },
      { topic: 'Computers/Software/Internet', value: 20 },
      { topic: 'Business/Food and Related Products', value: 20 },
      { topic: 'Science/Agriculture', value: 19 },
      { topic: 'Regional/Europe', value: 19 },
    ],
  },
  {
    domain: 'authoritysolutions.com',
    title: 'Expert Digital Marketing Agency Services | Authority Solutions',
    trustFlow: 19, citationFlow: 42,
    extBacklinks: 9684, refDomains: 631, refIPs: 420, refSubnets: 361,
    indexedURLs: 3263, refDomainsEDU: 0, refDomainsGOV: 0, ip: '172.66.43.121',
    quality: 'moderate',
    topics: [
      { topic: 'Sports/Water Sports', value: 18 },
      { topic: 'Computers/Internet/Web Design and Development', value: 18 },
      { topic: 'News/Newspapers', value: 16 },
      { topic: 'Recreation/Outdoors', value: 14 },
      { topic: 'Shopping/Home and Garden', value: 14 },
      { topic: 'Arts/Crafts', value: 13 },
      { topic: 'Regional/Europe', value: 13 },
      { topic: 'Recreation', value: 13 },
      { topic: 'Business/Consumer Goods and Services', value: 13 },
      { topic: 'Recreation/Pets', value: 13 },
    ],
  },
  {
    domain: 'tristarbuilt.com',
    title: 'General Construction Contractor in Denton: Tristar Built',
    trustFlow: 21, citationFlow: 33,
    extBacklinks: 360, refDomains: 114, refIPs: 90, refSubnets: 79,
    indexedURLs: 314, refDomainsEDU: 0, refDomainsGOV: 0, ip: '69.16.212.96',
    quality: 'moderate',
    topics: [{ topic: 'News/Newspapers', value: 21 }],
  },
  {
    domain: 'superiorgrouting.com',
    title: 'Superior Grouting | Specialty Grouting Services in Houston',
    trustFlow: 6, citationFlow: 33,
    extBacklinks: 231, refDomains: 89, refIPs: 69, refSubnets: 66,
    indexedURLs: 351, refDomainsEDU: 0, refDomainsGOV: 0, ip: '188.114.97.2',
    quality: 'weak',
    topics: [
      { topic: 'Recreation/Autos', value: 2 },
      { topic: 'Sports/Soccer', value: 1 },
      { topic: 'Society/Organizations', value: 1 },
      { topic: 'Recreation/Pets', value: 1 },
    ],
    anchors: [
      { text: 'superior grouting services', refDomains: 15, totalLinks: 41 },
      { text: 'superior grouting', refDomains: 12, totalLinks: 15 },
      { text: 'concrete leveling', refDomains: 10, totalLinks: 16 },
      { text: 'concrete lifting', refDomains: 8, totalLinks: 10 },
      { text: 'contact us', refDomains: 4, totalLinks: 5 },
      { text: 'visit website', refDomains: 3, totalLinks: 6 },
    ],
  },
  {
    domain: 'drbrianharkins.com',
    title: 'Da Vinci Xi Robotic Surgery Specialist | Dr. Brian Harkins',
    trustFlow: 0, citationFlow: 34,
    extBacklinks: 505, refDomains: 110, refIPs: 83, refSubnets: 79,
    indexedURLs: 753, refDomainsEDU: 0, refDomainsGOV: 0, ip: '188.114.96.2',
    quality: 'weak', // TF 0, no topical signal — the "skip this one" example
    topics: [],
  },
]

export const DEMO_DOMAINS_BY_NAME = Object.fromEntries(DEMO_DOMAINS.map((d) => [d.domain, d]))
