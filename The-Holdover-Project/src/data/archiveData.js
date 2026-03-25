export const siteMeta = {
  title: "The Holdover Project",
  subtitle: "A source-centered archive of publicly available court records, company materials, regulatory context, and tenant-submitted reports related to Hudson Homes Management LLC.",
  disclaimer:
    "This site compiles publicly available records and user-submitted reports. All summaries are based on source material and do not constitute legal conclusions or allegations of wrongdoing.",
  freshnessNote:
    "Counts and summaries may change as public records are updated. Each entry displays the date it was last reviewed.",
};

export const stats = [
  { label: "Documented source records", value: "18+" },
  { label: "States appearing in public materials", value: "5+" },
  { label: "Years covered in linked materials", value: "2020–2026" },
  { label: "Primary evidence tracks", value: "4" },
];

export const keyObservations = [
  "Public records indicate multi-state court activity over multiple years.",
  "Case captions and filings show Hudson Homes Management LLC appearing as agent, attorney-in-fact, or property manager in different contexts.",
  "Consumer complaint examples repeatedly reference maintenance, billing, deposit, lease termination, and collections issues.",
  "Linked materials include company sources, court records, judicial opinions, regulatory context, and official complaint portals.",
];

export const sourceRegistry = [
  {
    title: "Hudson Homes Management — Our Story",
    type: "Official Company Source",
    reliability: "Primary source",
    dateAdded: "2026-03-25",
    lastChecked: "2026-03-25",
    url: "https://hudsonhomesmanagement.com/our-story",
    description:
      "Company self-description stating Hudson Homes Management LLC is a wholly owned subsidiary of Hudson Advisors L.P. and operates in 61 U.S. markets.",
  },
  {
    title: "SEC filing describing Hudson Homes Management LLC subsidiary relationship",
    type: "SEC / Regulatory Filing",
    reliability: "Primary source",
    dateAdded: "2026-03-25",
    lastChecked: "2026-03-25",
    url: "https://www.sec.gov/Archives/edgar/data/1821440/000119312520273276/d926572ds1a.htm",
    description:
      "SEC filing describing Hudson Homes Management LLC as a subsidiary and discussing servicing or administrative relationships tied to Lone Star securitizations.",
  },
  {
    title: "New Mexico Court of Appeals — Hudson Homes Management LLC v. Bowker",
    type: "Judicial Opinion",
    reliability: "Primary source",
    dateAdded: "2026-03-25",
    lastChecked: "2026-03-25",
    url: "https://coa.nmcourts.gov/wp-content/uploads/sites/43/2024/12/December-31-2024-Hudson-Homes-Management-LLC-v.-Jennifer-Bowker-No.-A-1-CA-41655.pdf",
    description:
      "Opinion captioning Hudson Homes Management LLC as agent for owner, LSF9 Master Participation Trust.",
  },
  {
    title: "Delaware CourtConnect docket referencing Hudson Homes Management LLC as attorney-in-fact",
    type: "Court Docket",
    reliability: "Primary source",
    dateAdded: "2026-03-25",
    lastChecked: "2026-03-25",
    url: "https://courtconnect.courts.delaware.gov/cc/cconnect/ck_public_qry_doct.cp_dktrpt_docket_report?case_id=JP16-24-003337",
    description:
      "Public docket referencing Hudson Homes Management LLC as attorney-in-fact for U.S. Bank Trust N.A. as trustee for LSF9 Master Participation Trust.",
  },
  {
    title: "Michigan federal case — Nelson v. I.Q. Data International",
    type: "Judicial Opinion",
    reliability: "Primary source",
    dateAdded: "2026-03-25",
    lastChecked: "2026-03-25",
    url: "https://law.justia.com/cases/federal/district-courts/michigan/miedce/4%3A2022cv12710/365772/64/",
    description:
      "Federal opinion describing a debt collection letter naming Hudson Homes Management, LLC as creditor in post-tenancy balance litigation.",
  },
  {
    title: "BBB complaints profile for Hudson Homes Management LLC",
    type: "Third-Party Complaint",
    reliability: "Third-party platform",
    dateAdded: "2026-03-25",
    lastChecked: "2026-03-25",
    url: "https://www.bbb.org/us/tx/dallas/profile/leasing-services/hudson-homes-management-llc-0875-91053918/complaints",
    description:
      "Complaint archive used for complaint counts and example complaint themes. BBB notes that complaint text may not represent all complaints and is third-party information.",
  },
  {
    title: "SEC enforcement release involving Hudson Advisors and Lone Star Global",
    type: "SEC / Regulatory Filing",
    reliability: "Primary source",
    dateAdded: "2026-03-25",
    lastChecked: "2026-03-25",
    url: "https://www.sec.gov/newsroom/press-releases/2022-159",
    description:
      "SEC release on an enforcement action involving Hudson Advisors and Lone Star Global. Included as corporate or regulatory context, not as proof of tenant-related conduct.",
  },
  {
    title: "CFPB complaint portal",
    type: "Government Complaint Portal",
    reliability: "Primary source",
    dateAdded: "2026-03-25",
    lastChecked: "2026-03-25",
    url: "https://www.consumerfinance.gov/complaint/",
    description:
      "Official portal for consumer complaints involving debt collection, credit reporting, and related financial disputes.",
  },
  {
    title: "HUD Fair Housing complaint portal",
    type: "Government Complaint Portal",
    reliability: "Primary source",
    dateAdded: "2026-03-25",
    lastChecked: "2026-03-25",
    url: "https://www.hud.gov/fairhousing/fileacomplaint",
    description:
      "Official HUD complaint page for housing discrimination reports.",
  },
  {
    title: "FTC ReportFraud portal",
    type: "Government Complaint Portal",
    reliability: "Primary source",
    dateAdded: "2026-03-25",
    lastChecked: "2026-03-25",
    url: "https://reportfraud.ftc.gov/",
    description:
      "Official FTC reporting portal for deceptive business practices and related consumer issues.",
  },
];

