import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useTranslations } from 'next-intl';
import { Button } from '../retroui/Button';
import { IconMenu3 } from '@tabler/icons-react';
import Link from 'next/link';

const MobilMenu = () => {
  const t = useTranslations('Common.Header');

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="md:hidden" variant={'outline'} size={'icon'}>
          <IconMenu3 />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="flex flex-col gap-6">
        <SheetHeader className="flex flex-col items-center">
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <div className="flex mt-4 gap-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 160"
            className="h-9 w-9"
          >
            <path
              fill="currentColor"
              d="M 75.36,45.39 C 80.93,35.58 86.31,26.09 92.56,15.10 C 119.73,63.00 145.09,109.48 170.40,155.88 C 169.04,157.80 167.65,157.30 166.40,157.30 C 151.24,157.35 136.08,157.24 120.92,157.43 C 118.89,157.47 117.64,156.09 116.65,153.63 C 99.72,120.88 82.67,88.19 65.56,55.54 C 64.37,53.63 64.13,52.28 65.39,50.29 C 68.18,45.21 70.61,39.92 75.36,45.39 Z"
            />
            <path
              fill="currentColor"
              d="M 15.00,157.32 C 9.54,157.33 4.58,157.33 -1.22,157.33 C 9.28,138.97 19.04,121.87 29.59,103.42 C 40.12,121.82 50.84,138.85 62.40,157.32 C 49.61,157.32 38.56,157.32 15.00,157.32 Z"
            />
          </svg>
        </div>
        <nav className="flex flex-col gap-4  px-4 text-start mt-6">
          <Link href="/" className="hover:underline">
            {t('navLinks.home')}
          </Link>
          <a href="/store" className="hover:underline">
            {t('navLinks.store')}
          </a>
          <Link href="/distributors" className="hover:underline">
            {t('navLinks.distributors')}
          </Link>
          <Link href="/about" className="hover:underline">
            {t('navLinks.about')}
          </Link>
          <Link href="/contact" className="hover:underline">
            {t('navLinks.contact')}
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobilMenu;
