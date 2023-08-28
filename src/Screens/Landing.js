import React from 'react';
import Hero from "../Component/hero";
import Navbar from "../Component/Navbar";
import SectionTitle from "../Component/sectionTitle";

import { benefitOne } from "../Component/data";
import Benefits from "../Component/benefits";
import Footer from "../Component/footer";
import Testimonials from "../Component/testimonials";
import Faq from "../Component/faq";


function Landing() {
  return (
   <>

      <Navbar />
      <Hero />
      <SectionTitle
        pretitle=" Benefits"
        title=" Why should you use DreamScribe">

DreamScribe is an AI-powered platform that transforms your dreams into stories and art. Customize AI suggestions, choose from various content formats, and explore dream meanings. With collaboration options and sleep data integration, it's a creative space to turn your dreams into captivating content.


      </SectionTitle>
       <Benefits data={benefitOne} />
    
      
     
      <Testimonials />
      <SectionTitle pretitle="FAQ" title="Frequently Asked Questions">
      </SectionTitle>
      <Faq />
      <Footer />
   </>
  );
}

export default Landing;



