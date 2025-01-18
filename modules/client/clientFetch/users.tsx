'use client'

import { fetchData } from '@/helpers/fetch/client-fetch/clientFetch';
import React, {  useEffect, useState } from 'react'
import { TUsers } from './type';



const Users = () => {
    const [users, setUsers] = useState<TUsers[]>([]);
    const [loading, setLoading] = useState(true);


    const fetchUsers = React.useCallback(async () => {
        setLoading(true)
        const response = await fetchData<TUsers[]>('https://jsonplaceholder.typicode.com/users')
        setLoading(false)
        setUsers(response.data)
    }, [])

    useEffect(() => {
        fetchUsers()
    }, [fetchData])

    
    return (
        <div>
            
            <div className='grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {loading ? <div>Loading...</div> : users?.map((user)=><div key={user.id}>
                    <div className='border p-2 bg-zinc-700/90'>
                        <h4>{user.name}</h4>
                        <p>{user.email}</p>
                        <p>{user.address.city}</p>
                    </div>
                    
                     </div>)}
            </div>
            
              </div>
    )
}

export default Users