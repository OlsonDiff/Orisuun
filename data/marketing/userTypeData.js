import resource from '../../public/userTypes/icons/resource.svg';
import community from '../../public/userTypes/icons/community.svg';
import funding from '../../public/userTypes/icons/funding.svg';
import directory from '../../public/userTypes/icons/directory.svg';
import mentorship from '../../public/userTypes/icons/mentorship.svg';
import expert from '../../public/userTypes/icons/expert.svg';
import safety from '../../public/userTypes/icons/safety.svg';
import transaction from '../../public/userTypes/icons/transactions.svg';
import matching from '../../public/userTypes/icons/matching.svg';
import discount from '../../public/userTypes/icons/discount.svg';
import privateChat from '../../public/userTypes/icons/privateChat.svg';
import publicP from '../../public/userTypes/icons/publicP.svg';
import market from '../../public/userTypes/images/market.png';
import board from '../../public/userTypes/images/board.png';
import support from '../../public/userTypes/images/black-owned.png';
import contract from '../../public/userTypes/images/contract.png';
import purpose from '../../public/userTypes/images/purpose.png';
import scientific from '../../public/userTypes/images/scientific.png';
import exclusive from '../../public/userTypes/images/exclusive.png';
import spend from '../../public/userTypes/images/spend.png';
import study from '../../public/userTypes/images/study.png';
import paris from '../../public/userTypes/images/paris.png';
import instrument from '../../public/userTypes/images/instrument.png';
import custom from '../../public/userTypes/images/custom.png';

import write from '../../public/userTypes/images/write.png';
import raise from '../../public/userTypes/images/raise.png';

import social from '../../public/userTypes/images/social.png';
import profile from '../../public/userTypes/images/profile.png';

export const programs = [
  {
    img: resource,
    title: 'Resource Hub',
    details:
      'A comprehensive resource hub providing tools, guides, and information.',
  },
  {
    img: community,
    title: 'Community Network',
    details:
      'Connect with Black business owners to exchange insights, share experiences, and explore collaboration opportunities.',
  },
  {
    img: funding,
    title: 'Funding Access',
    details:
      'Gain access to exclusive funding opportunities, including grants, loans, and investments for Black-owned businesses.',
  },
  {
    img: directory,
    title: 'Business Directory',
    details:
      'A searchable directory of Black-owned businesses to increase visibility and facilitate connections.',
  },
  {
    img: mentorship,
    title: 'Mentorship Program',
    details:
      'A structured mentorship program linking experienced entrepreneurs with those seeking guidance and support.',
  },
  {
    img: expert,
    title: 'Experts & experience',
    details:
      'Connect with industry experts and leverage their experience for professional growth.',
  },
  {
    img: safety,
    title: 'Safety & security',
    details:
      'Enjoy a secure platform with robust safety measures to protect your business information.',
  },
  {
    img: transaction,
    title: 'Escrow-based Transactions',
    details:
      'Contract with other members confidently with our escrow-based transaction system with dispute resolution.',
  },
  {
    img: matching,
    title: 'Matching',
    details:
      'Get matched with potential partners, investors, and collaborators to boost your business opportunities.',
  },
];

