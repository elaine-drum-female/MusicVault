import React from 'react';
import UserLayout from '../../hoc/userlayout';
import UpdatePersonalInfo from './update_personal_user';

const UpdateProfile = () => {
    return (
        <UserLayout>
            <div>
                <h1>Profile</h1>
                <UpdatePersonalInfo/>
            </div>
        </UserLayout>
    );
};

export default UpdateProfile;