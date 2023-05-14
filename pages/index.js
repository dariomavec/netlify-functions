import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import ScrapeTrigger from "@components/ScrapeTrigger";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next.js Toolbox</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Sauna Scraper" />
        <ScrapeTrigger />
      </main>
      <Footer />
    </div>
  );
}
