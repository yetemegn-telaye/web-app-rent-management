import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './features/auth/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Property from './features/property';
import Listings from './features/listings';
import ListingDetail from './features/listings/ListingDetail';
import AllPayment from './features/payment/AllPayment';
import Notifications from './features/notifications';
import AddTenant from './features/tenant/AddTenant';
import AllTenant from './features/tenant';
import AddListing from './features/listings/AddListing';
import MyRent from './features/rentedTenantView';
import Settings from './features/settings';
import Dashboard from './features/dashboard';
import OnboardingScreen from './features/onbaordingScreeen';
import PrivateRoute from './routes/PrivateRoute';
import UnauthorizedPage from './features/UnauthorizedPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
{/* 
        <Route path="/getting-started" element={<OnboardingScreen />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/property" element={<Property />} />
        <Route path="/add-listing" element={<AddListing/>}/>
        <Route path="/all-payments" element={<AllPayment/>} />
        <Route path="/add-tenant" element={<AddTenant/>} />
        <Route path="/all-tenants" element={<AllTenant/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/all-listing" element={<Listings/>} />
        <Route path="/listing-detail/:id" element={<ListingDetail/>} />
        <Route path="/notifications" element={<Notifications />}/>
        <Route path="/my-rents" element={<MyRent/>}/> */}


        <Route element={<PrivateRoute allowedRoles={['building_manager']} />} >
        <Route path="/getting-started" element={<OnboardingScreen />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/property" element={<Property />} />
        <Route path="/add-listing" element={<AddListing/>}/>
        <Route path="/all-payments" element={<AllPayment/>} />
        <Route path="/add-tenant" element={<AddTenant/>} />
        <Route path="/all-tenants" element={<AllTenant/>}/>
        <Route path="/settings" element={<Settings/>}/>
        </Route>

        <Route element={<PrivateRoute allowedRoles={['building_manager','tenant']} />} >
        <Route path="/all-listing" element={<Listings/>} />
        <Route path="/listing-detail/:id" element={<ListingDetail/>} />
        <Route path="/notifications" element={<Notifications />}/>
        </Route>

        <Route element={<PrivateRoute allowedRoles={['tenant']} />} >
        <Route path="/my-rents" element={<MyRent/>}/>
        </Route>
       
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
