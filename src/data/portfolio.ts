/**
 * Single source of truth for every piece of content on the site.
 * All facts are taken from Diya Fathima M's CV — nothing here is invented.
 */

export const profile = {
  name: "Diya Fathima M",
  firstName: "Diya",
  initials: "DF",
  role: "Junior MIS Executive",
  location: "Kozhikode, Kerala",
  email: "diyafathimamop@gmail.com",
  linkedin: "https://linkedin.com/in/diya-fathima-m-0ab172284",
  cv: "/Diya-Fathima-M-CV.pdf",
  bannerImage: "/images/bannerimg.png",
  aboutImage: "/images/aboutimg.jpeg",
  summary:
    "Detail-oriented BCom Professional graduate working as a Junior MIS Executive, with experience in MIS reporting, audit support and data analysis.",
  heroLine:
    "I turn SAP and Excel data into accurate, decision-ready MIS reports for management — backed by audit support, reconciliations and Power BI analytics projects.",
} as const;

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

export const footerLinks = [
  ...navLinks.slice(0, 5),
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export const marqueeItems = [
  "MIS Reporting",
  "SAP",
  "Advanced Excel",
  "Power BI",
  "SQL",
  "Tableau",
  "Audit Support",
  "Reconciliation",
  "Variance Analysis",
  "Power Query",
] as const;

/** `*word*` marks an italic accent. */
export const aboutStatement =
  "Detail-oriented *Bachelor of Commerce* graduate and Junior MIS Executive, focused on *accurate reporting*, audit support and data analysis — with a habit of learning *analytics tools* on my own.";

export const aboutParagraphs = [
  "Day to day I prepare daily, weekly and monthly MIS reports from Excel and SAP data, reconcile figures across systems, and prepare the audit schedules that internal and statutory audits rely on.",
  "Outside of work I deepen my analytics skills through self-learning projects in Power BI and Tableau, and I use AI tools such as ChatGPT, Microsoft Copilot, Google Gemini, Claude and Perplexity AI to speed up analysis and report preparation.",
] as const;

export const strengths = [
  {
    title: "Accuracy first",
    text: "Consistent, verified records and reporting across periods.",
  },
  {
    title: "Audit & reconciliation",
    text: "Data verification, reconciliation statements and exception reports.",
  },
  {
    title: "Excel automation",
    text: "Reusable templates that cut turnaround time and manual errors.",
  },
  {
    title: "Self-driven analytics",
    text: "Power BI dashboards built through independent learning.",
  },
] as const;

export type SkillGroup = {
  id: string;
  title: string;
  icon: "chart" | "table" | "calculator" | "scale" | "sparkles" | "heart";
  items: readonly string[];
};

export const skillGroups: readonly SkillGroup[] = [
  {
    id: "reporting",
    title: "Reporting & Analytics",
    icon: "chart",
    items: [
      "MIS Reporting",
      "Management Reports",
      "Audit Reports",
      "Power BI (Dashboard Development)",
      "Financial Data Analysis",
      "SQL (Data Querying)",
      "Tableau",
    ],
  },
  {
    id: "excel",
    title: "MS Excel",
    icon: "table",
    items: [
      "VLOOKUP",
      "XLOOKUP",
      "INDEX-MATCH",
      "SUMIFS / COUNTIFS",
      "Pivot Tables & Charts",
      "Power Query",
      "Conditional Formatting",
      "Data Validation",
      "Slicers",
      "Advanced Formulas",
      "Data Analysis",
      "Dashboards",
      "AI-based Features",
    ],
  },
  {
    id: "accounting",
    title: "Accounting Software",
    icon: "calculator",
    items: ["SAP", "Zoho Books", "QuickBooks", "Tally", "Peachtree"],
  },
  {
    id: "finance",
    title: "Finance & Compliance",
    icon: "scale",
    items: [
      "Financial Accounting & Reporting",
      "Bookkeeping",
      "Bank Reconciliation",
      "GST",
      "VAT",
      "Corporate Tax",
    ],
  },
  {
    id: "ai",
    title: "AI & Productivity Tools",
    icon: "sparkles",
    items: [
      "ChatGPT",
      "Microsoft Copilot",
      "Google Gemini",
      "Claude",
      "Perplexity AI",
    ],
  },
  {
    id: "soft",
    title: "Working Style",
    icon: "heart",
    items: [
      "Attention to Detail",
      "Analytical Thinking",
      "Problem-Solving",
      "Time Management",
      "Organizational Skills",
      "Accuracy & Efficiency",
    ],
  },
];

export const experience = [
  {
    company: "Western International Group",
    role: "Junior MIS Executive",
    start: "March 2026",
    end: "Present",
    intro:
      "Responsible for timely, accurate MIS reporting and audit support, working with finance and operations teams to resolve data discrepancies.",
    themes: [
      {
        title: "MIS & management reporting",
        points: [
          "Prepare daily, weekly and monthly MIS reports from MS Excel and SAP data, delivered on time to management.",
          "Prepare MIS summaries, performance and variance reports for senior management review and decision-making.",
          "Build Excel dashboards and charts (bar, line, pie, combo) that present trends, variances and performance summaries.",
        ],
      },
      {
        title: "Excel analysis & automation",
        points: [
          "Automate daily reports with formulas, Pivot Tables and Pivot Charts to track key business metrics.",
          "Analyse data with VLOOKUP, XLOOKUP, INDEX-MATCH, SUMIFS, COUNTIFS, AVERAGEIFS, IF/IFS and nested formulas.",
          "Streamline recurring reports with reusable templates, improving turnaround time and reducing manual errors.",
        ],
      },
      {
        title: "Data preparation",
        points: [
          "Clean and standardise large datasets with Text-to-Columns, Remove Duplicates, TRIM/CLEAN, Find & Replace, Flash Fill and Power Query.",
          "Prepare reports from SAP exports using text, date and logical functions such as TEXT, LEFT, RIGHT, MID, CONCAT, DATEDIF and EOMONTH.",
          "Build structured, easy-to-read reports with Data Validation, Conditional Formatting, Sorting, Filters and Slicers.",
          "Protect, format and prepare worksheets for sharing, using Excel's AI-based features to speed up analysis and report preparation.",
        ],
      },
      {
        title: "Audit & reconciliation",
        points: [
          "Perform reconciliations and variance analysis across SAP and Excel data, using Goal Seek and What-If Analysis where required.",
          "Prepare audit reports and supporting schedules — data verification, reconciliation statements and exception reports — for internal and statutory audits.",
          "Provide audit support through documentation, data verification and reconciliation activities.",
          "Maintain accurate records and keep reporting consistent across periods.",
        ],
      },
    ],
  },
] as const;

export const projects = [
  {
    index: "01",
    title: "Impact of Digital Payment Apps on Consumer Spending Behaviour",
    short: "Digital Payments & Spending",
    type: "Research & data analysis",
    description:
      "A research project analysing how digital payment applications influence consumer spending behaviour, from primary data collection through to dashboards and recommendations.",
    highlights: [
      "Designed and distributed structured questionnaires with Microsoft Forms.",
      "Collected, cleaned and analysed the survey data in Advanced Excel.",
      "Built visual reports and dashboards in Excel and Power BI to show spending trends and consumer preferences.",
      "Interpreted the findings into structured insights and recommendations.",
    ],
    flow: ["Microsoft Forms", "Advanced Excel", "Power BI", "Insights"],
    tools: ["Microsoft Forms", "Advanced Excel", "Power BI"],
  },
  {
    index: "02",
    title: "Amazon Sales Data Analysis",
    short: "Amazon Sales Analysis",
    type: "Self-learning analytics project",
    description:
      "A self-learning initiative to strengthen data analysis and visualisation skills, using a Kaggle dataset covering Amazon sales from 2020 to 2024.",
    highlights: [
      "Prepared and analysed the data to identify sales trends and purchasing patterns.",
      "Developed interactive dashboards and visualisations in Power BI.",
      "Interpreted key insights on product performance and sales behaviour.",
    ],
    flow: ["Kaggle dataset", "Data preparation", "Power BI", "Insights"],
    tools: ["Kaggle", "Power BI"],
  },
] as const;

/** How the CV's responsibilities chain together, from raw SAP/Excel data to a reviewed report. */
export const workflow = [
  {
    step: "Source",
    title: "Pull the data",
    text: "Daily, weekly and monthly figures from MS Excel and SAP exports.",
    tools: ["SAP", "MS Excel"],
  },
  {
    step: "Clean",
    title: "Standardise it",
    text: "Large datasets tidied so every downstream number can be trusted.",
    tools: ["Text-to-Columns", "Remove Duplicates", "TRIM / CLEAN", "Power Query"],
  },
  {
    step: "Reconcile",
    title: "Match the numbers",
    text: "Reconciliations and variance analysis across SAP and Excel data.",
    tools: ["Variance analysis", "Goal Seek", "What-If Analysis"],
  },
  {
    step: "Analyse",
    title: "Find the story",
    text: "Lookups, conditional totals and pivots that surface trends.",
    tools: ["XLOOKUP", "INDEX-MATCH", "SUMIFS", "Pivot Tables"],
  },
  {
    step: "Report",
    title: "Present it clearly",
    text: "Dashboards and MIS summaries built for easy management reading.",
    tools: ["Pivot Charts", "Slicers", "Conditional Formatting"],
  },
  {
    step: "Review",
    title: "Stand behind it",
    text: "Audit schedules and exception reports for internal and statutory audits.",
    tools: ["Reconciliation statements", "Exception reports"],
  },
] as const;

export const education = [
  {
    title: "Bachelor of Commerce (Professional)",
    institution: "St. Joseph's College (Autonomous), Devagiri",
    period: "2022 – 2025",
  },
  {
    title: "Higher Secondary Education — Commerce",
    institution: "Auxilium Nava Jyoti School",
    period: "2020 – 2022",
  },
] as const;

export const certifications = [
  "Power BI for Data Visualization and Dashboard Development",
  "Advanced Excel including AI-based Features and Data Analysis",
  "E-Filing: GST",
  "GEN AI",
] as const;

export const languages = [
  { name: "English", level: "Upper Intermediate" },
  { name: "Malayalam", level: "Upper Intermediate" },
  { name: "Hindi", level: "Intermediate" },
] as const;
