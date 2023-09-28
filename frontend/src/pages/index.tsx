import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Header } from "@/components/Headers";

import { RecentAds } from "@/components/RecentAds";


export default function Home() {
  return (
    <>
       <body>
       <main className="main-content">
     
      <RecentAds />
       </main>
  </body>
    </>
  );
}
