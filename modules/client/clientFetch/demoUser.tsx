'use client'

import useDataFetch from '@/context/hooks/useDataFetch';
import React from 'react';
import { TUsers } from './type';

const DemoUser = () => {
    const { data, error, loading } = useDataFetch<TUsers[]>({ url: 'https://jsonplaceholder.typicode.com/users' });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <div>
            <h1>Demo User List</h1>
            <p className='text-sm text-red-600'>Total Users: {data?.length}</p>
            <ul>
                {data?.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );

};

export default DemoUser;
