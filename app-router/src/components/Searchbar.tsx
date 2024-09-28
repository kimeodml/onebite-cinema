'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import style from '@/components/Searchbar.module.css';

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const q = searchParams.get('q') || '';

  useEffect(() => {
    setSearch(q);
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || search === q) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className={style.searchbar}>
      <input
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
        placeholder={'검색어를 입력하세요...'}
      />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
