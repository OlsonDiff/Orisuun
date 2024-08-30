type LEADERBOARD_PROFILE_DATA = {
  ProfileTypeId: number;
  UserId: string;
  TimeFrame:
    | 'This month'
    | 'Last month'
    | 'Last three months'
    | 'Last six months'
    | 'Last twelve months'
    | 'Last year'
    | 'Last two years';
  Category: 'Most favorited' | 'Most communications' | 'Most reviews given';
  Location?: string;
};
