import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { 
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink
} from './navigation.styles.jsx';
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

const Navigation = () => {

  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen  = useSelector(selectIsCartOpen)


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