import React from "react";
import { GlobalStyles } from "./styles/GlobalStyles";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";
import WorkflowCanvas from "./pages/Workflow";
import Instructions from "./pages/Instructions";

////************************************** App Layout
// AppLayout.jsx
// To render the child component in app layout we gonna use <Outlet /> in app layout
// Header.jsx, Sidebar.jsx

//////************************************************* Supabase: Building Back-End
///********************************** Relationships Between Tables
// create bookings -> connect this table with cabins and guests i.e establish reltionship

////************************************************************** React Query: Managing Remote State
//// React library of all time in order to manage the remote state that we now have stored on Superbase. And that library is called React Query. So as we really start developing this project, we will essentially allow React Query to take over
// all fetching and storing of remote data, which will simplify our life so much.

////******************************************** Setting up react query
// "npm i @tanstack/react-query@4"

////************************************************************************ Advanced React Pattern

////************************** Building a Modal Window Using a React Portal
// build a simple modal window component using React's portal
// And so let's now build that reusable modal component.
// cabins.jsx => AddCabin.jsx => Modal.jsx => CreatCabinform.jsx => Modal.jsx(React Portal)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="account" element={<Account />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="checkin/:bookingId" element={<Checkin />} />
              <Route path="settings" element={<Settings />} />
              <Route path="instructions" element={<Instructions />} />
              <Route path="workflow/:bookingId" element={<WorkflowCanvas />} />
            </Route>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "12px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "#fff",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
