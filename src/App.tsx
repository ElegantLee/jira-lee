import React from 'react';
// import { TsReactTest } from "try-use-array";
import './App.css';
import 'antd/dist/antd.min.css';
import { useAuth } from './screens/context/auth-context';
import { UnauthenticatedApp } from './screens/unauthenticated-app';
import { AuthenticatedApp } from './authenticated-app';
import { ErrorBoundary } from 'components/error-boundary';
import { FullPageErrorFallback } from 'components/lib';
// import { ProjectListScreen } from "./screens/project-list";
// import { LoginScreen } from "./screens/login";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
