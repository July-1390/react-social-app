import React, { useState } from "react";
import { Paper, TextField, Button, Grid, withStyles } from "@material-ui/core";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2
  },
  tweetButton: {
    marginTop: theme.spacing.unit
  }
});

const TweetInput = ({ classes, onSubmit }) => {
  const [inputValue, setInputValue] = useState(null);

  // const defaultProps = {
  //   onSubmit: () => {},
  // };

  const input = React.createRef();

  const handleSubmit = event => {
    event.preventDefault();
    // if (!inputValue.trim()) {
    //   return;
    // }

    onSubmit(inputValue, event);
    setInputValue("");
  };

  return (
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit} autoComplete="off">
        <TextField
          required
          fullWidth
          multiline
          rows={2}
          placeholder="What's happening?"
          inputRef={input}
        />
        <Grid container justify="flex-end">
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              type="submit"
              className={classes.tweetButton}
            >
              Tweet
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default withStyles(styles)(TweetInput);
