import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import './App.scss';

const LoginPage = lazy(() => import("./components/Login"));
const ManagementPage = lazy(() => import("./components/Management"));
const MyBooksPage = lazy(() => import("./components/MyBooks"));


function App() {
  return (
    <div className="App">
      <Suspense fallback={<p>Loading page</p>}>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/management" component={ManagementPage} />
          <Route exact path="/library" component={MyBooksPage} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
