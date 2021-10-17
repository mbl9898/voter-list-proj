import { Dispatch, SetStateAction } from "react";
import {
  headings,
  userEntryFormInitial,
} from "../../helpers/userManagementHelper";
import { User } from "../../interfaces/User";
// import CModal from "./CModal";

interface Props {
  users: User[];
  setUpdateUserData: Dispatch<SetStateAction<User>>;
  userEntryForm: boolean;
  setUserEntryForm: Dispatch<SetStateAction<boolean>>;
}

const UserDataTable = ({
  users,
  setUpdateUserData,
  userEntryForm,
  setUserEntryForm,
}: Props) => {
  //   const onSubmit = (user: any) => {};
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            {headings.map((heading, index) => (
              <th key={index} scope="col" className="text-center">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user: User, index: number) => {
              return (
                <tr key={index}>
                  <th className="text-center" scope="row">
                    {index + 1}
                  </th>
                  <td className="text-center">{user.username}</td>

                  <td className="text-center">{user.email}</td>
                  <td className="text-center">{user.role}</td>
                  <td className="text-center">{user.rate}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setUpdateUserData(
                          !userEntryForm ? user : userEntryFormInitial
                        );
                        setUserEntryForm((prevV) => !prevV);
                      }}
                    >
                      update
                    </button>
                  </td>
                  {/* <td className="text-center">
                    <CModal
                      heading={"Are you sure you want to delete this user?"}
                      triggerButtonContent="delete"
                      triggerButtonVarient="danger"
                      onSubmit={() => {
                        onSubmit(user);
                      }}
                    />
                  </td> */}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default UserDataTable;
