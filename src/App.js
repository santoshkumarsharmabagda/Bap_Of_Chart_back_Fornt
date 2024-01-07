import './App.css';
import AllRoute from './components/AllRoute/AllRoute';
import NavBar from './components/NavBar.js/NavBar';
import SideBar from './components/SideBar/SideBar';
import { Route, Switch, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  const hiddenRoutes = ['/login', '/ForgetEmail', '/ForgetEmailOtp', '/EnterNewPassword'];
  const isHiddenRoute = hiddenRoutes.includes(location.pathname);
  const shouldDisplaySideBar = !isHiddenRoute;

  const mainColClass = isHiddenRoute ? 'col-12' : 'col-lg-10 col-md-10 col-sm-12';

  return (
    <>
      {/* <NavBar />
      <div className='container-fluid'>
        <div className='row'>
          {shouldDisplaySideBar && (
            <div className='col-lg-2 m-0 p-0'>
              <SideBar />
            </div>
          )}
          <div className={mainColClass}>
            <AllRoute />
          </div>
        </div>
      </div> */}
      <div className='container-fluid' style={{height:"100vh",width:"100%"}}  >
        <div className='row' >
          <div className='col-12 p-0 m-0 bg-dark' style={{height:"10vh"}}  >
            <NavBar/>
          </div>

          {
            shouldDisplaySideBar && (
          <div className='col-lg-2 col-md-2 col-sm-12 p-0 m-0' style={{height:"90vh",overflowY:"auto"}}  >
              <SideBar/>
          </div>
            )
          }

          <div className={mainColClass} style={{height:"90vh",overflowY:"auto"}} >
            <AllRoute/>
          </div>


        </div>

      </div>
    </>
  );
}

export default App;
