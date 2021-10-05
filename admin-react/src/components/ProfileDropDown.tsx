import { useDispatch } from 'react-redux';
import { setCurrentUser, setIsLogInFormDisplay } from '../store';
import { useAppSelector } from '../store/hooks';
import { StoreState } from './../store/index';

const ProfileDropDown = () => {
  const dispatch = useDispatch();
  const currentUser = useAppSelector(
    (state: StoreState) => state.app.currentUser
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
        <div className='btn-group'>
          <button
            type='button'
            className='btn btn-warning dropdown-toggle'
            data-bs-toggle='dropdown'
            aria-expanded='false'
          >
            {currentUser.username}
          </button>
          <div
            className='dropdown-menu'
            style={{ width: '325px', left: '-184px' }}
          >
            <div className='d-flex justify-content-between px-3'>
              <div className='d-flex flex-column'>
                <button className='btn btn-primary my-3'>
                  Change Password
                </button>
                <button className='btn btn-primary my-3'>Contact Us</button>
              </div>
              <div className='d-flex flex-column'>
                <img
                  className='rounded-circle my-2'
                  src='https://cdn.quasar.dev/img/boy-avatar.png'
                  alt='profile'
                  width='72'
                  height='72'
                />
                <button
                  className='btn btn-danger'
                  onClick={() => {
                    currentUser !== null && handleLogoutOpenLogInForm();
                  }}
                >
                  Logout
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
