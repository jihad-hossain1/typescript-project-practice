import DemoUser from '@/modules/clientFetch/demoUser'
import Users from '@/modules/clientFetch/users'
import React from 'react'

const HomePage = () => {
  return (
    <div>
      <h4>HomePage users</h4>
      {/* <Users /> */}
      <DemoUser />
    </div>
  )
}

export default HomePage