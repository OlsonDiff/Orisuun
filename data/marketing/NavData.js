export const mobileNavItems = [
  {
    text: 'About Us',
    link: '/about',
    hasButton: false,
  },
  {
    text: 'Profile Types',
    link: '/what-we-offer',
    hasButton: true,
    subMenu: [
      {
        subText: 'For Black-Owned Businesses',
        subLink: 'black-owned-businesses',
      },
      { subText: 'For Mentors', subLink: 'mentors' },
      { subText: 'For Experts', subLink: 'experts' },
      { subText: 'For Investors', subLink: 'investors' },
      { subText: 'For Professionals', subLink: 'professionals' },
      { subText: 'For Partners', subLink: 'partners' },
      {
        subText: 'For Management Consultants',
        subLink: 'management-consultants',
      },
      { subText: 'For Advocates', subLink: 'advocates' },
    ],
  },
  {
    text: 'Pricing',
    link: '/pricing',
    hasButton: false,
  },
  {
    text: 'Black Wealth Fund',
    link: 'fund',
    hasButton: false,
  },
  {
    text: 'What’s New',
    link: 'new',
    hasButton: false,
  },
  {
    text: 'Help Us Grow',
    link: 'how-you-can-help-us',
    hasButton: false,
  },
  {
    text: 'Beta launch',
    link: 'beta',
    hasButton: false,
  },
  {
    text: 'Give Us Feedback',
    link: 'feedback',
    hasButton: false,
  },
  {
    text: 'Sign in',
    link: 'signin',
    hasButton: false,
  },
  {
    text: 'Join!',
    link: 'signup',
    hasButton: false,
  },
];

export const platformTools = [
  {
    link: '/what-we-offer#business-section',
    text: 'Business Development Opportunities Matching System',
  },
  {
    link: '/what-we-offer#cofounder-section',
    text: 'Co-Founder Matching System',
  },
  {
    link: '/what-we-offer',
    text: 'Board Member Matching System',
  },
  {
    link: '/what-we-offer#fundraising',
    text: 'Fundraising Campaigns',
  },
  {
    link: '/what-we-offer#peer-to-peer',
    text: 'Peer-to-Peer Transactions and Escrow',
  },
  {
    link: '/what-we-offer#private-chat',
    text: 'Private Chat',
  },
  {
    link: '/what-we-offer#public-profile',
    text: 'Customizable Public Profiles',
  },
  {
    link: '/what-we-offer#sophisticated-database',
    text: 'Sophisticated Database of Businesses, Professionals & Opportunities',
  },
  {
    link: '/what-we-offer#team-forming',
    text: 'Team Forming',
  },
  {
    link: '/what-we-offer#discount-portal',
    text: 'Discount Portal',
  },
];

export const platformResources = [
  {
    link: '/what-we-offer#experts-section',
    text: 'Expert Counsel',
  },
  {
    link: '/what-we-offer#management-consultant-section',
    text: 'Management Consultants',
  },
  {
    link: '/what-we-offer#professionals-section',
    text: 'Professional Services',
  },
  {
    link: '/what-we-offer#mentorship-section',
    text: 'Mentorships',
  },
  {
    link: '/what-we-offer#people-section',
    text: 'Highly Motivated Potential Clients, Customers, and Advocates',
  },
];

export const platformToolSupport = [
  {
    link: '/what-we-offer#business-section',
    text: 'Business Development Opportunities Matching System',
  },
  {
    link: '/what-we-offer#cofounder-section',
    text: 'Co-Founder Matching System',
  },
  {
    link: '/what-we-offer#explore-section',
    text: 'Board Member Matching System',
  },
  {
    link: '/what-we-offer#sophisticated-database',
    text: 'Sophisticated Database of Businesses, Professionals & Opportunities',
  },
  {
    link: '/what-we-offer#peer-to-peer',
    text: 'Peer-to-Peer Transactions and Escrow',
  },
  {
    link: '/what-we-offer#private-chat',
    text: 'Private Chat',
  },
  {
    link: '/what-we-offer#public-profile',
    text: 'Customizable Public Profiles',
  },
  {
    link: '/what-we-offer#team-forming',
    text: 'Team Forming',
  },
  {
    link: '/what-we-offer#discount-portal',
    text: 'Discount Portal',
  },
];

export const mainOptions = {
  platform: {
    memberType: [
      {
        text: 'Black-Owned Businesses',
        link: 'black-owned-businesses',
        image: 'users',
      },
      {
        text: 'Mentors',
        link: 'mentors',
        image: 'interview',
      },
      {
        text: 'Experts',
        link: 'experts',
        image: 'crown',
      },
      {
        text: 'Investors',
        link: 'investors',
        image: 'subscription',
      },
      {
        text: 'Professionals',
        link: 'professionals',
        image: 'briefcase',
      },
      {
        text: 'Partners',
        link: 'partners',
        image: 'partners-menu',
      },
      {
        text: 'Management Consultants',
        link: 'management-consultants',
        image: 'management-consultant',
      },
      {
        text: 'Advocates',
        link: 'advocates',
        image: 'advocates-menu',
      },
    ],
    featureAndFunction: [
      {
        name: 'Grow your business',
        mainOptions: [
          {
            option: 'Platform tools',
            image: 'tools',
            subOptions: platformTools,
          },
          {
            option: 'Platform Resources',
            image: 'resource',
            subOptions: platformResources,
          },
        ],
      },
      {
        name: 'Support a business',
        mainOptions: [
          {
            option: 'Platform tools',
            image: 'tools',
            subOptions: platformTools,
          },
          {
            option: 'Support options',
            image: 'support',
            subOptions: platformResources,
          },
        ],
      },
    ],
  },
  connect: {
    text: 'Connect with Orisuun!',
    subText:
      "We're building something great, and we want you to be a part of it",
    subLinks: [
      {
        text: "What's new",
        link: 'new',
        image: 'info',
      },
      {
        text: 'Help us grow',
        link: 'how-you-can-help-us',
        image: 'plant',
      },
      {
        text: 'Beta Launch and Onboarding',
        link: 'beta',
        image: 'launcher',
      },
      {
        text: 'Feedback',
        link: 'feedback',
        image: 'feedback',
      },
    ],
  },
  links: [
    {
      mainText: 'About',
      link: '/about',
    },
    {
      mainText: 'Pricing',
      link: '/pricing',
    },
    {
      mainText: 'Black Wealth Fund',
      link: '/fund',
    },
  ],
};
