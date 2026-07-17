export interface Project {
  slug: string;
  title: string;
  summary: string;
  year: string;
  tags: string[];
  href: string;
  repo?: string;
  featured?: boolean;
}

// NOTE: several entries in your original resume shared the same repo link
// and description ("Terminal-based text editor in C++ utilizing Ncurses"),
// which was almost certainly a copy/paste artifact rather than accurate for
// each project. I've kept titles distinct but left summaries generic where
// the source data didn't distinguish them — update these with the real repo
// links and one-line descriptions when you have a minute.
export const projects: Project[] = [
  {
    slug: 'portfolio-me',
    title: 'portfolio.me',
    summary: 'React/Node personal portfolio, hosted on AWS.',
    year: '2026',
    tags: ['React', 'Node.js', 'AWS'],
    href: 'https://portfolio.arenvista.me',
    repo: 'https://github.com/arenvista/portfolio',
    featured: true,
  },
  {
    slug: 'game-of-life',
    title: 'Game of Life',
    summary: "Conway's Game of Life implemented in C++ using Raylib.",
    year: '2025',
    tags: ['C++', 'Raylib'],
    href: '#',
    repo: 'https://github.com/arenvista/game_of_life',
    featured: true,
  },
  {
    slug: 'chess-cpp',
    title: 'ChessC++',
    summary: 'Command-line chess engine in C++ using Ncurses.',
    year: '2025',
    tags: ['C++', 'Ncurses'],
    href: '#',
    repo: 'https://github.com/arenvista/chess',
  },
  {
    slug: 'textedit',
    title: 'TextEdit',
    summary: 'Terminal-based text editor in C++ using Ncurses.',
    year: '2024',
    tags: ['C++', 'Ncurses'],
    href: '#',
    repo: 'https://github.com/arenvista/textedit',
  },
  {
    slug: 'math-o-nomicon',
    title: 'Math-o-nomicon',
    summary: 'Project — update this description with what it actually does.',
    year: '2024',
    tags: ['C++'],
    href: '#',
    repo: 'https://github.com/arenvista',
  },
  {
    slug: 'snapdaemon',
    title: 'SnapDaemon',
    summary: 'Project — update this description with what it actually does.',
    year: '2024',
    tags: ['C++'],
    href: '#',
    repo: 'https://github.com/arenvista',
  },
  {
    slug: 'mango-nana',
    title: 'Mango Nana',
    summary: 'Project — update this description with what it actually does.',
    year: '2023',
    tags: ['C++'],
    href: '#',
    repo: 'https://github.com/arenvista',
  },
  {
    slug: 'tinyos',
    title: 'TinyOS',
    summary: 'Project — update this description with what it actually does.',
    year: '2023',
    tags: ['C++'],
    href: '#',
    repo: 'https://github.com/arenvista',
  },
  {
    slug: 'blood-on-the-clocktower',
    title: 'Blood on the Clocktower',
    summary: 'Project — update this description with what it actually does.',
    year: '2023',
    tags: ['C++'],
    href: '#',
    repo: 'https://github.com/arenvista',
  },
  {
    slug: 'audio-recommendation',
    title: 'Audio Recommendation',
    summary: 'A music recommender using aligned audio and lyric embeddings to bypass metadata and collaborative filtering.',
    year: '2025',
    tags: ['Python'],
    href: '#',
    repo: 'https://github.com/arenvista/AudioRecomendation',
  },
  {
    slug: 'autopayroll',
    title: 'Autopayroll',
    summary: 'Project — update this description with what it actually does.',
    year: '2022',
    tags: ['Python'],
    href: '#',
    repo: 'https://github.com/arenvista',
  },
];