export const usersTypes = [
  {
    userType: 'black-owned-businesses',
    description1:
      'Black-owned businesses are at the center of Orisuun’s mission and system.',
    description2:
      'Our platform bridges the gap between Black-owned businesses and a network of investors, mentors, clients, professionals, and consultants eager to lend their expertise.',
    description3:
      'From investors seeking promising ventures to seasoned mentors offering invaluable guidance to professionals offering specialized services to potential clients seeking innovative solutions – our platform facilitates meaningful connections that will propel your business forward. Orisuun is your compass on the path to success.',
    getStarted: {
      heading: 'Build Something & Make a Difference',
      details:
        'Get funded! Find mentors, experts, consultants, and customers all eager to help you grow.',
    },
    programs: [
      {
        img: matching,
        title: 'Resource Hub',
        details:
          'A comprehensive resource hub providing tools, guides, and information tailored for Black-owned businesses.',
      },
      {
        img: community,
        title: 'Community Network',
        details:
          'Connect with fellow Black business owners to exchange insights, share experiences, and explore collaboration opportunities.',
      },
      {
        img: funding,
        title: 'Funding Access',
        details:
          'Gain access to exclusive funding opportunities, including grants, loans, and investments for Black-owned businesses.',
      },
      {
        img: directory,
        title: 'Business Directory',
        details:
          'A searchable directory of Black-owned businesses to increase visibility and facilitate connections.',
      },
      {
        img: mentorship,
        title: 'Mentorship Program',
        details:
          'A structured mentorship program linking experienced entrepreneurs with those seeking guidance and support.',
      },
      {
        img: expert,
        title: 'Experts & experience',
        details:
          'Connect with industry experts and leverage their experience to grow your business effectively.',
      },
      {
        img: safety,
        title: 'Safety & security',
        details:
          'Enjoy a secure platform with robust safety measures to protect your business information.',
      },
      {
        img: discount,
        title: 'Discounts',
        details:
          'Access exclusive discounts on essential services and products to help your business save and grow.',
      },
      {
        img: matching,
        title: 'Matching',
        details:
          'Get matched with potential partners, investors, and collaborators to boost your business opportunities.',
      },
    ],
    priceCards: {
      monthly: {
        card1: {
          title: 'Visibility and Collaboration',
          price: '$4.99',
          period: '/Month',
        },
        card2: {
          title: 'Growth, Visibility and Collaboration',
          price: '$8.99',
          period: '/Month',
        },
      },
      quarterly: {
        card1: {
          title: 'Visibility and Collaboration',
          price: '$11.99',
          period: '/Quarter',
          button1: '$3.99/month',
          button2: '~34% Savings',
        },
        card2: {
          title: 'Growth, Visibility and Collaboration',
          price: '$28.99',
          period: '/Quarter',
          button1: '$3.99/month',
          button2: '~34% Savings',
        },
      },
      annually: {
        card1: {
          title: 'Visibility and Collaboration',
          price: '$11.99',
          period: '/Year',
          button1: '$3.99/month',
          button2: '~42% Savings',
        },
        card2: {
          title: 'Growth, Visibility and Collaboration',
          price: '$28.99',
          period: '/Year',
          button1: '$9.66/month',
          button2: '~42% Savings',
        },
      },
    },
    sections: {
      section1: {
        image: raise,
        heading: 'Raise funds for your business',
        paragraph1:
          'Secure the capital you need to grow and expand your business by connecting with investors on the Orisuun platform.',
        paragraph2:
          'We provide a streamlined process to help you raise funds efficiently and effectively, ensuring you have the financial support necessary to reach your goals.',
        paragraph3: 'Our 1% charge is among the lowest you can find online.',
        buttonText: 'Raise funds',
      },
      section2: {
        image: social,
        heading: 'Hire Professionals with Confidence',
        paragraph1:
          'Find and hire top professionals, business consultants, and experts directly on our site.',
        paragraph2:
          'Orisuun provides a secure environment with our Escrow and Dispute Resolution System, ensuring the integrity and trustworthiness of your business transactions.',
        paragraph3: 'Our 1% charge is among the lowest you can find online.',
        buttonText: 'Find professionals',
      },
      section3: {
        image: market,
        heading:
          'Let the Orisuun network know about business opportunities you offer and are seeking',
        paragraph1:
          'Broadcast the opportunities you offer and seek within the Orisuun network.',
        paragraph2:
          'Our platform enables you to communicate your business needs and offerings, fostering valuable connections and potential collaborations that can drive your business forward.',
        buttonText: 'Find opportunities',
      },
      section4: {
        image: profile,
        heading:
          'Get found by eager potential clients and customers through our sophisticated database',
        paragraph1:
          'We have the most sophisticated and comprehensive database of Black-owned businesses in the world.',
        paragraph2:
          'We also have an exceptionally large constituent of members dedicated to finding new Black-owned businesses to support.',
        paragraph3: 'Get your business found!',
        buttonText: 'Get found',
      },
      section5: {
        image: spend,
        heading: 'Attract New Customers with Discounts',
        paragraph1:
          'Introduce your business to new customers by offering exclusive discounts.',
        paragraph2:
          "Utilize Orisuun's platform to reach a wider audience and incentivize potential clients to choose your services or products, boosting your customer base and sales.",
        buttonText: 'Find new customers',
      },
      section6: {
        image: exclusive,
        heading: 'Choose your own exclusive and custom Orisuun web address',
        paragraph1: 'All members have the option to create public profiles. ',
        paragraph2:
          'Use your profile to promote yourself and your accomplishments on Orisuun',
        buttonText: 'Choose web address',
      },
      section7: {
        image: custom,
        heading: 'Choose your own exclusive and custom Orisuun web address',
        paragraph1: 'All members have the option to create public profiles. ',
        paragraph2:
          'Use your profile to promote yourself and your accomplishments on Orisuun',
        buttonText: 'Choose web address',
      },
    },
  },
  {
    userType: 'professionals',
    description1:
      'Orisuun is where professionals meet purpose. Our innovative online platform seamlessly connects skilled professionals with a diverse array of Black-owned businesses, fostering impactful collaborations and supporting economic empowerment within the community.',
    description2:
      'Through our intuitive platform, professionals gain access to a robust collection of businesses eager to grow, spanning industries from technology to fashion and everything in between. Elevate your impact with Orisuun.',
    getStarted: {
      heading: 'Elevate your impact with Orisuun',
      details:
        'Get paid to for your services while helping Black-owned businesses grow.',
    },
    programs: [
      {
        img: resource,
        title: 'Resource Hub',
        details:
          'A comprehensive resource hub providing tools, guides, and information.',
      },
      {
        img: community,
        title: 'Community Network',
        details:
          'Connect with Black business owners to exchange insights, share experiences, and explore collaboration opportunities.',
      },
      {
        img: funding,
        title: 'Funding Access',
        details:
          'Gain access to exclusive funding opportunities, including grants, loans, and investments for Black-owned businesses.',
      },
      {
        img: directory,
        title: 'Business Directory',
        details:
          'A searchable directory of Black-owned businesses to increase visibility and facilitate connections.',
      },
      {
        img: mentorship,
        title: 'Mentorship Program',
        details:
          'A structured mentorship program linking experienced entrepreneurs with those seeking guidance and support.',
      },
      {
        img: expert,
        title: 'Experts & experience',
        details:
          'Connect with industry experts and leverage their experience for professional growth.',
      },
      {
        img: safety,
        title: 'Safety & security',
        details:
          'Enjoy a secure platform with robust safety measures to protect your business information.',
      },
      {
        img: transaction,
        title: 'Escrow-based Transactions',
        details:
          'Contract with other members confidently with our escrow-based transaction system with dispute resolution.',
      },
      {
        img: matching,
        title: 'Matching',
        details:
          'Get matched with potential partners, investors, and collaborators to boost your business opportunities.',
      },
    ],
    priceCards: {
      monthly: {
        card1: {
          title: 'Visibility and Collaboration',
          price: '$4.99',
          period: '/Month',
        },
        card2: {
          title: 'Growth, Visibility and Collaboration',
          price: '$8.99',
          period: '/Month',
        },
      },
      quarterly: {
        card1: {
          title: 'Visibility and Collaboration',
          price: '$11.99',
          period: '/Quarter',
          button1: '$3.99/month',
          button2: '~34% Savings',
        },
        card2: {
          title: 'Growth, Visibility and Collaboration',
          price: '$28.99',
          period: '/Quarter',
          button1: '$3.99/month',
          button2: '~34% Savings',
        },
      },
      annually: {
        card1: {
          title: 'Visibility and Collaboration',
          price: '$11.99',
          period: '/Year',
          button1: '$3.99/month',
          button2: '~42% Savings',
        },
        card2: {
          title: 'Growth, Visibility and Collaboration',
          price: '$28.99',
          period: '/Year',
          button1: '$3.99/month',
          button2: '~42% Savings',
        },
      },
    },
    sections: {
      section1: {
        image: market,
        heading:
          'Let the Orisuun network know about business opportunities you offer and are seeking',
        paragraph1:
          'Broadcast the opportunities you offer and seek within the Orisuun network.',
        paragraph2:
          'Our platform enables you to communicate your business needs and offerings, fostering valuable connections and potential collaborations that can drive your business forward.',
        buttonText: 'Find opportunities',
      },
      section2: {
        image: board,
        heading:
          'Find promising Black-owned businesses in your niche looking for co-founders or board members',
        paragraph1:
          'Broadcast the opportunities you offer and seek within the Orisuun network.',
        paragraph2:
          'Our platform enables you to communicate your business needs and offerings, fostering valuable connections and potential collaborations that can drive your business forward.',
        buttonText: 'Find businesses',
      },
      section3: {
        image: support,
        heading: 'Donate to Black-Owned Businesses',
        paragraph1:
          'Make a direct impact by donating to Black-owned businesses and providing them with the financial support they need.',
        paragraph2:
          'Your contributions help these businesses overcome financial barriers and achieve their goals, fostering economic growth within the community.',
        buttonText: 'Start donating',
      },
      section4: {
        image: contract,
        heading:
          'Work directly with Black-owned businesses on our platform safely and securely',
        paragraph1:
          'Contract with other members confidently, knowing that all transactions are handled securely by Stripe and that any disputes will be handled in a timely manner by Orisuun.',
        paragraph2: 'Take advantage of our low transaction fee (just 1%).',
        buttonText: 'Work with businesses',
      },
    },
  },
  {
    userType: 'experts',
    description1:
      "At Orisuun, we recognize the invaluable role expertise plays in driving success. By democratizing access to expertise, we empower Black-owned businesses to thrive in today's competitive landscape, fostering innovation and sustainable growth.",
    description2:
      'Our platform serves as the nexus, seamlessly integrating entrepreneurs with the precise knowledge and skills they need to thrive. Welcome to a transformative space where experts and expertise meet opportunity, powering the growth and prosperity of Black-owned enterprises.',
    getStarted: {
      heading: 'Elevate your support for Black entrepreneurship on Orisuun',
      details:
        'Get paid to for your expertise while helping Black-owned businesses grow',
    },
    programs: [
      {
        img: resource,
        title: 'Resource Hub',
        details:
          'A comprehensive resource hub providing tools, guides, and information.',
      },
      {
        img: community,
        title: 'Community Network',
        details:
          'Connect with Black business owners to exchange insights, share experiences, and explore collaboration opportunities.',
      },
      {
        img: funding,
        title: 'Funding Access',
        details:
          'Gain access to exclusive funding opportunities, including grants, loans, and investments for Black-owned businesses.',
      },
      {
        img: directory,
        title: 'Business Directory',
        details:
          'A searchable directory of Black-owned businesses to increase visibility and facilitate connections.',
      },
      {
        img: mentorship,
        title: 'Mentorship Program',
        details:
          'A structured mentorship program linking experienced entrepreneurs with those seeking guidance and support.',
      },
      {
        img: expert,
        title: 'Experts & experience',
        details:
          'Connect with industry experts and leverage their experience for professional growth.',
      },
      {
        img: safety,
        title: 'Safety & security',
        details:
          'Enjoy a secure platform with robust safety measures to protect your business information.',
      },
      {
        img: transaction,
        title: 'Escrow-based Transactions',
        details:
          'Contract with other members confidently with our escrow-based transaction system with dispute resolution.',
      },
      {
        img: matching,
        title: 'Matching',
        details:
          'Get matched with potential partners, investors, and collaborators to boost your business opportunities.',
      },
    ],
    priceCards: {
      monthly: {
        card1: {
          title: 'Visibility and Collaboration',
          price: '$4.99',
          period: '/Month',
        },
        card2: {
          title: 'Growth, Visibility and Collaboration',
          price: '$8.99',
          period: '/Month',
        },
      },
      quarterly: {
        card1: {
          title: 'Visibility and Collaboration',
          price: '$11.99',
          period: '/Quarter',
          button1: '$3.99/month',
          button2: '~34% Savings',
        },
        card2: {
          title: 'Growth, Visibility and Collaboration',
          price: '$28.99',
          period: '/Quarter',
          button1: '$3.99/month',
          button2: '~34% Savings',
        },
      },
      annually: {
        card1: {
          title: 'Visibility and Collaboration',
          price: '$11.99',
          period: '/Year',
          button1: '$3.99/month',
          button2: '~42% Savings',
        },
        card2: {
          title: 'Growth, Visibility and Collaboration',
          price: '$28.99',
          period: '/Year',
          button1: '$3.99/month',
          button2: '~42% Savings',
        },
      },
    },
    sections: {
      section1: {
        image: market,
        heading:
          'Let the Orisuun network know about business opportunities you offer and are seeking',
        paragraph1:
          'Broadcast the opportunities you offer and seek within the Orisuun network.',
        paragraph2:
          'Our platform enables you to communicate your business needs and offerings, fostering valuable connections and potential collaborations that can drive your business forward.',
        buttonText: 'Find opportunities',
      },
      section2: {
        image: board,
        heading:
          'Fin promising Black-owned businesses in your niche looking for co-founders or board members',
        paragraph1:
          'Broadcast the opportunities you offer and seek within the Orisuun network.',
        paragraph2:
          'Our platform enables you to communicate your business needs and offerings, fostering valuable connections and potential collaborations that can drive your business forward.',
        buttonText: 'Find businesses',
      },
      section3: {
        image: support,
        heading: 'Donate to Black-Owned Businesses',
        paragraph1:
          'Make a direct impact by donating to Black-owned businesses and providing them with the financial support they need.',
        paragraph2:
          'Your contributions help these businesses overcome financial barriers and achieve their goals, fostering economic growth within the community.',
        buttonText: 'Start donating',
      },
      section4: {
        image: contract,
        heading:
          'Work directly with Black-owned businesses on our platform safely and securely',
        paragraph1:
          'Contract with other members confidently, knowing that all transactions are handled securely by Stripe and that any disputes will be handled in a timely manner by Orisuun.',
        paragraph2: 'Take advantage of our low transaction fee (just 1%).',
        buttonText: 'Work with businesses',
      },
    },
  },
  {
    userType: 'mentors',
    description1:
      "In today's competitive landscape, mentorship is not just a luxury but a necessity for success. From guidance on strategy to navigating challenges and building networks, we foster a supportive community for growth and success. Mentors are here to mark the playing field and give the guidance they wish they had.",
    description2: '',
    getStarted: {
      heading: 'Elevate your impact with Orisuun',
      details:
        'Get paid to use your experience to help Black-owned businesses grow',
    },
    programs: [
      {
        img: resource,
        title: 'Resource Hub',
        details:
          'A comprehensive resource hub providing tools, guides, and information.',
      },
      {
        img: community,
        title: 'Community Network',
        details:
          'Connect with Black business owners to exchange insights, share experiences, and explore collaboration opportunities.',
      },
      {
        img: funding,
        title: 'Funding Access',
        details:
          'Gain access to exclusive funding opportunities, including grants, loans, and investments for Black-owned businesses.',
      },
      {
        img: directory,
        title: 'Business Directory',
        details:
          'A searchable directory of Black-owned businesses to increase visibility and facilitate connections.',
      },
      {
        img: mentorship,
        title: 'Mentorship Program',
        details:
          'A structured mentorship program linking experienced entrepreneurs with those seeking guidance and support.',
      },
      {
        img: expert,
        title: 'Experts & experience',
        details:
          'Connect with industry experts and leverage their experience for professional growth.',
      },
      {
        img: safety,
        title: 'Safety & security',
        details:
          'Enjoy a secure platform with robust safety measures to protect your business information.',
      },
      {
        img: transaction,
        title: 'Escrow-based Transactions',
        details:
          'Contract with other members confidently with our escrow-based transaction system with dispute resolution.',
      },
      {
        img: matching,
        title: 'Matching',
        details:
          'Get matched with potential partners, investors, and collaborators to boost your business opportunities.',
      },
    ],
    priceCards: {
      monthly: {
        card1: {
          title: 'Visibility and Collaboration',
          price: '$4.99',
          period: '/Month',
        },
        card2: {
          title: 'Growth, Visibility and Collaboration',
          price: '$8.99',
          period: '/Month',
        },
      },
      quarterly: {
        card1: {
          title: 'Visibility and Collaboration',
          price: '$11.99',
          period: '/Quarter',
          button1: '$3.99/month',
          button2: '~34% Savings',
        },
        card2: {
          title: 'Growth, Visibility and Collaboration',
          price: '$28.99',
          period: '/Quarter',
          button1: '$3.99/month',
          button2: '~34% Savings',
        },
      },
      annually: {
        card1: {
          title: 'Visibility and Collaboration',
          price: '$11.99',
          period: '/Year',
          button1: '$3.99/month',
          button2: '~42% Savings',
        },
        card2: {
          title: 'Growth, Visibility and Collaboration',
          price: '$28.99',
          period: '/Year',
          button1: '$3.99/month',
          button2: '~42% Savings',
        },
      },
    },
    sections: {
      section1: {
        image: market,
        heading:
          'Let the Orisuun network know about business opportunities you offer and are seeking',
        paragraph1:
          'Broadcast the opportunities you offer and seek within the Orisuun network.',
        paragraph2:
          'Our platform enables you to communicate your business needs and offerings, fostering valuable connections and potential collaborations that can drive your business forward.',
        buttonText: 'Find opportunities',
      },
      section2: {
        image: board,
        heading:
          'Fin promising Black-owned businesses in your niche looking for co-founders or board members',
        paragraph1:
          'Broadcast the opportunities you offer and seek within the Orisuun network.',
        paragraph2:
          'Our platform enables you to communicate your business needs and offerings, fostering valuable connections and potential collaborations that can drive your business forward.',
        buttonText: 'Find businesses',
      },
      section3: {
        image: support,
        heading: 'Donate to Black-Owned Businesses',
        paragraph1:
          'Make a direct impact by donating to Black-owned businesses and providing them with the financial support they need.',
        paragraph2:
          'Your contributions help these businesses overcome financial barriers and achieve their goals, fostering economic growth within the community.',
        buttonText: 'Start donating',
      },
      section4: {
        image: contract,
        heading:
          'Work directly with Black-owned businesses on our platform safely and securely',
        paragraph1:
          'Contract with other members confidently, knowing that all transactions are handled securely by Stripe and that any disputes will be handled in a timely manner by Orisuun.',
        paragraph2: 'Take advantage of our low transaction fee (just 1%).',
        buttonText: 'Work with businesses',
      },
    },
  },
  {
    userType: 'management-consultants',
    description1:
      "For Black-owned businesses, navigating the complex landscape of management consulting can be daunting. That's where we step in. Our platform simplifies the process, empowering businesses to access specialized knowledge and strategic guidance tailored to their unique challenges and goals. Whether it's streamlining operations, devising growth strategies, or enhancing organizational efficiency, our consultants bring a wealth of experience to the table, ready to drive tangible results and foster long-term sustainability.",
    description2:
      'Through our intuitive platform, management consultants gain access to a robust collection of businesses eager to grow, spanning industries from technology to fashion and everything in between. You are uniquely qualified for maximum impact. Get paid to make a difference.',
    getStarted: {
      heading: 'Elevate your impact with Orisuun',
      details:
        'Get paid to for your unique skills while helping Black-owned businesses grow',
    },
    programs: [
      {
        img: resource,
        title: 'Resource Hub',
        details:
          'A comprehensive resource hub providing tools, guides, and information.',
      },
      {
        img: community,
        title: 'Community Network',
        details:
          'Connect with Black business owners to exchange insights, share experiences, and explore collaboration opportunities.',
      },
      {
        img: funding,
        title: 'Funding Access',
        details:
          'Gain access to exclusive funding opportunities, including grants, loans, and investments for Black-owned businesses.',
      },
      {
        img: directory,
        title: 'Business Directory',
        details:
          'A searchable directory of Black-owned businesses to increase visibility and facilitate connections.',
      },
      {
        img: mentorship,
        title: 'Mentorship Program',
        details:
          'A structured mentorship program linking experienced entrepreneurs with those seeking guidance and support.',
      },
      {
        img: expert,
        title: 'Experts & experience',
        details:
          'Connect with industry experts and leverage their experience for professional growth.',
      },
      {
        img: safety,
        title: 'Safety & security',
        details:
          'Enjoy a secure platform with robust safety measures to protect your business information.',
      },
      {
        img: transaction,
        title: 'Escrow-based Transactions',
        details:
          'Contract with other members confidently with our escrow-based transaction system with dispute resolution.',
      },
      {
        img: matching,
        title: 'Matching',
        details:
          'Get matched with potential partners, investors, and collaborators to boost your business opportunities.',
      },
    ],
    priceCards: {
      monthly: {
        card1: {
          title: 'Visibility and Collaboration',
          price: '$4.99',
          period: '/Month',
        },
        card2: {
          title: 'Growth, Visibility and Collaboration',
          price: '$8.99',
          period: '/Month',
        },
      },
      quarterly: {
        card1: {
          title: 'Visibility and Collaboration',
          price: '$11.99',
          period: '/Quarter',
          button1: '$3.99/month',
          button2: '~34% Savings',
        },
        card2: {
          title: 'Growth, Visibility and Collaboration',
          price: '$28.99',
          period: '/Quarter',
          button1: '$3.99/month',
          button2: '~34% Savings',
        },
      },
      annually: {
        card1: {
          title: 'Visibility and Collaboration',
          price: '$11.99',
          period: '/Year',
          button1: '$3.99/month',
          button2: '~42% Savings',
        },
        card2: {
          title: 'Growth, Visibility and Collaboration',
          price: '$28.99',
          period: '/Year',
          button1: '$3.99/month',
          button2: '~42% Savings',
        },
      },
    },
    sections: {
      section1: {
        image: market,
        heading:
          'Let the Orisuun network know about business opportunities you offer and are seeking',
        paragraph1:
          'Broadcast the opportunities you offer and seek within the Orisuun network.',
        paragraph2:
          'Our platform enables you to communicate your business needs and offerings, fostering valuable connections and potential collaborations that can drive your business forward.',
        buttonText: 'Find opportunities',
      },
      section2: {
        image: board,
        heading:
          'Fin promising Black-owned businesses in your niche looking for co-founders or board members',
        paragraph1:
          'Broadcast the opportunities you offer and seek within the Orisuun network.',
        paragraph2:
          'Our platform enables you to communicate your business needs and offerings, fostering valuable connections and potential collaborations that can drive your business forward.',
        buttonText: 'Find businesses',
      },
      section3: {
        image: support,
        heading: 'Donate to Black-Owned Businesses',
        paragraph1:
          'Make a direct impact by donating to Black-owned businesses and providing them with the financial support they need.',
        paragraph2:
          'Your contributions help these businesses overcome financial barriers and achieve their goals, fostering economic growth within the community.',
        buttonText: 'Start donating',
      },
      section4: {
        image: contract,
        heading:
          'Work directly with Black-owned businesses on our platform safely and securely',
        paragraph1:
          'Contract with other members confidently, knowing that all transactions are handled securely by Stripe and that any disputes will be handled in a timely manner by Orisuun.',
        paragraph2: 'Take advantage of our low transaction fee (just 1%).',
        buttonText: 'Work with businesses',
      },
    },
  },

  {
    userType: 'partners',
    description1:
      'Orisuun\'s partners are a crucial part of what we do.',
    description2:
      'We provide a large number of avenues for our partners to get involved.',
    description3:
      'Our partners can match fundraising donations on individual campaigns or whole categories. The Discount Portal is designed to allow our partners to introduce themselves to a whole new set of potential clients and customers. The professionals and experts on your team are welcome sign up and serve through a custom affiliation program.',
    description4:
      "We encourage you to reach out to us for any custom arrangements that fit your needs. We'd be happy to discuss.",
    getStarted: {
      heading: 'Build Something & Make a Difference',
      details:
        'Grow your customer base, increase rention, and support Black-owned businesses - all in one place.',
    },
    programs: [
      {
        img: resource,
        title: 'Resource Hub',
        details:
          'A comprehensive resource hub providing tools, guides, and information.',
      },
      {
        img: community,
        title: 'Community Network',
        details:
          'Connect with fellow Black business owners to exchange insights, share experiences, and explore collaboration opportunities.',
      },
      {
        img: funding,
        title: 'Funding Access',
        details:
          'Gain access to exclusive funding opportunities, including grants, loans, and investments for Black-owned businesses.',
      },
      {
        img: directory,
        title: 'Business Directory',
        details:
          'A searchable directory of Black-owned businesses to increase visibility and facilitate connections.',
      },
      {
        img: mentorship,
        title: 'Mentorship Program',
        details:
          'A structured mentorship program linking experienced entrepreneurs with those seeking guidance and support.',
      },
      {
        img: expert,
        title: 'Experts & experience',
        details:
          'Connect with industry experts and leverage their experience to grow your business effectively.',
      },
      {
        img: safety,
        title: 'Safety & security',
        details:
          'Enjoy a secure platform with robust safety measures to protect your business information.',
      },
      {
        img: discount,
        title: 'Discounts',
        details:
          'Access exclusive discounts on essential services and products to help your business save and grow.',
      },
      {
        img: matching,
        title: 'Matching',
        details:
          'Get matched with potential partners, investors, and collaborators to boost your business opportunities.',
      },
    ],
    priceCards: {
      monthly: {
        card2: {
          title: 'Growth, Visibility and Collaboration',
          price: 'Contact us',
          period: '',
        },
      },
      quarterly: {
        card2: {
          title: 'Growth, Visibility and Collaboration',
          price: 'Contact us',
          period: '',
        },
      },
      annually: {
        card2: {
          title: 'Growth, Visibility and Collaboration',
          price: 'Contact us',
          period: '',
        },
      },
    },
    sections: {
      section1: {
        image: purpose,
        heading:
          'Match Fundraising Campaign Donations for Black-Owned Businesses',
        paragraph1:
          'Amplify your impact by matching donations for fundraising campaigns of Black-owned businesses.',
        paragraph2:
          'By doubling contributions, you significantly boost their funding efforts, allowing them to expand and thrive more effectively.',
        buttonText: 'Match a campaign',
      },

      section2: {
        image: scientific,
        heading: 'Find New Vendors',
        paragraph1:
          'Expand your business network by finding new vendors through Orisuun.',
        paragraph2:
          'Discover reliable Black-owned vendors who can supply high-quality goods and services.',
        buttonText: 'Find vendors',
      },
      section3: {
        image: spend,
        heading: 'Attract New Customers with Discounts',
        paragraph1:
          'Introduce your business to new customers by offering exclusive discounts.',
        paragraph2:
          "Utilize Orisuun's platform to reach a wider audience and incentivize potential clients to choose your services or products, boosting your customer base and sales.",
        buttonText: 'Find new customers',
      },
    },
  },
  {
    userType: 'investors',
    description1:
      'Orisuun is the premier online destination connecting investors with impactful opportunities in Black-owned businesses because we know investment is an effective tool for change.',
    description2:
      'By bridging the gap between investors and underrepresented entrepreneurs, Orisuun facilitates meaningful connections that drive economic growth and social impact. Orisuun stands at the forefront, providing a vital bridge between investors seeking impactful opportunities and entrepreneurs poised for success.',
    description3:
      'We’re offering investors a unique chance to diversify their portfolios while making a tangible difference in the communities they serve.',
    getStarted: {
      heading: 'Elevate your impact with Orisuun',
      details: 'Find untapped investment potential while making an impact',
    },
    programs: [
      {
        img: resource,
        title: 'Resource Hub',
        details:
          'A comprehensive resource hub providing tools, guides, and information.',
      },
      {
        img: community,
        title: 'Community Network',
        details:
          'Connect with Black business owners to exchange insights, share experiences, and explore collaboration opportunities.',
      },
      {
        img: funding,
        title: 'Funding Access',
        details:
          'Gain access to exclusive funding opportunities, including grants, loans, and investments for Black-owned businesses.',
      },
      {
        img: directory,
        title: 'Business Directory',
        details:
          'A searchable directory of Black-owned businesses to increase visibility and facilitate connections.',
      },
      {
        img: mentorship,
        title: 'Mentorship Program',
        details:
          'A structured mentorship program linking experienced entrepreneurs with those seeking guidance and support.',
      },
      {
        img: expert,
        title: 'Experts & experience',
        details:
          'Connect with industry experts and leverage their experience for professional growth.',
      },
      {
        img: safety,
        title: 'Safety & security',
        details:
          'Enjoy a secure platform with robust safety measures to protect your business information.',
      },
      {
        img: transaction,
        title: 'Escrow-based Transactions',
        details:
          'Contract with other members confidently with our escrow-based transaction system with dispute resolution.',
      },
      {
        img: matching,
        title: 'Matching',
        details:
          'Get matched with potential partners, investors, and collaborators to boost your business opportunities.',
      },
    ],
    priceCards: {
      monthly: {
        card1: {
          title: 'Visibility and Collaboration',
          price: '$4.99',
          period: '/Month',
        },
        card2: {
          title: 'Growth, Visibility and Collaboration',
          price: '$8.99',
          period: '/Month',
        },
      },
      quarterly: {
        card1: {
          title: 'Visibility and Collaboration',
          price: '$11.99',
          period: '/Quarter',
          button1: '$3.99/month',
          button2: '~34% Savings',
        },
        card2: {
          title: 'Growth, Visibility and Collaboration',
          price: '$28.99',
          period: '/Quarter',
          button1: '$3.99/month',
          button2: '~34% Savings',
        },
      },
      annually: {
        card1: {
          title: 'Visibility and Collaboration',
          price: '$11.99',
          period: '/Year',
          button1: '$3.99/month',
          button2: '~42% Savings',
        },
        card2: {
          title: 'Growth, Visibility and Collaboration',
          price: '$28.99',
          period: '/Year',
          button1: '$3.99/month',
          button2: '~42% Savings',
        },
      },
    },
    sections: {
      section1: {
        image: market,
        heading:
          'Let the Orisuun network know about business opportunities you offer and are seeking',
        paragraph1:
          'Broadcast the opportunities you offer and seek within the Orisuun network.',
        paragraph2:
          'Our platform enables you to communicate your business needs and offerings, fostering valuable connections and potential collaborations that can drive your business forward.',
        buttonText: 'Find opportunities',
      },
      section2: {
        image: support,
        heading: 'Donate to Black-Owned Businesses',
        paragraph1:
          'Make a direct impact by donating to Black-owned businesses and providing them with the financial support they need.',
        paragraph2:
          'Your contributions help these businesses overcome financial barriers and achieve their goals, fostering economic growth within the community.',
        buttonText: 'Start donating',
      },
    },
  },
  {
    userType: 'advocates',
    description1:
      "Orisuun is your go-to online destination for discovering and supporting Black-owned businesses. We're a platform that is revolutionizing the way consumers connect with Black-owned businesses right in their neighborhood and around the world.",
    description2:
      "Whether you're searching for restaurants, fashion boutiques, tech startups, or professional services, we've got you covered. Unlike any other platform, we're more than just a directory – we're a community-driven marketplace empowering consumers to connect directly with businesses that align with their values.",
    getStarted: {
      heading: 'Elevate your support for Black entrepreneurship on Orisuun',
      details: 'Here’s your chance to do',
    },
    programs: [
      {
        img: community,
        title: 'Community Network',
        details:
          'Connect with Black business owners to exchange insights, share experiences, and explore collaboration opportunities.',
      },
      {
        img: funding,
        title: 'Funding Access',
        details:
          'Gain access to exclusive funding opportunities, including grants, loans, and investments for Black-owned businesses.',
      },
      {
        img: publicP,
        title: 'Public and Private Reviews',
        details:
          'Let businesses know what you thought of their products, services, and general offerings. Share your feedback in public or private.',
      },
      {
        img: directory,
        title: 'Business Directory',
        details:
          'A searchable directory of Black-owned businesses to increase visibility and facilitate connections.',
      },
      {
        img: privateChat,
        title: 'PrivateChat',
        details: 'Reach out directly to any other member.',
      },
      {
        img: safety,
        title: 'Safety & security',
        details:
          'Enjoy a secure platform with robust safety measures to protect your business information.',
      },
    ],
    priceCards: {
      monthly: {
        card1: {
          title: 'Visibility and Collaboration',
          price: '$4.99',
          period: '/Month',
        },
      },
      quarterly: {
        card1: {
          title: 'Visibility and Collaboration',
          price: '$11.99',
          period: '/Quarter',
          button1: '$3.99/month',
          button2: '~34% Savings',
        },
      },
      annually: {
        card1: {
          title: 'Visibility and Collaboration',
          price: '$11.99',
          period: '/Year',
          button1: '$3.99/month',
          button2: '~42% Savings',
        },
      },
    },
    sections: {
      section2: {
        image: support,
        heading: 'Donate to Black-Owned Businesses',
        paragraph1:
          'Make a direct impact by donating to Black-owned businesses and providing them with the financial support they need.',
        paragraph2:
          'Your contributions help these businesses overcome financial barriers and achieve their goals, fostering economic growth within the community.',
        buttonText: 'Start donating',
      },
      section3: {
        image: study,
        heading: 'Find Black-Owned Businesses in Your Neighborhood',
        paragraph1:
          'Locate Black-owned businesses right in your neighborhood and support local entrepreneurs.',
        paragraph2:
          'Strengthening local businesses contributes to the overall economic health of your community and encourages sustainable growth.',
        buttonText: 'Find businesses',
      },
      section4: {
        image: instrument,
        heading: 'Find Black-Owned Businesses Around the World',
        paragraph1:
          'Explore Black-owned businesses on a global scale and build international connections.',
        paragraph2:
          'Search worldwide, by country, city, or keyword and expand your market reach by engaging with global Black-owned businesses.',
        buttonText: 'Find businesses',
      },
      section5: {
        image: write,
        heading: 'Write Reviews and Share Your Experience',
        paragraph1:
          'Share your experiences with Black-owned businesses by writing reviews on Orisuun.',
        paragraph2:
          'Your feedback helps other users make informed decisions and supports the businesses in improving their services and products.',
        paragraph3:
          'Tell businesses about your experience with public or private ratings and reviews.',
        buttonText: 'Share my experience',
      },
      section6: {
        image: paris,
        heading: 'Rise Up Our Local, Regional, and Global Leaderboards',
        paragraph1:
          'Demonstrate your commitment to supporting Black-owned businesses by climbing our leaderboards.',
        paragraph2:
          'Show off your contributions and make sure dedication is recognized.',
        buttonText: 'See the leaderboard',
      },
    },
  },
];
