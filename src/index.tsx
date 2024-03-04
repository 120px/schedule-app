import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './components/Main/Dashboard/Dashboard';
import CreateGroup from './components/Main/Dashboard/Groups/CreateGroup';
import MyGroups from './components/Main/Dashboard/Groups/MyGroups';
import GroupMembers from './components/Main/Dashboard/GroupMembers/GroupMembers';
import CreateEvent from './components/Main/Dashboard/Events/CreateEvent';
import Profile from './components/Main/Dashboard/Profile/Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />
      },
      {
        path: "/creategroup",
        element: <CreateGroup />
      },
      {
        path: "/group/:groupId/createevent",
        element: <CreateEvent />
      },
      {
        path: "/mygroups",
        element: <MyGroups />
      },
      {
        path: "/group/:groupId/dashboard",
        element: <Dashboard />,
      }
      ,
      {
        path: "/group/:groupId/groupmembers",
        element: <GroupMembers />,
      }
      ,
      {
        path: "/myprofile",
        element: <Profile />,
      }
    ]
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
