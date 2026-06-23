import type { Metadata } from 'next';
import { OvrnBrandContent } from '@/modules/brands/components';

export const metadata: Metadata = {
  title: 'OVRN Studios - Brands - The MergeX Company',
  description:
    'OVRN Studios is the creative production infrastructure layer of The MergeX Company ecosystem, built for modern digital brands.',
  alternates: {
    canonical: 'https://mergex.in/brands/ovrn-studios',
  },
};

export default function OvrnStudiosBrandPage() {
  return (
    <main>
      <OvrnBrandContent />
    </main>
  );
}
