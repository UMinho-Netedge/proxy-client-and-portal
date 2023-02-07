import {Link} from 'react-router-dom'

export const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='links'>
          <Link className='get_link' to="/get"> Get App List </Link>
          <Link className='post_link' to="/post_app_context"> Post App Context </Link>
          <Link className='put_link' to="/put"> Put App Context</Link>
          <Link className='delete_link' to="/delete"> Delete App Context</Link>
          <Link className='post_link' to="/post_obtain_app_loc_availability"> Post Obtain App Location Availability </Link>
          <Link className='notifications_link' to="/notifications"> Notifications </Link>
            </div>
        </div>
    )
}