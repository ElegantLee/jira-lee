import React from 'react';
// import { TsReactTest } from "try-use-array";
import './App.css';
import 'antd/dist/antd.min.css';
import { useAuth } from './screens/context/auth-context';
import { UnauthenticatedApp } from './screens/unauthenticated-app';
import { AuthenticatedApp } from './authenticated-app';
// import { ProjectListScreen } from "./screens/project-list";
// import { LoginScreen } from "./screens/login";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {/*<ProjectListScreen />*/}
      {/*<TsReactTest></TsReactTest>*/}
      {/*<LoginScreen></LoginScreen>*/}
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
