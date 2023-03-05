export type Repository = {
  id: number;
  name: string;
  node_id: string;
  owner: {
    id: number;
    node_id: string;
    login: string;
    avatar_url: string;
  };
  description: string;
  updated_at: Date;
  stargazers_count: number;
  language: string;
};

export type Issue = {
  id: number;
  node_id: string;
  number: number;
  title: string;
  comments: number;
  created_at: Date;
  state: 'open' | 'closed';
  html_url: string;
};
