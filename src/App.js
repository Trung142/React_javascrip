import Container from 'react-bootstrap/esm/Container';
import './App.scss';
import Header from "./compement/Header";
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { handleRefreshRedux } from './redux/actions/userActions';
import { useDispatch } from 'react-redux';
function App() {
  const dispatch = useDispatch();
  //Call logincontext to usercontext
  useEffect(() => {
    if (localStorage.getItem("token"))
      dispatch(handleRefreshRedux());
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
