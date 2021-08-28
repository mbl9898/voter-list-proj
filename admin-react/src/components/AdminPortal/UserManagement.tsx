import { useEffect, useState } from "react";
import {
  getUsers,
  userEntryFormInitial,
} from "../../helpers/userManagementHelper";
import { User } from "../../interfaces/User";
import UserDataTable from "./UserDataTable";
import UserEntryForm from "./UserEntryForm";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [updateUserData, setUpdateUserData] =
    useState<User>(userEntryFormInitial);
  const [userEntryForm, setUserEntryForm] = useState<boolean>(false);

  useEffect(() => {
    try {
      getUsers(setUsers);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="container">
      <h4 className="text-center">User Management</h4>
      <div>
        {!userEntryForm && (
          <UserDataTable
            users={users}
            setUpdateUserData={setUpdateUserData}
            userEntryForm={userEntryForm}
            setUserEntryForm={setUserEntryForm}
          />
        )}
        {userEntryForm && (
          <UserEntryForm
            updateUserData={updateUserData}
            // setUpdateUserData={setUpdateUserData}
            setUsers={setUsers}
            setUserEntryForm={setUserEntryForm}
          />
        )}
      </div>
    </div>
  );
};

export default UserManagement;
