import React from 'react'
import AboutLeadership from '../about-us/components/leader-about'
import AboutVideo from '../about-us/components/about-video'
import LeadershipHero from '@/components/LeadershipHero'

const page = () => {
  return (
    <div>
        <LeadershipHero/>
        <AboutLeadership/>
        <AboutVideo videoId={'y1z_jb_ewmI'}  />
    </div>
  )
}

export default page