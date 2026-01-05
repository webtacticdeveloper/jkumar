export interface CSRSection {
  title: string;
  slug: string;
  quote: string;
  images: string[];
  description: string;
  person: string;
}

export const csrData: CSRSection[] = [
  {
    title: "Tree Plantation Drive",
    slug: "tree-plantation-drive",
    quote: "“Conservation is the key.”",
    images: [
      "/images/csr/csr-tree/cst1.jpeg",
      "/images/csr/csr-tree/cst2.jpeg",
      "/images/csr/csr-tree/cst3.jpeg",
      "/images/csr/csr-tree/cst4.jpeg",
      "/images/csr/csr-tree/cst5.jpeg",
      "/images/csr/csr-tree/cst6.jpeg",
      "/images/csr/csr-tree/cst7.jpeg",
      "/images/csr/csr-tree/cst8.jpeg",
      "/images/csr/csr-tree/cst9.jpeg",
      "/images/csr/csr-tree/cst10.jpeg",
      "/images/csr/csr-tree/cst11.jpeg",
      "/images/csr/csr-tree/cst12.jpeg",
    ],
    description:
      "The tree which moves some to tears of joy is in the eyes of others only a green thing ...",
    person: "William Blake",
  },
  {
    title: "J. Kumar International School",
    slug: "jkumar-international-school",
    quote: "“An investment in knowledge pays the best interest.”",
    images: [
      "/images/csr/csr-school/school1.jpeg",
      "/images/csr/csr-school/school2.webp",
      "/images/csr/csr-school/school3.webp",
    ],
    description:
      "Education is the best friend. An educated person is respected everywhere ...",
    person: "Chanakya",
  },
];
