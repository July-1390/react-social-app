import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Paper,
  Typography,
  TextField,
  Button,
  withStyles
} from "@material-ui/core";
import { login, isAuthenticated } from "../../modules/users";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 5
  },
  textField: {
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 2
  }
});

const Login = ({ classes, isAuthenticated, login }) => {
  // TODO: disable button until input is not filled and right after it was pressed, do not forget to enable it again =D
  const [inputValue, setInputValue] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // useEffect(() => {
  //   console.log(classes);
  //   console.log(isAuthenticated);
  //   console.log(login);
  // }, []);

  const onSubmit = event => {
    event.preventDefault();
    setIsButtonDisabled(true);
    console.log(inputValue);

    if (!inputValue.trim()) {
      return;
      setIsButtonDisabled(false);
    }

    login(inputValue);
    setInputValue("");
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant="display1">Login</Typography>
      <form onSubmit={onSubmit}>
        <TextField
          required
          fullWidth
          type="text"
          placeholder="Your username"
          className={classes.textField}
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
        />
        <Button variant="outlined" type="submit" disabled={isButtonDisabled}>
          Sign In
        </Button>
      </form>
    </Paper>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state.users)
});

const mapDispatchToProps = { login };

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Login)
);
