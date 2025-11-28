import type { GalleryItem } from '../components/CaseStudy';
import React from 'react';

export interface CaseStudyData {
  title: string;
  description: string | React.ReactNode;
  scope: (string | React.ReactNode)[];
  galleryItems: GalleryItem[];
}

export const CASE_STUDIES: CaseStudyData[] = [
  {
    title: "Canary",
    description: "Finding the subversive space in an industry saturated with green-washed, minimal brands presenting tired monotony.",
    scope: [
      "Brand strategy",
      "Visual identity",
      "Illustration",
      "Art direction",
      "Copywriting"
    ],
    galleryItems: [
      { type: 'image', src: 'canary/logo.jpg' },
      { type: 'video', src: '/canary/brush.mp4', className: 'half' },
      { type: 'image', src: 'canary/icon.png', className: 'half' },
      { type: 'image', src: 'canary/guide.jpg' },
      { type: 'image', src: 'canary/cover2.jpg' },
      { type: 'image', src: 'canary/kids.jpg', className: 'half' },
      { type: 'image', src: 'canary/skate.png', className: 'half' },
      { type: 'image', src: 'canary/hero.gif' }
    ]
  },
  {
    title: "Bloop",
    description: "Transforming a once-hidden chore into a household celebration with small-batch, all-natural laundry soap that is free of both harmful chemicals <i>and</i> typical hippy scents.",
    scope: [
      "Brand strategy",
      "Visual identity",
      "Illustration",
      "Art direction",
      "Copywriting"
    ],
    galleryItems: [
      { type: 'video', src: '/bloop/bloop-suds.mp4' },
      { type: 'image', src: 'bloop/bloop-hands.jpg' },
      { type: 'image', src: 'bloop/bloop-product.jpg', className: 'half' },
      { type: 'video', src: '/bloop/bloop-vibe.mp4', className: 'half' },
      { type: 'image', src: 'bloop/bloop-posters.jpg' }
    ]
  },
  {
    title: "Dusty Times",
    description: "An annual lifestyle journal celebrating the world of desert racing and overlanding. Spotlighting the spirit of adventure, resilience, and the relentless pursuit of victory by highlighting the stories on the fringes of the spotlight.",
    scope: [
      "Design direction",
      "Layout design",
      "Illustration",
      "Photo retouching",
      "Copywriting"
    ],
    galleryItems: [
      { type: 'image', src: 'dtimes/dt-stack.jpg' },
      { type: 'image', src: 'dtimes/dt5-snake.jpg' },
      { type: 'image', src: 'dtimes/dtspreads.gif' },
      { type: 'image', src: 'dtimes/dt5-stack.jpg' },
      { type: 'image', src: 'dtimes/united-in-dirt.jpg' }
    ]
  }
];

