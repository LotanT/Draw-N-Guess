import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../services/user.service';

export function Welcome() {
  
  
  useEffect(() => {
    let user = userService.getLoggedinUser()
    if(user) {
      user.game = null
      userService.updatUser(user)
    }
  }, []);



  return (
    <section className="welcome main-layout">
      <div className="header">Welcome to Draw and Guess</div>
      <Link to="/wait" className="main-btn play">
        Start to Play!
      </Link>
    </section>
  );
}
