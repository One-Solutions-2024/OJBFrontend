import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';


import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src={assets.not_found_blog_img}
      alt="not-found"
      className="not-found-img"
    />
          <Link to="/"             className="home-link-button"
          >Go Home</Link>
  </div>
)

export default NotFound