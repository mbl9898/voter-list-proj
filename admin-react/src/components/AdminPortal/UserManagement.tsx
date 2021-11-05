import { memo, useEffect, useState } from 'react';
import {
  getUsers,
  userEntryFormInitial,
} from '../../helpers/userManagementHelper';
import { User } from '../../interfaces/User';
import Loading from '../Loading';
import UserDataTable from './UserDataTable';
import UserEntryForm from './UserEntryForm';

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updateUserData, setUpdateUserData] =
    useState<User>(userEntryFormInitial);
  const [userEntryForm, setUserEntryForm] = useState<boolean>(false);

  useEffect(() => {
    try {
      getUsers(setUsers, setLoading);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <div className="container">
        <h4 className="text-center fw-bold">User Management</h4>

        {loading && <Loading />}
        {!loading && (
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
        )}
      </div>
    </>
  );
};

export default memo(UserManagement);
