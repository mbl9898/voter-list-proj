import React, { useState } from "react";
import { useEffect } from "react";
import { User } from "../interfaces/User";
import { getUsers } from "../helpers/adminHelper";
import AdminUsersCard from "./AdminUsersCard";

const AdminPortal = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    try {
      getUsers(setUsers);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <AdminUsersCard users={users} setUsers={setUsers} />
    </>
  );
};

export default AdminPortal;
