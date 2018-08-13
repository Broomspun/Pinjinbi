import React from 'react';
import {Stack, Scene, Actions, Router} from 'react-native-router-flux';
import {SplashScreen} from "@containers";


const RouterComponent = () => {
    return (
      <Router>
          <Stack key="root">
              <Scene key="splashscreen" component={SplashScreen} hideNavBar />
          </Stack>
      </Router>
    );
};


export default RouterComponent;
