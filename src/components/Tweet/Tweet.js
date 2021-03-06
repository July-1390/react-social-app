import { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  withStyles
} from "@material-ui/core";
import Markdown from "react-markdown";
import colorFrom from "../../utils/colors";

const imageUrlRe = RegExp(/\b(https?:\/\/\S+(?:png|jpe?g|gif)\S*)\b/g);

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit * 2
  },
  cardMedia: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  content: {
    wordWrap: "break-word"
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.dark
  }
});

const Tweet = ({
  classes,
  id,
  text,
  createdAt,
  user: { username },
  replyToId,
  repliedTweet,
  highlighted
}) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!text) {
      // TODO: get rid of this validation
      return;
    }

    const foundImages = text.match(imageUrlRe);
    if (foundImages) {
      setImage(foundImages[0]);
    }
  }, []);

  return (
    <Card
      key={id}
      component={highlighted ? "div" : "li"}
      className={classes.card}
      elevation={highlighted ? 8 : 1}
    >
      {image && (
        <CardMedia
          className={classes.cardMedia}
          image={image}
          title="An tweet's image"
        />
      )}

      <CardHeader
        avatar={
          <Avatar
            style={{
              backgroundColor: colorFrom(username)
            }}
          >
            {username[0]}
          </Avatar>
        }
        title={username}
        subheader={
          <Link to={`/tweet/${id}`} className={classes.link}>
            {moment(createdAt).fromNow()}
          </Link>
        }
      />

      <CardContent className={classes.content}>
        {repliedTweet && (
          <Typography variant="caption">
            In reply to{" "}
            <Link to={`/tweet/${replyToId}`} className={classes.link}>
              <cite>{repliedTweet.text}</cite>
            </Link>
          </Typography>
        )}
        <Typography variant={highlighted ? "display1" : "subheading"}>
          <Markdown
            source={text}
            allowedTypes={[
              "root",
              "paragraph",
              "break",
              "emphasis",
              "strong",
              "delete",
              "link",
              "linkReference",
              "inlineCode",
              "code"
            ]}
          />
        </Typography>
      </CardContent>

      {!highlighted && (
        <CardActions>
          <Button color="primary" component={Link} to={`/tweet/${id}`}>
            Reply
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default withStyles(styles)(Tweet);