export const entityMap = [
  {
    name: "Hudson Homes Management LLC",
    role: "Property manager / entity appearing in case captions",
    sourceType: "Official Company Source + Court Records",
    relationship: "Described by Hudson as a wholly owned subsidiary of Hudson Advisors L.P.; appears in case captions as agent, property manager, or attorney-in-fact depending on the record.",
  },
  {
    name: "Hudson Advisors L.P.",
    role: "Parent company context",
    sourceType: "Official Company Source",
    relationship: "Hudson's company materials describe Hudson Homes Management LLC as a wholly owned subsidiary of Hudson Advisors L.P.",
  },
  {
    name: "LSF9 Master Participation Trust",
    role: "Owner or trust entity named in case captions",
    sourceType: "Judicial Opinion / Court Docket",
    relationship: "Appears in public records with Hudson Homes Management LLC acting as agent for owner or linked representative.",
  },
  {
    name: "U.S. Bank Trust N.A. as Trustee for LSF9 Master Participation Trust",
    role: "Trustee entity named in public docket materials",
    sourceType: "Court Docket",
    relationship: "Appears in public Delaware docket materials where Hudson Homes Management LLC is described as attorney-in-fact.",
  },
];

export const cases = [
  {
    title: "Hudson Homes Management LLC v. Jennifer Bowker",
    category: "Trust / Agent Record",
    state: "New Mexico",
    court: "New Mexico Court of Appeals",
    caseNumber: "A-1-CA-41655",
    filingDate: "2024-12-31",
    status: "Opinion available",
    badge: "Judicial Opinion",
    lastChecked: "2026-03-25",
    url: "https://coa.nmcourts.gov/wp-content/uploads/sites/43/2024/12/December-31-2024-Hudson-Homes-Management-LLC-v.-Jennifer-Bowker-No.-A-1-CA-41655.pdf",
    summary:
      "The opinion captions Hudson Homes Management LLC as agent for owner, LSF9 Master Participation Trust, providing a public example of how entity relationships appear in court records.",
  },
  {
    title: "Delaware docket referencing Hudson Homes Management LLC as attorney-in-fact",
    category: "Trust / Attorney-in-Fact Record",
    state: "Delaware",
    court: "Justice of the Peace Court",
    caseNumber: "JP16-24-003337",
    filingDate: "2024",
    status: "Public docket entry",
    badge: "Court Docket",
    lastChecked: "2026-03-25",
    url: "https://courtconnect.courts.delaware.gov/cc/cconnect/ck_public_qry_doct.cp_dktrpt_docket_report?case_id=JP16-24-003337",
    summary:
      "The public docket lists Hudson Homes Management LLC as attorney-in-fact for U.S. Bank Trust N.A. as trustee for LSF9 Master Participation Trust.",
  },
  {
    title: "Nelson v. I.Q. Data International",
    category: "Federal Consumer / Collection Case",
    state: "Michigan",
    court: "U.S. District Court, Eastern District of Michigan",
    caseNumber: "4:22-cv-12710",
    filingDate: "2024-08-13",
    status: "Opinion available",
    badge: "Judicial Opinion",
    lastChecked: "2026-03-25",
    url: "https://law.justia.com/cases/federal/district-courts/michigan/miedce/4%3A2022cv12710/365772/64/",
    summary:
      "The opinion describes a debt collection letter identifying Hudson Homes Management, LLC as the creditor in litigation involving a post-tenancy balance.",
  },
  {
    title: "Hudson Homes Management LLC v. Siobhan Wiencek",
    category: "Landlord / Tenant",
    state: "Indiana",
    court: "Hamilton County Court",
    caseNumber: "46D04-2308-EV-001256",
    filingDate: "2023-08",
    status: "Public docket listing",
    badge: "Court Docket",
    lastChecked: "2026-03-25",
    url: "https://trellis.law/case/18091/46d04-2308-ev-001256/hudson-homes-management-llc-v-siobhan-wiencek",
    summary:
      "Public docket listing showing a landlord-tenant or possession-style matter involving Hudson Homes Management LLC in Indiana.",
  },
  {
    title: "Representative BBB complaint involving deposit, collections, and credit reporting",
    category: "Collections / Credit Reporting",
    state: "Texas profile listing",
    court: "BBB complaint archive",
    caseNumber: "N/A",
    filingDate: "2024",
    status: "Complaint and response visible on BBB profile",
    badge: "Third-Party Complaint",
    lastChecked: "2026-03-25",
    url: "https://www.bbb.org/us/tx/dallas/profile/leasing-services/hudson-homes-management-llc-0875-91053918/complaints",
    summary:
      "BBB complaint examples include disputes over move-out balances, deposit handling, collections, and requests to correct credit reporting after disputes.",
  },
];

