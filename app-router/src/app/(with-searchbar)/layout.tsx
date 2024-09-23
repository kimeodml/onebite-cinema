import SearchBar from '@/components/Searchbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SearchBar />
      {children}
    </div>
  );
}
