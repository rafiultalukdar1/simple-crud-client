import React from 'react';
import { useLoaderData } from 'react-router';

const UserDetails = () => {

    const user = useLoaderData();
    // console.log(user);

    return (
        <div key={user._id} className='container'>
            <div className='p-2.5 border rounded flex justify-between items-center mt-8 max-w-[500px] mx-auto'>
                <div>
                    <h4 className='text-2xl font-semibold'>Name: {user.name}</h4>
                    <p className='font-medium'>Email: {user.email}</p>
                </div>
                <div>
                    <button className='py-1 px-3.5 bg-amber-200 rounded cursor-pointer font-bold'>X</button>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;