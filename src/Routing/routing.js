import { createBrowserRouter } from "react-router-dom";
import AddUserComp from "../Components/AddUserComp";
import HomePageComp from "../Components/HomePageComp";
import LoginComp from "../Components/LoginComp";
import DashBoardComp from "../Components/DashBoardComp";
import TollBookComp from "../Components/TollBookComp";
import TollzEComp from "../Components/TollzEComp";
import Home2Comp from "../Components/Home2Comp";
import SessionRouteComp from "../Components/SessionRouteComp";
import PaymentComp from "../Components/PaymentComp";
import TollHistoryComp from "../Components/TollHistoryComp";
import TripsToBeCompletedComp from "../Components/TripsToBeCompletedComp";
import VehiclesComp from "../Components/VehiclesComp";
import AdminLoginComp from "../Components/AdminLoginComp";
import AdminDashBoardComp from "../Components/AdminDashBoardComp";
import AddEditTollTaxComp from "../Components/AddEditTollTaxComp";
import AdminSessionRouteComp from "../Components/AdminSessionRouteComp";
import EditUsersComp from "../Components/EditUsersComp";
import UsersComp from "../Components/UsersComp";
import AddEditAdminsComp from "../Components/AddEditAdminsComp";
import EditAdminsComp from "../Components/EditAdminsComp";
import AdminTollHistoryComp from "../Components/AdminTollHistoryComp";
import EditTollHistory from "../Components/EditTollHistory";

const router = createBrowserRouter([
    {path:"",element:<HomePageComp/>,children:[
        {path:"",element:<TollzEComp/>},
        {path:"Home2",element:<Home2Comp/>},
        {path:"RegisterPage",element:<AddUserComp/>},
        {path:"LoginPage",element:<LoginComp/>},
        {path:"Dashboard",element:(<SessionRouteComp><DashBoardComp/></SessionRouteComp>)},
        {path:"TollBook",element:<TollBookComp/>},
        {path:"Payment",element:<PaymentComp/>},
        {path:"TollHistory",element:<TollHistoryComp/>},
        {path:"FutureTrips",element:<TripsToBeCompletedComp/>},
        {path:"Vehicles",element:<VehiclesComp/>},
        {path:"AdminLogin",element:<AdminLoginComp/>},
        {path:"AdminDashBoard",element:(<AdminSessionRouteComp><AdminDashBoardComp/></AdminSessionRouteComp>)},
        {path:"AddEditToll",element:<AddEditTollTaxComp/>},
        {path:"EditUser/:userId",element:<EditUsersComp/>},
        {path:"Users",element:<UsersComp/>},
        {path:"Admins" ,element:<AddEditAdminsComp/>},
        {path:"EditAdmin/:adminId" ,element:<EditAdminsComp/>},
        {path:"AdminsTollHistory",element:<AdminTollHistoryComp/>},
        {path:"EditTollHistory/:tollBookId",element:<EditTollHistory/>}
    ]},
    {path:"RegisterPage",element:<AddUserComp/>},
    {path:"LoginPage",element:<LoginComp/>}
]);
export default router;