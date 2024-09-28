import SearchBar from '@/components/Searchbar';
import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Suspense fallback={<div>로딩중입니다...</div>}>
        <SearchBar />
      </Suspense>
      {children}
    </div>
  );
}
