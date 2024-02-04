import React, { Suspense } from 'react';
// import { TsReactTest } from "try-use-array";
import './App.css';
import 'antd/dist/antd.min.css';
import { useAuth } from './screens/context/auth-context';
// import  UnauthenticatedApp from './unauthenticated-app';
// import AuthenticatedApp from './authenticated-app';
import { ErrorBoundary } from 'components/error-boundary';
import { FullPageErrorFallback, FullPageLoading } from 'components/lib';

const AuthenticatedApp = React.lazy(() => import('authenticated-app'));
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'));

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <Suspense fallback={<FullPageLoading />}>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