export const complaintThemes = [
  {
    title: "Maintenance / service issues",
    detail: "BBB complaint categories currently show service or repair issues as the largest complaint bucket on the profile page.",
  },
  {
    title: "Billing issues",
    detail: "Public complaint examples and BBB category counts reference billing disputes, recurring charges, and move-out balances.",
  },
  {
    title: "Security deposit / move-out charges",
    detail: "Complaint examples reference deposit withholding, odor remediation charges, and move-out invoice disputes.",
  },
  {
    title: "Collections / credit reporting",
    detail: "Federal consumer litigation and BBB complaint examples show a separate track involving post-tenancy debt collection and requests to correct credit reporting.",
  },
];

export const companyContext = [
  "Hudson says Hudson Homes Management LLC is a wholly owned subsidiary of Hudson Advisors L.P.",
  "Hudson says the company operates in 61 U.S. markets and employs more than 250 people.",
  "BBB currently shows the company as accredited and also publishes a substantial complaint archive, making the profile relevant for balance as well as complaint tracking.",
  "The archive uses company materials, court records, complaint platforms, and official government portals side by side so readers can review both company context and dispute-related records.",
];

export const consumerActions = [
  {
    title: "CFPB complaint portal",
    url: "https://www.consumerfinance.gov/complaint/",
    detail: "For debt collection, credit reporting, or related financial disputes.",
  },
  {
    title: "CFPB debt collection help",
    url: "https://www.consumerfinance.gov/consumer-tools/debt-collection/",
    detail: "Official information about debt collection rights and complaint pathways.",
  },
  {
    title: "HUD fair housing complaint",
    url: "https://www.hud.gov/fairhousing/fileacomplaint",
    detail: "For housing discrimination complaints.",
  },
  {
    title: "FTC ReportFraud",
    url: "https://reportfraud.ftc.gov/",
    detail: "For consumer reports involving deceptive business practices or similar concerns.",
  },
  {
    title: "National Association of Attorneys General directory",
    url: "https://www.naag.org/find-my-ag/",
    detail: "Find the appropriate state attorney general complaint portal.",
  },
];
