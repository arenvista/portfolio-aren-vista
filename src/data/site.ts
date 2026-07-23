// ---------------------------------------------------------------------------
// Personal info, sourced from your resume. Edit freely — this is the only
// place most of the site's copy comes from.
// ---------------------------------------------------------------------------

export const site = {
    name: "Aren Vista",
    roles: ["Software Engineer", "Mathematician", "Computational Biologist"],
    tagline: "Insert some witty quote here.",
    location: "UMBC · Baltimore, MD",
    email: "arenv1@umbc.edu",
    // Set to false to hide the "Available for new work" badge in the hero.
    available: true,
    bio: [
        "Hi! I'm a guy who likes making stuff — too many things, really. I find, design, and build things to make my life a little easier and to explore my many hobbies. This site is where I share what I know, in the hopes I get to see some cool things back. I live out on the East Coast with my wonderful girlfriend and one crazy dog, and work hard to keep myself supplied in coffee. Much of what's here is really just for me — and for my students, who keep asking for my material.",
        "Outside of work I write stories, paint, and bake pottery with friends.",
    ],
} as const;

export interface EducationItem {
    degree: string;
    school: string;
    year: string;
}

export const education: EducationItem[] = [
    {
        degree: "B.S. Mathematics, Computer Science, Biochemistry",
        school: "University of Maryland, Baltimore County",
        year: "2027",
    },
];

export interface ExperienceItem {
    title: string;
    date: string;
    organization: string;
    bullets: string[];
}

export const experience: ExperienceItem[] = [
    {
        title: "Undergraduate Researcher — Mathematics",
        date: "Dec 2025 – Present",
        organization: "Bedrich Sousedik · UMBC",
        bullets: [
            "Research optimized betting strategies using Markov Chain Monte Carlo (MCMC) methods.",
            "Develop probabilistic models to evaluate risk, expected return, and long-term strategy performance.",
        ],
    },
    {
        title: "Undergraduate Researcher — Computer Engineering",
        date: "Dec 2025 – Present",
        organization: "Riadul Islam · UMBC",
        bullets: [
            "Develop spiking neural networks (SNNs) for classification of temporal data.",
            "Design convolutional neural networks (CNNs) for image classification tasks.",
        ],
    },
    {
        title: "Project Lead — Computational Biologist",
        date: "Jun 2021 – Jun 2023",
        organization: "National Institutes of Health",
        bullets: [
            "Established a Git-based version control system to coordinate development across labs.",
            "Applied K-Means and DBSCAN to cluster multivariate data for anomaly detection and disease pathology.",
            "Built automated HPC/SWARM workflows and a CLI tool to accelerate 3D amino acid structure generation.",
        ],
    },
    {
        title: "Undergraduate Researcher — Organic Chemistry",
        date: "Jun 2017 – Jun 2020",
        organization: "Seley Radtke Lab · UMBC",
        bullets: [
            "Curated a database of approved nucleoside analogues using Python, BeautifulSoup, and Selenium.",
            "Designed a synthetic pathway for N-glycosylated imidazole 4-boronic acids, increasing yields by 40%.",
        ],
    },
];

export interface Skill {
    label: string;
    category: "language" | "tool" | "concept";
}

export const skills: Skill[] = [
    { label: "Python 3", category: "language" },
    { label: "C++17", category: "language" },
    { label: "MATLAB", category: "language" },
    { label: "C", category: "language" },
    { label: "Lua", category: "language" },
    { label: "Bash", category: "language" },
    { label: "LaTeX", category: "language" },
    { label: "Rust", category: "language" },
    { label: "PyTorch", category: "tool" },
    { label: "pandas", category: "tool" },
    { label: "NumPy", category: "tool" },
    { label: "Docker", category: "tool" },
    { label: "Ansible", category: "tool" },
    { label: "Raylib", category: "tool" },
    { label: "Selenium", category: "tool" },
    { label: "AlphaFold 2", category: "tool" },
    { label: "MCMC", category: "concept" },
    { label: "SNNs", category: "concept" },
    { label: "CNNs", category: "concept" },
    { label: "DBSCAN", category: "concept" },
    { label: "t-SNE", category: "concept" },
    { label: "PCA", category: "concept" },
];

export interface SocialLink {
    label: string;
    href: string;
}

export const socials: SocialLink[] = [
    { label: "GitHub", href: "https://github.com/arenvista" },
    { label: "GitLab", href: "https://gitlab.com/arenvista" },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/aren-vista-079199203/",
    },
];

export const nav = [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Recognition", href: "#recognition" },
    { label: "Notes", href: "/notes" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
];
