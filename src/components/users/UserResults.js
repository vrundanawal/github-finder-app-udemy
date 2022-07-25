import React, { useEffect } from "react";
import { useState } from "react";
import Spinner from "../layout/Spinner";

const UserResults = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`);
    const data = await response.json();
    //console.log(data);
    setUsers(data);
    setLoading(false);
  };

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => {
          return <h3 key={user.id}>{user.login}</h3>;
        })}
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default UserResults;
