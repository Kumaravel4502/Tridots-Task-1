import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './style.css';
import Dashboard from './src/components/Dashboard';

const Index = () => {
    return (
        <div>
            <h1>Welcome</h1>
        </div>
    );
};
export default Index;

const router = createBrowserRouter([{ path: '/', element: <Dashboard /> }]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);

