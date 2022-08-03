import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
//create a instance of axios then we can call where you want
const github = axios.create({
  baseURL: GITHUB_URL,
});

//get search results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });
  const response = await github.get(`/search/users?${params}`);
  return response.data.items;
};

//create one single function which is going to call single user and user repos
//get user and repos
export const getUserAndRepos = async (login) => {
  const params = new URLSearchParams({
    sort: "created",
    per_page: 10,
  });
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos?${params}`),
  ]);
  return { user: user.data, repos: repos.data };
};
