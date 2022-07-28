import React from 'react'
import 'assets/css/Sidebar.css'
import {ReactComponent as  Reset} from 'assets/svg/reset_svg.svg'
import {ReactComponent as  Download} from 'assets/svg/download_svg.svg'
import {ReactComponent as  Report} from 'assets/svg/bug_report_svg.svg'

// import SidebarIcon from 'components/SidebarIcon'

export default function Sidebar() {
  return (
    <div className="sidebar">
      {/* <div className="sidebar-icon-container">
        <Reset className='sidebar-icon' title='Reset Code'/>
      </div>
      <div className="sidebar-icon-container">
        <Download className='sidebar-icon' title='Download code'/>
      </div>
      <div className="sidebar-icon-container">
        <Report className='sidebar-icon' title='Give Feedback'/>
      </div> */}
    </div>
  )
}

// function Icon({icon}){
//   return(
//     <>
//       {icon}
//     </>
//   )
// }