import React from "react";
import { useState, useEffect } from "react";
import api from "../api/axios";

function Blacklist() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const handleBlacklistChange = async (user, isBlacklisted) => {
    try {
      if (isBlacklisted) {
        await api.post(`/blacklist/${user.login}`);
      } else {
        await api.delete(`/blacklist/${user.login}`);
      }
      setUsers(
        users.map((u) =>
          u.login === user.login ? { ...u, isBlacklist: isBlacklisted } : u
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 my-5 max-w-5xl mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 grid grid-cols-3 gap-4">
      {users.map((user, index) => (
        <div key={index} className="text-center">
          <div className="p-2">
            <p className="font-bold">Name: {user.name}</p>
            <p className="text-gray-500">Login: {user.login}</p>
            <p className={user.isBlacklist ? "text-red-500" : "text-green-500"}>
              Is Blacklisted: {user.isBlacklist ? "Yes" : "No"}
            </p>
            <input
              type="checkbox"
              checked={user.isBlacklist}
              onChange={(e) => handleBlacklistChange(user, e.target.checked)}
            />
            <hr className="my-2"></hr>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Blacklist;
