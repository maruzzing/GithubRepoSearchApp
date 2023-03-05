import { axiosInstance } from '@/services/instance';
import { PER_PAGE } from '@/services/constants';

export const searchRepositories = ({ q, page }: { q: string; page: number }) => {
  return axiosInstance.get(`/search/repositories`, { params: { q, page, per_page: PER_PAGE } });
};

export const getRepositoryDetail = ({ owner, repo }: { owner: string; repo: string }) => {
  return axiosInstance.get(`/repos/${owner}/${repo}`);
};

export const getRepositoryIssues = ({ owner, repo, page }: { owner: string; repo: string; page: number }) => {
  return axiosInstance.get(`/repos/${owner}/${repo}/issues`, { params: { page, per_page: PER_PAGE, state: 'all' } });
};

export const getIssueDetail = ({ owner, repo, issueNumber }: { owner: string; repo: string; issueNumber: number }) => {
  return axiosInstance.get(`/repos/${owner}/${repo}/issues/${issueNumber}`);
};
