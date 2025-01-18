// import DemoUser from '@/modules/client/clientFetch/demoUser'
// import Users from '@/modules/client/clientFetch/users'
import DependUser from '@/modules/client/usingHook/dependUser'
import React from 'react'

const HomePage = () => {
  return (
    <div>
      <h4>HomePage users</h4>
      {/* <Users /> */}
      {/* <DemoUser /> */}
      <DependUser />
    </div>
  )
}

export default HomePage