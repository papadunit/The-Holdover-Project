export const sitewideFreshnessNote =
  "Counts and summaries may change as public records are updated. Each entry displays the date it was last reviewed.";

export const sourceTypeLabels = {
  official: "Official Company Source",
  docket: "Court Docket",
  opinion: "Judicial Opinion",
  county: "County / Property Record",
  sec: "SEC / Regulatory Filing",
  complaint: "Third-Party Complaint",
  portal: "Government Complaint Portal",
};

export const sourceRegistry = [
  {
    id: "hudson-about",
    title: "Hudson Homes Management - About",
    url: "https://www.hudsonhomesmanagement.com/about/",
    sourceType: "official",
    dateAdded: "2026-03-25",
    lastChecked: "2026-03-25",
    reliability: "Primary source",
    description:
      "Company self-description page used for market footprint and ownership language.",
  },
  {
    id: "hudson-terms",
    title: "Hudson Homes Management - Terms of Use",
    url: "https://www.hudsonhomesmanagement.com/terms-of-use/",
    sourceType: "official",
    dateAdded: "2026-03-25",
    lastChecked: "2026-03-25",
    reliability: "Primary source",
    description: "Company legal page used for entity naming conventions.",
  },
  {
    id: "sec-lsg",
    title: "SEC Order: In the Matter of Lone Star Global Acquisitions, Ltd. and Hudson Advisors L.P.",
    url: "https://www.sec.gov/litigation/admin/2020/33-10821.pdf",
    sourceType: "sec",
    dateAdded: "2026-03-25",
    lastChecked: "2026-03-25",
    reliability: "Primary source",
    description:
      "SEC administrative order used for regulatory context language only.",
  },
  {
    id: "bbb-hudson",
    title: "BBB Business Profile - Hudson Homes Management",
    url: "https://www.bbb.org/",
    sourceType: "complaint",
    dateAdded: "2026-03-25",
    lastChecked: "2026-03-25",
    reliability: "Third-party profile",
    description:
      "Third-party business profile context displayed alongside complaint materials.",
  },
  {
    id: "cfpb-complaint",
    title: "Consumer Financial Protection Bureau - Submit a Complaint",
    url: "https://www.consumerfinance.gov/complaint/",
    sourceType: "portal",
    dateAdded: "2026-03-25",
    lastChecked: "2026-03-25",
    reliability: "Official U.S. government portal",
    description: "Official complaint portal for consumer financial issues.",
  },
  {
    id: "cfpb-debt",
    title: "CFPB - Debt Collection",
    url: "https://www.consumerfinance.gov/consumer-tools/debt-collection/",
    sourceType: "portal",
    dateAdded: "2026-03-25",
    lastChecked: "2026-03-25",
    reliability: "Official U.S. government resource",
    description: "Official debt collection rights and complaint resource.",
  },
  {
    id: "hud-fairhousing",
    title: "HUD - File a Housing Discrimination Complaint",
    url: "https://www.hud.gov/fairhousing/fileacomplaint",
    sourceType: "portal",
    dateAdded: "2026-03-25",
    lastChecked: "2026-03-25",
    reliability: "Official U.S. government portal",
    description: "Official federal fair housing complaint portal.",
  },
  {
    id: "ftc-fraud",
    title: "FTC - Report Fraud",
    url: "https://reportfraud.ftc.gov/",
    sourceType: "portal",
    dateAdded: "2026-03-25",
    lastChecked: "2026-03-25",
    reliability: "Official U.S. government portal",
    description: "Official federal reporting portal for fraud and scams.",
  },
  {
    id: "naag-directory",
    title: "National Association of Attorneys General - AG Directory",
    url: "https://www.naag.org/find-my-ag/",
    sourceType: "portal",
    dateAdded: "2026-03-25",
    lastChecked: "2026-03-25",
    reliability: "Official state AG directory",
    description: "Directory linking to each state attorney general complaint portal.",
  },
];

export const entityMap = {
  entities: [
    "Hudson Homes Management LLC",
    "Hudson Advisors L.P.",
    "U.S. Bank Trust N.A.",
    "LSF9 Master Participation Trust",
  ],
  relationships: [
    {
      from: "Hudson Homes Management LLC",
      to: "Hudson Advisors L.P.",
      relationship: "wholly owned subsidiary",
      sourceId: "hudson-about",
      lastChecked: "2026-03-25",
    },
    {
      from: "Hudson Advisors L.P.",
      to: "LSF9 Master Participation Trust",
      relationship: "attorney-in-fact",
      sourceId: "sec-lsg",
      lastChecked: "2026-03-25",
    },
    {
      from: "U.S. Bank Trust N.A.",
      to: "LSF9 Master Participation Trust",
      relationship: "trustee for",
      sourceId: "sec-lsg",
      lastChecked: "2026-03-25",
    },
    {
      from: "Hudson Homes Management LLC",
      to: "Property owner (varies by record)",
      relationship: "as agent for owner",
      sourceId: "hudson-terms",
      lastChecked: "2026-03-25",
    },
  ],
};

export const courtRecords = {
  landlordTenant: [
    {
      caption: "Property Owner v. Tenant (sample docket tracking entry)",
      jurisdiction: "County Civil Court (varies by county)",
      filingDate: "2025-07-14",
      status: "Status shown on docket portal",
      sourceLink: "https://www.judyrecords.com/",
      summary:
        "Example placeholder for landlord/tenant filing entries maintained with neutral docket metadata.",
      lastChecked: "2026-03-25",
      sourceType: "docket",
    },
  ],
  foreclosureEjectment: [
    {
      caption: "Trustee/Servicer v. Occupant (sample ejectment-related docket entry)",
      jurisdiction: "State Court (varies by record)",
      filingDate: "2024-11-01",
      status: "Status shown on docket portal",
      sourceLink: "https://www.judyrecords.com/",
      summary:
        "Example placeholder for foreclosure or ejectment-related matters with linked public docket source.",
      lastChecked: "2026-03-25",
      sourceType: "docket",
    },
  ],
  trustAttorney: [
    {
      caption: "Recorded Instrument naming attorney-in-fact (sample index entry)",
      jurisdiction: "County Recorder Office (varies by county)",
      filingDate: "2023-09-12",
      status: "Recorded",
      sourceLink: "https://www.netronline.com/",
      summary:
        "Example placeholder for trust and attorney-in-fact records sourced from county document indexes.",
      lastChecked: "2026-03-25",
      sourceType: "county",
    },
  ],
  federalConsumer: [
    {
      caption: "Consumer v. Debt Collector (sample federal case tracking entry)",
      jurisdiction: "U.S. District Court (varies by district)",
      filingDate: "2024-04-18",
      status: "Status shown on PACER/CourtListener",
      sourceLink: "https://www.courtlistener.com/",
      summary:
        "Example placeholder for federal consumer or collection-related litigation metadata.",
      lastChecked: "2026-03-25",
      sourceType: "docket",
    },
  ],
};
