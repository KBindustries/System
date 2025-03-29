import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

import InfoCard from '../components/Cards/InfoCard'
import TeamUserTable from '../components/TeamUserTable'
import SpecialtyTable from '../components/Specialty/SpecialtyTable'
import PageTitle from '../components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon, MenuIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'



function Dashboard() {
  const history = useHistory();

  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    const info = JSON.parse(userInfo);
    const token = info?.accessToken
    

    if (!token) {
      // Token doesn't exist, redirect back to login page
      history.push('/login');
    } else {
      // Perform token verification logic here
      console.log('Token verified');
      // Continue with other necessary actions
    }
  }, [history]);

  return (
    <div className='mb-20'>
      <PageTitle>Dashboard</PageTitle>   


      {/* <!-- Cards --> */}

      <div className="grid gap-6 mb-8 md:grid-cols-1 xl:grid-cols-3">
        <InfoCard title="Total Students " value="27">
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title=" Total smart cards" value="27">
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Specialties " value="9">
          <RoundIcon
            icon={MenuIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

       
      </div>


      {/* Display team users */}

      <div className='my-10'></div>
      <TeamUserTable/>


      {/* Display specialties */}

      <div className='my-12 '></div>
      <SpecialtyTable  />
     
    </div>
  )
}

export default Dashboard
