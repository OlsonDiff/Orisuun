'use client';

import Handshake from '@/icons/handshake';
import UserSearch from '@/icons/user-search';
import Users from '@/icons/users';
import SearchResultsPost from '../../profile-search/search-results/page';

const profiles = [
  { icon: UserSearch, title: 'Business Development Opportunities', id: 1 },
  { icon: Users, title: 'Co-Founder Posts', id: 2 },
  { icon: Handshake, title: 'Board of Directors Member Posts', id: 3 },
];

export default function SearchResults() {

  return <SearchResultsPost profilesPost={profiles} />
}