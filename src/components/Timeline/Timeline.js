import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  timeline: {
    padding: 0
  }
});

const Timeline = ({ classes, children }) => (
  <ul className={classes.timeline}>{children}</ul>
);

// Timeline.defaultProps = {
//   children: null,
// };

export default withStyles(styles)(Timeline);
