import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { setCurrentUser, setIsLogInFormDisplay } from '../store';
import { useAppSelector } from '../store/hooks';
import { StoreState } from './../store/index';

const ProfileDropDown = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useAppSelector(
    (state: StoreState) => state.app.currentUser,
  );
  const handleLogoutOpenLogInForm = async () => {
    dispatch(setCurrentUser(null));
    // history.push("/login")
    // await logout(currentUser.uid, dispatch);
    await dispatch(setIsLogInFormDisplay(true));
  };

  // const handleLogoutOpenLogInForm = async () => {
  //   await logout(currentUser.uid, dispatch);
  // };
  return (
    <>
      {currentUser !== null && (
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-warning dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {currentUser.username}
          </button>
          <div
            className="dropdown-menu"
            style={{ width: '325px', left: '-184px' }}
          >
            <div className="d-flex justify-content-between px-3">
              <div className="d-flex flex-column">
                <button
                  className="btn btn-primary my-3"
                  onClick={() => {
                    history.push('/profile');
                    document.title = 'Profile - Voter List App';
                  }}
                >
                  Profile
                  <svg
                    height="25"
                    width="25"
                    className="ms-1 pb-1"
                    viewBox="0 0 496 512"
                  >
                    <path
                      fill="currentColor"
                      d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"
                    ></path>
                  </svg>
                </button>
                <button className="btn btn-primary my-3">Contact Us</button>
              </div>
              <div className="d-flex flex-column">
                <img
                  className="rounded-circle my-2"
                  src="https://cdn.quasar.dev/img/boy-avatar.png"
                  alt="profile"
                  width="72"
                  height="72"
                />
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    currentUser !== null && handleLogoutOpenLogInForm();
                  }}
                >
                  Logout
                  <svg
                    height="25"
                    width="25"
                    className="ms-1 pb-1"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M96 64h84c6.6 0 12 5.4 12 12v24c0 6.6-5.4 12-12 12H96c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h84c6.6 0 12 5.4 12 12v24c0 6.6-5.4 12-12 12H96c-53 0-96-43-96-96V160c0-53 43-96 96-96zm231.1 19.5l-19.6 19.6c-4.8 4.8-4.7 12.5.2 17.1L420.8 230H172c-6.6 0-12 5.4-12 12v28c0 6.6 5.4 12 12 12h248.8L307.7 391.7c-4.8 4.7-4.9 12.4-.2 17.1l19.6 19.6c4.7 4.7 12.3 4.7 17 0l164.4-164c4.7-4.7 4.7-12.3 0-17l-164.4-164c-4.7-4.6-12.3-4.6-17 .1z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileDropDown;
