// pages/index.js
'use client';

import { useEffect } from 'react';
import TopContent from './TopContent';
import Idea from './Idea';
import Contribution from './Contribution';
import Support from './Support';
import TellUs from './TellUs';
import { Footer, Navbar } from '../../../components/marketing';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

export default function How() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Whether animation should happen only once
    });
  }, []);

  return (
    <div>
      <main>
        <TopContent />
        <Idea />
        <Contribution />
        <Support />
        <TellUs />
      </main>
    </div>
  );
}
