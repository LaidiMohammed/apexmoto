import type { Metadata } from 'next';
import './globals.css';
import { Shell } from '@/components/shell';

export const metadata: Metadata = {
  title: 'APEX MOTO — Showroom Bir El Djir, Oran',
  description: 'MT · Z · Sportives · Scooters — neuf & occasion contrôlée. PCJR+7C4 Bir El Djir, ouvert jusqu\'à 21h, 0550 92 76 64.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className="grain">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
