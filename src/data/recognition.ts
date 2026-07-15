// ---------------------------------------------------------------------------
// Real recognition pulled from your resume — publications, conference
// presentations, and teaching appointments. Edit freely.
// ---------------------------------------------------------------------------

export interface Publication {
  type: 'Publication' | 'Acknowledgement';
  authors: string;
  year: string;
  title: string;
  source: string;
  detail: string;
}

export const publications: Publication[] = [
  {
    type: 'Publication',
    authors: 'Vasta, G. R., et al.',
    year: '2020',
    title: 'Biochemical Characterization of Oyster and Clam Galectins.',
    source: 'Frontiers in Chemistry, 8',
    detail: '98',
  },
  {
    type: 'Acknowledgement',
    authors: 'Brown, S. M., et al.',
    year: '2025',
    title: 'Mapping the Edges of Mass Spectral Prediction.',
    source: 'Analytical Chemistry',
    detail: '97(19)',
  },
];

export const conferences: { name: string; year: string }[] = [
  { name: 'Gordon Research Conference', year: '2024' },
  { name: 'URCAD UMBC', year: '2020' },
  { name: 'NIH Glycoscience', year: '2019' },
];

export const teaching: { title: string; organization: string; date: string }[] = [
  { title: 'CAPSTONE Coordinator', organization: 'Stephen Freeland · UMBC', date: 'Jan 2025 – Aug 2025' },
  { title: 'Teaching Assistant, Linear Algebra', organization: 'Osman Guler, Daniel Reynolds · UMBC', date: 'Aug 2025 – Present' },
  { title: 'CRLA Certified Tutor', organization: 'Dept. of Undergraduate Affairs · UMBC', date: 'Aug 2025 – Present' },
];
