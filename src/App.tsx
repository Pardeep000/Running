/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
import expressConfig from "./config/express.json";
import { Omit, Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import { ThemeProvider } from '@mui/material/styles'
import ProtectedRoute from "./router/ProtectedRoute";
import LoginForgetPassword from "./components/loginForgetPassword";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import "react-phone-number-input/style.css";
import { onError } from "apollo-link-error";
import "./App.css";
import { setChatBoxSubscriptionStatus } from "./store/actions/ChatBoxActions";
//import { SubscriptionClient } from "subscriptions-transport-ws";
import Privacy from "./components/loginForgetPassword/Privacy";
import ChatTransfer from "./components/chatBox/ChatTransfer";
import { ApolloError } from "@apollo/client";
import theme from './style/theme'

function App() {
  const { enqueueSnackbar } = useSnackbar();


  function linkErrorHandler({ graphQLErrors, networkError }: ApolloError) {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );

        // enqueueSnackbar(message, { variant: "error" });
      });
    }

    if (networkError) {
      enqueueSnackbar("Unable to connect to server contact admin.", {
        variant: "error",
      });
    }
  }


  const env = process.env.NODE_ENV || "test";
  const config = expressConfig[env];

  const httpLink = new HttpLink({
    uri: `${config.graphql_domain}:${config.port}/${config.graphql_endpoint}`,
    credentials: "include",
  });

  let wsLink: any = new WebSocketLink({
    uri: `${config.graphql_domain}:${config.port}/${config.graphql_endpoint}`,
    options: {
      timeout: 600000,
      minTimeout: 600000,
      reconnect: true,
      lazy: true,
    },
  });


  wsLink.subscriptionClient.on("connecting", () => {
    store.dispatch(setChatBoxSubscriptionStatus(false));
    console.log("connecting subs " + new Date().toString());
  });

  wsLink.subscriptionClient.on("connected", () => {
    store.dispatch(setChatBoxSubscriptionStatus(true));
    console.log("connected subs " + new Date().toString());
  });

  wsLink.subscriptionClient.on("reconnecting", () => {
    store.dispatch(setChatBoxSubscriptionStatus(false));
    console.log("reconnecting subs " + new Date().toString());
  });

  wsLink.subscriptionClient.on("reconnected", () => {
    store.dispatch(setChatBoxSubscriptionStatus(true));
    console.log("reconnected subs " + new Date().toString());
  });

  wsLink.subscriptionClient.on("disconnected", () => {
    store.dispatch(setChatBoxSubscriptionStatus(false));
    console.log("disconnected subs " + new Date().toString());
  });
  wsLink.subscriptionClient.on("onError", (error: { message: string; }) => {
    store.dispatch(setChatBoxSubscriptionStatus(false));
    console.log(error.message + "  " + new Date().toString());
  });

  wsLink.subscriptionClient.maxConnectTimeGenerator.duration = () =>
    wsLink.subscriptionClient.maxConnectTimeGenerator.max;

  const logoutLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        if (err.extensions && err.extensions.code === "UNAUTHENTICATED") {
          window.location.href = "/login";
        }
      }
    }
  });

  //if(networkError.statusCode == 404)
  //

  const splitLink: any = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  // const ApolloClient_  = new ApolloClient({
  //   link: logoutLink.concat(splitLink),
  //   onError: linkErrorHandler,
  //   cache: new InMemoryCache(),
  // })

  const ApolloClient_ = new ApolloClient({
    link: ApolloLink.from([logoutLink, splitLink]),
    onError: linkErrorHandler,
    cache: new InMemoryCache(),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  window.Object.freeze = function (obj: any) {
    return obj;
  }; // for Cannot add property tableData, object is not extensible Error

  return (
    <BrowserRouter>
      <ApolloProvider client={ApolloClient_}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Switch>
              {/* <Route
                exact
                path="/reports/totalcustomerreport/:id"
                render={(props) => <ChatDetail />}
              ></Route> */}
              <Route
                exact
                path="/termsprivacy"
                render={(props: any) => <Privacy />}
              ></Route>
              <Route
                exact
                path="/transferto/:cid/:pid"
                render={(props: any) => <ChatTransfer />}
              ></Route>
              {/* <Route exact
              path="/confirm"
              render={(props)=>(<EmailConfirmation/>)}
              ></Route> */}
              <Route
                exact
                strict
                path={[
                  "/login",
                  "/resetpassword/:token",
                  "/signup",
                  "/confirm",
                  "/join/:email/:designation/:superAdminId/:token",
                  "/join/:designation/:superAdminId/:token",
                ]}
                render={(props: JSX.IntrinsicAttributes & Omit<any, string | number | symbol>) => (
                  <LoginForgetPassword
                    {...props}
                    titleLogin={`Login`}
                    titleForgetPassword={"Forget Password"}
                  />
                )}
              ></Route>
              {/* <Route
                exact
                path="/chat/:id"
                render={(props) => <ChatBox {...props} isSuperAdmin={true} />}
              /> */}
              {/* <Route
                exact
                strict
                path={"/join/:email/:token"}
                render={(props) => (
                  <InviteAgentSignup
                    {...props}
                  />
                )}
              ></Route> */}
              <ProtectedRoute wsLink={wsLink} path="/"></ProtectedRoute>

              <Route path="*" render={() => <div>404</div>}></Route>
            </Switch>
          </ThemeProvider>
        </Provider>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;