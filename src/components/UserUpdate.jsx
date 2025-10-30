import React from 'react';
import { useLoaderData, useNavigate } from 'react-router';

const UserUpdate = () => {

    const navigate = useNavigate();

    const user = useLoaderData();

    const handleUpdateUser = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const updateUser = {name, email};

        fetch(`http://localhost:3000/users/${user._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(updateUser)
        })
            .then(res => res.json())
            .then(data => {
                if(data.modifiedCount) {
                    alert('User updated successfully!');
                    navigate('/');
                }
            })
    }

    return (
        <div className='container'>
            <h2 className='mt-7 text-5xl font-semibold'>Update User Data</h2>
            <div className='mt-5'>
                <form onSubmit={handleUpdateUser}>
                    <input type="text" name='name' placeholder='Name' className=' border outline-0 py-1 px-2' defaultValue={user.name} /><br />
                    <input type="email" name='email' placeholder='Email' className='my-2 border outline-0 py-1 px-2' defaultValue={user.email}/><br />
                    <button className='border bg-amber-100 px-2 py-0.5 rounded cursor-pointer' type='submit'>Update User</button>
                </form>
            </div>
        </div>
    );
};

export default UserUpdate;