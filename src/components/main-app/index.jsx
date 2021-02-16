import React from 'react';
import {
    Switch,
    Route
  } from "react-router-dom";
import Sidebar from "../sidebar";
import Home from '../../pages/home';
import Project from '../../pages/project';
import Projects from '../../pages/projects';
import Users from '../../pages/users';
import AddProject from '../../pages/add-project';
import Profile from '../../pages/profile';
import AlmostThere from '../../pages/almost-there';
import ManageProjects from '../../pages/manage-projects';
import WithContextRoute from "../context-hoc"

const MainApp = () => {
    return ( 
        <div className="bg-gray-100 h-screen w-full">
            <div className="h-full flex overflow-hidden bg-white flex-col lg:flex-row  mx-auto w-full">
            <Sidebar />
                <div className="flex flex-col w-full flex-1 overflow-hidden bg-gray-50">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/home"  component={Home} />
                        <Route path="/projects/:project"  component={Project} />
                        <Route path="/projects"  component={Projects} />
                        <Route path="/users"  component={Users} />
                        <Route path="/add-project"  component={AddProject}/>
                        <Route path="/manage-projects/:project"  component={AddProject}/>
                        <Route path="/manage-projects"  component={ManageProjects}/>
                        <Route path="/profile"  component={Profile}/>
                        <Route path="/profile/:userName" component={Profile}/>
                        <Route path="/edit-profile" component={AlmostThere}/>
                    </Switch>
                </div>
            </div>
        </div>
     );
}
 
export default MainApp;