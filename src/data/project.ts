export interface Project {
    slug: string;
    title: string;
    summary: string;
    year: string;
    tags: string[];
    /** Where the frame / title link goes: case study, live site, or repo. */
    href: "/projects/";
    repo?: string;
    featured?: boolean;
    /** Appears in the scroll-driven work showcase. */
    showcase?: boolean;
    /** Which live canvas scene plays as this project's "footage" (see src/scripts/previews.ts). */
    preview?: string;
    /**
     * Optional real footage. Drop an mp4/webm into /public (e.g. /previews/slug.mp4)
     * and set this — the showcase will use the video instead of the canvas scene.
     */
    video?: string;
}

// Descriptions and repo links restored from resume.astro — the previous file
// had "update this description" placeholders and several projects pointing at
// the wrong repository (a copy/paste artifact). TinyOS and Math-o-nomicon
// still lack dedicated repos on your profile, so they point at your GitHub
// until you publish them.
export const projects: Project[] = [
    {
        slug: "game-of-life",
        title: "Game of Life",
        summary:
            "Conway's Game of Life implemented in C++ using Raylib — cellular automata at 60fps.",
        year: "2025",
        tags: ["C++", "Raylib"],
        href: "/projects/game-of-life",
        repo: "https://github.com/arenvista/game_of_life",
        featured: true,
        showcase: true,
        preview: "life",
    },
    {
        slug: "audio-recommendation",
        title: "Audio Recommendation",
        summary:
            "A music recommender using aligned audio and lyric embeddings to bypass metadata and collaborative filtering.",
        year: "2025",
        tags: ["Python", "PyTorch"],
        href: "/projects/audio-recommendation",
        repo: "https://github.com/arenvista/AudioRecomendation",
        featured: true,
        showcase: true,
        preview: "waveform",
    },
    {
        slug: "snapdaemon",
        title: "SnapDaemon",
        summary:
            "Software implementation of Wooting keyboards' SnapTap feature — last-input-wins key resolution as a background daemon.",
        year: "2024",
        tags: ["C++", "Linux"],
        href: "/projects/snapdaemon",
        repo: "https://github.com/arenvista",
        showcase: true,
        preview: "keys",
    },
    {
        slug: "tinyos",
        title: "TinyOS",
        summary:
            "A tiny operating system written in x86 assembly and C++ — bootloader to shell. Work in progress.",
        year: "2023",
        tags: ["ASM", "C++"],
        href: "/projects/tinyos",
        repo: "https://github.com/arenvista",
        showcase: true,
        preview: "boot",
    },
    {
        slug: "chess-cpp",
        title: "ChessC++",
        summary:
            "Command-line chess engine in C++ using Ncurses — my first real exposure to programming.",
        year: "2025",
        tags: ["C++", "Ncurses"],
        href: "/projects/chess-cpp",
        repo: "https://github.com/arenvista/chess",
        showcase: true,
        preview: "chess",
    },
    {
        slug: "math-o-nomicon",
        title: "Math-o-nomicon",
        summary:
            "A LaTeX compendium covering topics from Numerical Linear Algebra to Real Analysis.",
        year: "2024",
        tags: ["LaTeX"],
        href: "/projects/mathonomicon",
        repo: "https://github.com/arenvista",
        showcase: true,
        preview: "math",
    },
    {
        slug: "blood-on-the-clocktower",
        title: "Blood on the Clocktower",
        summary:
            "Discord bot that helps run the board game 'Blood on the Clocktower' — roles, nominations, night order.",
        year: "2023",
        tags: ["Python", "Discord"],
        href: "/projects/botct",
        repo: "https://github.com/arenvista/BotCT",
        preview: "clock",
    },
    {
        slug: "textedit",
        title: "TextEdit",
        summary: "Terminal-based text editor in C++ using Ncurses.",
        year: "2024",
        tags: ["C++", "Ncurses"],
        href: "/projects/textedit",
        repo: "https://github.com/arenvista/textedit",
        preview: "edit",
    },
    {
        slug: "mango-nana",
        title: "Mango Nana",
        summary:
            "Storefront selling figurines and sculptures — Astro, TSX, and Stripe.",
        year: "2023",
        tags: ["Astro", "TypeScript", "Stripe"],
        href: "/projects/mangonana",
        repo: "https://github.com/arenvista",
        preview: "browser",
    },
    {
        slug: "portfolio-me",
        title: "portfolio.me",
        summary:
            "This site — Astro + TypeScript with live canvas work previews, hosted on AWS.",
        year: "2026",
        tags: ["Astro", "TypeScript", "AWS"],
        href: "/projects/",
        repo: "https://github.com/arenvista/portfolio",
        featured: true,
        preview: "browser",
    },
    {
        slug: "ascautopayroll",
        title: "ASCAutopayroll",
        summary:
            "A Selenium tool automating UMBC student timesheets — auto-filling PeopleSoft.",
        year: "2022",
        tags: ["Python", "Selenium"],
        href: "/projects/ascautopayroll",
        repo: "https://github.com/arenvista/ASCAutoPayroll",
        preview: "form",
    },
];
