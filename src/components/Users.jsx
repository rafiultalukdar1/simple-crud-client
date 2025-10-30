import React, { use, useState } from 'react';
import { Link } from 'react-router';

const Users = ({userPromise}) => {

    const initialUsers = use(userPromise);
    const [users, setUsers] = useState(initialUsers);

    const handleAddUser = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        console.log(name, email);
        const newUser = {name, email};

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log('after vasing user:', data);
                if(data.insertedId) {
                    newUser._id = data.insertedId;
                    const newUsers = [...users, newUser];
                    setUsers(newUsers);
                    alert('User added successfully!');
                    e.target.reset();
                }
            })
    };

    // Delete User
    const handleDeleteUser = (id) => {
        console.log('delete', id)

        fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log('After delete', data);
                if (data.deletedCount) {
                    alert('User deleted successfully!');
                    const remainingUsers = users.filter(user => user._id !== id);
                    setUsers(remainingUsers);
                }
            })
    }

    return (
        <div className='container'>
           <div className='py-5'>
                <form onSubmit={handleAddUser}>
                    <input type="text" name='name' placeholder='Name' className=' border outline-0 py-1 px-2' /><br />
                    <input type="email" name='email' placeholder='Email' className='my-2 border outline-0 py-1 px-2'/><br />
                    <button className='border bg-amber-100 px-2 py-0.5 rounded cursor-pointer' type='submit'>Add User</button>
                </form>
                <h2 className='text-5xl font-bold my-2.5 text-red-400'>Users: {users.length}</h2>
                <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-7'>
                    {
                        users.map(user =>
                            <div key={user._id} className='p-2.5 border rounded'>
                                <div className='flex justify-between items-center'>
                                    <div>
                                        <h4 className='text-2xl font-semibold'>Name: {user.name}</h4>
                                        <p className='font-medium'>Email: {user.email}</p>
                                        
                                    </div>
                                    <div>
                                        <button onClick={() => handleDeleteUser(user._id)} className='py-1 px-3.5 bg-amber-200 rounded cursor-pointer font-bold'>X</button>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center mt-6'>
                                    <Link to={`/users/${user._id}`} className='py-1 px-3.5 bg-amber-100 rounded cursor-pointer font-semibold text-[14px]'>Details</Link>
                                    <Link to={`/update/${user._id}`} className='py-1 px-3.5 bg-amber-100 rounded cursor-pointer font-semibold text-[14px]'>Edit</Link>
                                </div>
                            </div>)
                    }
                </div>
           </div>
        </div>
    );
};

export default Users;