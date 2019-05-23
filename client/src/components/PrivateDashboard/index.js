import React from 'react';
import UserLayout from '../../hoc/userlayout';
import LinkButton from '../utils/button';
import UserHistoryBlock from '../utils/User/history_block';

const UserDashboard = ({user}) => {
    return (
        <UserLayout>
            <div>
                <div className="user_nfo_panel">
                    <h1>User Information</h1>
                    <div>
                        <span>{user.userData.name} {user.userData.lastname}  </span>
                        <span>{user.userData.email}</span>
                    </div>
                    <p></p>
                    <LinkButton 
                        type="default"
                        title="Edit account info"
                        linkTo="/user/user_profile"
                    />
                </div>
                {
                    user.userData.history ?
                    <div className="user_nfo_panel">
                        <h1>History purchases</h1>
                        <div className="user_product_block_wrapper">
                            <UserHistoryBlock
                                products={user.userData.history}
                            />
                        </div>            
                    </div>

                    :null
                }

            </div>
        </UserLayout>
    );
};

export default UserDashboard;