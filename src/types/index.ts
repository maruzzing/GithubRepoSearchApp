export type Repository = {
  id: number;
  name: string;
  owner: {
    id: number;
    login: string;
    avatar_url: string;
  };
  description: string;
  updated_at: Date;
  stargazers_count: number;
  language: string;
};
