import { UserService } from '../services/UserService';

export const getUsers = async (setUsers: any) => {
    try {
        const req = await UserService.allUsers();
        setUsers(req.map((x: any) => ({ ...x, isModified: false })));
    } catch (error) {
        console.log(error);
    }
};

export const approvedUser = async (setUsers: any, userId: string, rate: any) => {
    try {
        const user = await UserService.approval(userId, true, rate);
        getUsers(setUsers);
        //   $q.notify({
        //     color: 'primary',
        //     message: `This User has been successfully approved`,
        //   });
        console.log(user);
    } catch (error) {
        console.log(error);
    }
};

export const rejectUser = async (setUsers: any, userId: string, rate: any) => {
    try {
        const user = await UserService.approval(userId, false, rate);
        getUsers(setUsers);
        console.log(getUsers(setUsers));
        //   $q.notify({
        //     color: 'danger',
        //     message: `This User is blocked`,
        //   });
        console.log(user);
    } catch (error) {
        console.log(error);
    }
};