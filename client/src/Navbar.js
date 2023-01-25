import {Link} from 'react-router-dom'

export const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='links'>
          <Link to="/get"> Get App List </Link>
          <Link to="/post_app_context"> Post App Context </Link>
          <Link to="/put"> Put App Context</Link>
          <Link to="/delete"> Delete App Context</Link>
          <Link to="/post_obtain_app_loc_availability"> Post Obtain App Location Availability </Link>
          <Link to="/notifications"> Notifications </Link>
            </div>
        </div>
    )
}