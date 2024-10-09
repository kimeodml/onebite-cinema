import './globals.css';
import style from '@/app/layout.module.css';
import Link from 'next/link';

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={'/'}>ONEBITE CINEMA</Link>
          </header>
          <main>{children}</main>
        </div>
        {modal}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
