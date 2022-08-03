import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }) => {
  //set initial setup
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  //get a single user
  const getUser = async (login) => {
    const response = await fetch(`${GITHUB_URL}/users/${login}`);
    //added some validation if url is wrong
    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  //get user repos
  const getUserRepos = async (login) => {
    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`
    );
    const data = await response.json();
    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
