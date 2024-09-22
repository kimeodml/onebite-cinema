import { ReactNode } from "react";
import Link from "next/link";
import style from "@/components/global-layout.module.css";


export default function GlobalLayout({children}: { children: ReactNode }) {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href={"/"}>ONEBITE CINEMA</Link>
      </header>
      <main className={style.main}>
        {children}
      </main>
    </div>
  );
}
