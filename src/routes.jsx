import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProjectList from './ProjectList';
import ProjectDetails from './Project';

const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProjectList />} />
                <Route path="/:id" element={<ProjectDetails />} />
                {/*TODO: Fill */}
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes;