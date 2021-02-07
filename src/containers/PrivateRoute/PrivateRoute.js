import { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { recieveAuth, isAuthenticated } from "../../modules/users";

const PrivateRoute = ({ isAuthenticated, component, ...others }) => {
  useEffect(() => {
    recieveAuth();
  }, []);

  const Component = component;

  return (
    <Route
      {...others}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state.users)
});

const mapDispatchToProps = { recieveAuth };

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
