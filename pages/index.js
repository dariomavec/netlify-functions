import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import JokeBlock from "@components/JokeBlock";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next.js Toolbox</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Sauna Scraper" />
        <JokeBlock />
      </main>
      <Footer />
    </div>
  );
}
