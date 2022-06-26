import { Fragment } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { 
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink
} from './navigation.styles.jsx';
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { setIsCartOpen } from "../../store/cart/cart.action";

const Navigation = () => {

  const dispatch = useDispatch()

  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen  = useSelector(selectIsCartOpen)
  const signOutUser = () => { dispatch(signOutStart()) }

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => { 
    if(location.pathname.split('/')[1] === 'auth' && currentUser !== null){
      navigate('/');
    }
    dispatch(setIsCartOpen(false)) 
  }, [location]);


  return (
     <Fragment>
       <NavigationContainer>
        <LogoContainer to='/' >
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
            <NavLink to='shop' >
                <div>SHOP</div>
            </NavLink>
            {
              currentUser ? 
              <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>:
              (
                <NavLink to='auth' >
                <div>SIGN IN</div>
            </NavLink>
              )
            } 
            <CartIcon />
        </NavLinks>
            {isCartOpen && <CartDropdown />}
       </NavigationContainer>
       <Outlet />
     </Fragment>
  );
}

export default Navigation; 