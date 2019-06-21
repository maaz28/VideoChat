import React from 'react';

const LoginContext = React.createContext({
  login: false,
  isLogin: () => { }
});

export const LoginProvider = LoginContext.Provider;
export const LoginConsumer = LoginContext.Consumer;
