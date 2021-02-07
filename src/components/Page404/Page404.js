import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Typography, Button, withStyles } from "@material-ui/core";

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 2
  }
});

const Page404 = ({ classes }) => {
  return (
    <React.Fragment>
      <Typography variant="display4">404</Typography>
      <Typography variant="headline">
        We could not find a page you are looking for
      </Typography>
      <Button
        variant="outlined"
        className={classes.button}
        component={Link}
        to="/"
      >
        Back Home
      </Button>
    </React.Fragment>
  );
};

export default withStyles(styles)(Page404);
