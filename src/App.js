import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'reactstrap'
import { Home, Login } from './pages'
import { Navigation } from './components'

function App() {
  return (
    <div >
      <Navigation></Navigation>
      <Container>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
      </Container>
    </div>
  );
}

export default App;
