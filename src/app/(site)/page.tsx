import Hero from '@/components/site/Hero';
import Partners from '@/components/site/Partners';
import WhatWeDo from '@/components/site/WhatWeDo';
import AIPractice from '@/components/site/AIPractice';
import ProjectSteps from '@/components/site/ProjectSteps';
import DataHandling from '@/components/site/DataHandling';
import SelectedWork from '@/components/site/SelectedWork';
import About from '@/components/site/About';
import Contact from '@/components/site/Contact';
import StructuredData from '@/components/site/StructuredData';
import { FLAGS } from '@/lib/flags';

/** Homepage, in the block order of spec 7.3. */
export default function Home() {
  return (
    <>
      <StructuredData />
      <Hero />
      {FLAGS.SHOW_PARTNERS && <Partners />}
      <WhatWeDo />
      <AIPractice />
      <ProjectSteps />
      {FLAGS.SHOW_DATA_HANDLING && <DataHandling />}
      <SelectedWork />
      <About />
      <Contact />
    </>
  );
}
