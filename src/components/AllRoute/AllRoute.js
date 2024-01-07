import React from 'react'
import {Route,Routes} from "react-router-dom";
import Home from '../Home/Home';
import Users from '../users/Users';
import Transactions from '../Transactions/Transactions';
import Courses from '../Courses/Courses';
import Categorys from '../Categorys/Categorys';
import EditCourseEdit from '../Courses/EditCourseEdit';
import SignUp from '../NavBar.js/SignUp';
import Otp from '../NavBar.js/Otp';
import Email from '../NavBar.js/Email';
import Email_otp from '../NavBar.js/Email_otp';
import Password from '../NavBar.js/Password';
import Profile from '../NavBar.js/Profile';
import Login from '../NavBar.js/Login';
import Signout from '../SideBar/Signout';
import ChangePass from '../SideBar/ChangePass';
import Offcanvas from '../Transactions/Offcanvas';
import AddData from '../Categorys/AddData';
import { AuthenticatedRoute } from '../../AutheticatedRoute';
import Assignment from '../Assignment/Assignment';
import AsassignmentView from '../Assignment/AsassignmentView';
import ForgetEmail from '../NavBar.js/ForgetEmail';
import ForgotPassEmailOtp from '../NavBar.js/ForgotPassEmailOtp';
import EnterNewPassword from '../NavBar.js/EnterNewPassword';
import Chat from '../Chat/Chat';
import Banner from '../Banner/Banner';
import ViewCourse from '../Courses/ViewCourse';
import SpecialBanner from '../SpecialBanner/SpecialBanner.js';
import SocialMedia from '../SocialMedia/SocialMedia';
function AllRoute() {
  return (
    <>
      <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/' element={<AuthenticatedRoute/>} >
      <Route index element={<Home/>} />
      <Route path='/users' element={<Users/>} />
      <Route path='/transactions' element={<Transactions/>} />
      <Route path='/courses/:id' element={<Courses/>} />
      <Route path='/categorys' element={<Categorys/>} />
      <Route path='/editcourse/:courseId' element={<EditCourseEdit/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/otp' element={<Otp/>} />
      <Route path='/email' element={<Email/>} />
      <Route path='/email_otp' element={<Email_otp/>} />
      <Route path='/password' element={<Password/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/signout' element={<Signout/>} />
      <Route path='/changepass' element={<ChangePass/>} />
      <Route path='/offcanvas' element={<Offcanvas/>} />
      <Route path='/adddata' element={<AddData/>} />
      <Route path='/assignment' element={<Assignment/>} />
      <Route path='/asassignmentView' element={<AsassignmentView/>} />
      <Route path='/ForgetEmail' element={<ForgetEmail/>} />
      <Route path='/ForgetEmailOtp' element={<ForgotPassEmailOtp/>} />
      <Route path='/EnterNewPassword' element={<EnterNewPassword/>} />
      <Route path='/Chat/:id' element={<Chat/>} />
      <Route path='/Banner' element={<Banner/>} />
      <Route path='/ViewCourse' element={<ViewCourse/>} />
      <Route path='/PrivateGroup' element={<SpecialBanner/>} />
      <Route path='/SocialMedia' element={<SocialMedia/>} />

      </Route>

</Routes>
    </>
  )
}

export default AllRoute
