import { axiosInstance } from '@/services/instance';
import { SEARCH_LIMIT } from '@/services/constants';

export const searchRepositories = ({ q, page }: { q: string; page: number }) => {
  return axiosInstance.get(`/search/repositories`, { params: { q, page, per_page: SEARCH_LIMIT } });
};

export const getRepositoryIssues = ({ owner, repo }: { owner: string; repo: string }) => {
  return axiosInstance.get(`/repos/${owner}/${repo}/issues`);
};

export const getIssueDetail = ({ owner, repo, issueNumber }: { owner: string; repo: string; issueNumber: number }) => {
  return axiosInstance.get(`/repos/${owner}/${repo}/issues/${issueNumber}`);
};
