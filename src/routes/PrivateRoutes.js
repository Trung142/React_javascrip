import { UserContext } from '../context/Usercontext';
import { useContext } from 'react';
import Alert from 'react-bootstrap/Alert';
const PrivateRoutes = (props) => {
    const { user } = useContext(UserContext);
    if (user && !user.auth) {
        return (
            <>
                <Alert variant="danger" className='mt-3'>
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                        You don't have permisson to acess this routes !
                    </p>
                </Alert>
            </>
        )
    }
    return (
        <>
            {props.children}
        </>
    )
}
export default PrivateRoutes;