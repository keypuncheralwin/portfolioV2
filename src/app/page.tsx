"use client";

import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import { ReactElement } from 'react';

export default function Home() {
  return (
    <Layout>
      {({ theme, toggleTheme }: { theme: "light" | "dark"; toggleTheme: () => void }) => (
        <>
          <Header theme={theme} toggleTheme={toggleTheme} />
          <Hero />
          <Experience />
        </>
      )}
    </Layout>
  );
}
