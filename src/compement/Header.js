import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../assets/images/logo192.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handlelogoutRedux } from '../redux/actions/userActions';
const Header = (props) => {
    //call hook
    const navigate = useNavigate();
    const user = useSelector(state => state.user.count);
    const dispatch = useDispatch();
    const handlelogout = () => {
        dispatch(handlelogoutRedux());
    }
    useEffect(() => {
        if (user && user.auth === false && window.location.pathname !== "/login") {
            navigate("/");
            toast.success("log out success !");
        }
    }, [user]);
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src={Logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                        <span>Trung142 React</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {(user && user.auth === true || window.location.pathname === '/') &&
                            <>
                                <Nav className="me-auto" >
                                    <NavLink className="nav-link" to="/" >Home</NavLink>
                                    <NavLink className="nav-link" to="/user" >Maneger User</NavLink>

                                </Nav>
                                <Nav>
                                    {user && user.email && <span className='nav-link'>Welcome {user.email}</span>}
                                    <NavDropdown title="Setting" id="basic-nav-dropdown">
                                        {user && user.auth === true
                                            ? <NavDropdown.Item onClick={() => handlelogout()}>Logout</NavDropdown.Item>
                                            : <NavLink to="/login" className="dropdown-item"  >Login</NavLink>}

                                    </NavDropdown>
                                </Nav>
                            </>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>)
}
export default Header;