import React, { useState, useEffect, useContext } from "react";
import createAuth0Client, { Auth0ClientOptions, Auth0Client } from "@auth0/auth0-spa-js";

const DEFAULT_REDIRECT_CALLBACK = () => window.history.replaceState({}, document.title, window.location.pathname);

export interface AuthContext {
  isAuthenticated: boolean;
  user?: any;
  loading: boolean;
  popupOpen: boolean;
  loginWithPopup?: Function;
  handleRedirectCallback?: Function;
  getIdTokenClaims?: Function;
  loginWithRedirect?: Function;
  getTokenSilently?: Function;
  gettokenWithPopup?: Function;
  logout?: Function;
}

export const Auth0Context = React.createContext<AuthContext>({
  isAuthenticated: false,
  loading: false,
  popupOpen: false,
});
// This is the react-hook way of doing things
export const useAuth0 = () => useContext(Auth0Context);

interface Auth0ProviderProps extends Auth0ClientOptions {
  children : any,
  onRedirectCallback : (arg:any)=>void
}

export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
} : Auth0ProviderProps ) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string>();
  const [auth0Client, setAuth0] = useState<Auth0Client|undefined>();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setLoading(false);
    };
    initAuth0();
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client!.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client?.getUser();
    if (user) {
      setUser(user);
      setIsAuthenticated(true);
    }
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client!.handleRedirectCallback();
    const user = await auth0Client!.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        //@ts-ignore
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        //@ts-ignore
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        //@ts-ignore
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        //@ts-ignore
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        //@ts-ignore
        logout: (...p) => auth0Client.logout(...p),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
