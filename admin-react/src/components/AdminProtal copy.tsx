import React, { useState } from 'react';
import { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { approvedUser, getUsers, rejectUser } from '../helpers/adminHelper';
import { UserService } from '../services/UserService';

const AdminProtal = () => {
  const [users, setUsers] = useState<any>([]);
  const [rate, setRate] = useState(0);

  useEffect(() => {
    try {
      getUsers(setUsers);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <div className='container'>
        <div>
          {users &&
            users.map((user: any, index: number) => {
              return (
                <div className='col-xs-12 col-sm-4 q-pa-sm' key={index}>
                  <div className='card' style={{ width: 30 + 'rem' }}>
                    <div className=' card-header bg-primary text-white'>
                      <div className='text-body1 q-py-sm'>
                        Email Address: {user && user.email}
                      </div>
                      <div className='text-body1 q-py-sm'>
                        Username: {user && user.username}
                      </div>
                      <div className='text-body1 q-py-sm'>
                        Approval Status:{' '}
                        {user && user.isApproved ? 'Approved' : 'Not Approved'}
                      </div>
                    </div>

                    <div />

                    <div className='row'>
                      <div className='col-xs-12'>
                        {user.isModified ? (
                          <Form.Control
                            className='mx-2'
                            type='number'
                            name='rate'
                            onChange={(e: any) => {
                              setRate(e.target.value);
                            }}
                            required
                          />
                        ) : (
                          <p
                            onClick={() => {
                              let newArr = [...users]; // copying the old datas array
                              newArr[index] = {
                                ...user,
                                isModified: !user.isModified,
                              }; // replace e.target.value with whatever you want to change it to

                              setUsers(newArr); // ??
                              //   setUsers(...users, [isModified] : users.isModified);
                              //   user.isModified = !user.isModified;
                            }}
                            className='text-body1 q-px-md q-my-sm'
                            v-else
                          >
                            {user.isModified
                              ? user.rate
                              : `Rs: ${user.rate} - Click here to change User Rate`}
                          </p>
                        )}
                        {/* <input
                          v-if='user.isModified'
                          className='q-mx-md'
                          //   label="Rate"
                          v-model='rate'
                          onChange={(e: any) => {
                            setRate(e.target.value);
                          }}
                        /> */}
                      </div>
                    </div>
                    <div className='card-footer'>
                      <button
                        className='btn btn-danger mx-2'
                        onClick={() => rejectUser(setUsers, user._id, rate)}
                        //   unelevated
                      >
                        Reject
                      </button>
                      <button
                        className='btn btn-primary'
                        onClick={() => approvedUser(setUsers, user._id, rate)}
                        //   unelevated
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default AdminProtal;
