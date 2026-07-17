// ---------------------------------------------------------------------------
// Personal info, sourced from your resume. Edit freely — this is the only
// place most of the site's copy comes from.
// ---------------------------------------------------------------------------

export const site = {
    name: 'Aren Vista',
    roles: ["Software Engineer", "Mathematician", "Computational Biologist"],
    tagline: 'I build fast, considered interfaces and the systems behind them.',
    location: 'UMBC · Baltimore, MD',
    email: 'arenv1@umbc.edu',
    // Set to false to hide the "Available for new work" badge in the hero.
    available: true,
    bio: [
        "I'm a guy who likes making stuff — too many things, really. I find, design, and build things to make my life a little easier and to explore my many hobbies. This site is where I share what I know, in the hopes I get to see some cool things back. I live out on the East Coast with my wonderful girlfriend and one crazy dog, and work hard to keep myself supplied in coffee.  To learn more about the site and what I'm trying to do with it, start here. From there, you'll find a big list of sections and pages over on the left (or tucked into the menu if you're on mobile). There's a lot to explore, much of it is really just for me, and for my students who keep asking for my material.",
        'Outside of work I write stories, paint, and bake pottery with friends.',
    ],
} as const;

export interface EducationItem {
    degree: string;
    school: string;
    year: string;
}

export const education: EducationItem[] = [
    {
        degree: 'B.S. Mathematics, Computer Science, Biochemistry',
        school: 'University of Maryland, Baltimore County',
        year: '2027',
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
        title: 'Undergraduate Researcher — Mathematics',
        date: 'Dec 2025 – Present',
        organization: 'Bedrich Sousedik · UMBC',
        bullets: [
            'Research optimized betting strategies using Markov Chain Monte Carlo (MCMC) methods.',
            'Develop probabilistic models to evaluate risk, expected return, and long-term strategy performance.',
        ],
    },
    {
        title: 'Undergraduate Researcher — Computer Engineering',
        date: 'Dec 2025 – Present',
        organization: 'Riadul Islam · UMBC',
        bullets: [
            'Develop spiking neural networks (SNNs) for classification of temporal data.',
            'Design convolutional neural networks (CNNs) for image classification tasks.',
        ],
    },
    {
        title: 'Project Lead — Computational Biologist',
        date: 'Jun 2021 – Jun 2023',
        organization: 'National Institutes of Health',
        bullets: [
            'Established a Git-based version control system to coordinate development across labs.',
            'Applied K-Means and DBSCAN to cluster multivariate data for anomaly detection and disease pathology.',
            'Built automated HPC/SWARM workflows and a CLI tool to accelerate 3D amino acid structure generation.',
        ],
    },
    {
        title: 'Undergraduate Researcher — Organic Chemistry',
        date: 'Jun 2017 – Jun 2020',
        organization: 'Seley Radtke Lab · UMBC',
        bullets: [
            'Curated a database of approved nucleoside analogues using Python, BeautifulSoup, and Selenium.',
            'Designed a synthetic pathway for N-glycosylated imidazole 4-boronic acids, increasing yields by 40%.',
        ],
    },
];

export interface Skill {
    label: string;
    category: 'language' | 'tool' | 'concept';
    // 0-100. Used to drive the animated skill bars in About.astro. Editable —
    // these are rough self-assessments, not derived from anything external.
    level?: number;
}

export const skills: Skill[] = [
    { label: 'Python 3', category: 'language', level: 92 },
    { label: 'C++17', category: 'language', level: 85 },
    { label: 'MATLAB', category: 'language', level: 75 },
    { label: 'C', category: 'language', level: 70 },
    { label: 'Lua', category: 'language', level: 55 },
    { label: 'Bash', category: 'language', level: 78 },
    { label: 'LaTeX', category: 'language', level: 80 },
    { label: 'Rust', category: 'language', level: 45 },
    { label: 'PyTorch', category: 'tool', level: 82 },
    { label: 'pandas', category: 'tool', level: 88 },
    { label: 'NumPy', category: 'tool', level: 88 },
    { label: 'Docker', category: 'tool', level: 70 },
    { label: 'Ansible', category: 'tool', level: 60 },
    { label: 'Raylib', category: 'tool', level: 65 },
    { label: 'Selenium', category: 'tool', level: 75 },
    { label: 'AlphaFold 2', category: 'tool', level: 68 },
    { label: 'MCMC', category: 'concept', level: 80 },
    { label: 'SNNs', category: 'concept', level: 65 },
    { label: 'CNNs', category: 'concept', level: 72 },
    { label: 'DBSCAN', category: 'concept', level: 78 },
    { label: 't-SNE', category: 'concept', level: 70 },
    { label: 'PCA', category: 'concept', level: 82 },
];

export interface SocialLink {
    label: string;
    href: string;
}

export const socials: SocialLink[] = [
    { label: 'GitHub', href: 'https://github.com/arenvista' },
    { label: 'RSS', href: '/rss.xml' },
];

export const nav = [
    { label: 'About', href: '#about' },
    { label: 'Recognition', href: '#recognition' },
    { label: 'Projects', href: '#projects' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
];
