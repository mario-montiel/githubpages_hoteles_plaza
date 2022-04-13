
// CSS

// Components
import ComponentLogin from '../../components/signin/Login'

const Login = () => {

    return (
        <ComponentLogin url={'/api/landingPage/auth/login'} worker={false} />
    )
}

export default Login