import Alert from 'react-bootstrap/Alert';
import { useSelector } from 'react-redux';
const PrivateRoutes = (props) => {
    const user = useSelector(state => state.user.count);
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