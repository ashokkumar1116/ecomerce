import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import "./authentication.styles.scss";
import { selectCurrentUser } from "../../store/user/user.selector";

const Authentication = () => {
const navigate = useNavigate();
const currentUser = useSelector(selectCurrentUser)

useEffect(() => { 
    if(currentUser !== null){
        navigate('/');
    }
})
return currentUser === null && (
    <div className="authentication-container">
        <SignInForm />
        <SignUpForm />
    </div>
);
}

export default Authentication