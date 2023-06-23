import Container from 'react-bootstrap/esm/Container';
import './App.scss';
import Header from "./compement/Header";
import { ToastContainer } from 'react-toastify';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/Usercontext';
import AppRoutes from './routes/AppRoutes';
function App() {
  //call userprovider userContext
  const { loginContext } = useContext(UserContext);
  //Call logincontext to usercontext
  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginContext(localStorage.getItem("email"), localStorage.getItem("token"));

    }
  }, [])

  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <AppRoutes />
        </Container>
      </div>
      {/*toatstifi de hien thi bang test  */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
