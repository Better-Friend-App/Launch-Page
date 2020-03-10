import React, { useState, useEffect } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import Confetti from "./Confetti";

import {
  Grid,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Button
} from "@material-ui/core";

import HandIcon from "@material-ui/icons/PanTool";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  main: {
    padding: "2rem"
  },
  header: {
    margin: "2rem",
    color: "#1A237E"
  },
  subHeader: {
    margin: "2rem",
    fontWeight: "bold",
    color: "#373D3F"
  },
  body: {
    fontSize: "1.6rem"
  },
  content: {
    margin: "2rem 0rem",
    color: "#373D3F",
    fontWeight: "lighter"
  },
  quote: {
    fontStyle: "italic",
    margin: "2rem 0rem",
    fontSize: "1.2rem"
  },
  closing: {
    fontFamily: "Caveat"
  },
  divider: {
    margin: "5rem 0rem"
  },
  fullWidth: {
    width: "100%"
  },
  flex: {
    display: "flex"
  },
  flexCenter: {
    margin: "auto"
  },
  submit: {
    margin: "2rem 0rem"
  },
  emojiStatus: {
    fontSize: "80px"
  },
  input: {
    background: "white"
  },
  status: {
    margin: "1rem 0"
  }
}));

const mailchimpUrl =
  "https://betterfriendapp.us4.list-manage.com/subscribe/post?u=b9495e03a31ea97485ed32c15&amp;id=8b96342f9e";

function App() {
  const classes = useStyles();
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [status, setStatus] = useState();

  const handleSubscribeClose = () => {
    setSubscribeOpen(false);
  };

  const handleStatus = status => {
    setStatus(status);
  };
  const btnStyle = {
    background: "orange",
    color: "white",
    fontSize: "24px",
    borderRadius: "8px",
    border: "0",
    padding: "10px 20px",
    marginTop: "20px",
    width: "100%"
  }
  const CustomForm = ({ formStatus, message, onValidated, handleStatus }) => {
    const invalidEmailMsg = "Please enter a valid email!";

    const [status, setStatus] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});

    const submitForm = () => {
      // HANDLE ERROR VALIDATION
      if (!form["EMAIL"].includes("@")) {
        let tmp = { ...errors };
        tmp["EMAIL"] = invalidEmailMsg;
        setErrors({ ...tmp });
      }

      // IF NO ERRORS, SEND TO onValidated()
      else {
        onValidated(form);
        
      }
    };

    const handleFormChange = e => {
      const { name, value } = e.target;
      let tmp = { ...form };
      tmp[name] = value;

      setForm({ ...tmp });

      // RESET ERRORS
      setErrors({});
    };

    useEffect(() => {
      var promise = Promise.resolve();
      if (window.dataLayer) {
          promise = promise.then(function() {
            window.dataLayer.push({ event: "optimize.activate" });
          }) 
        }
        this.intervalId = setInterval(() => {
          if (window.google_optimize !== undefined) {
            const variant = window.google_optimize.get('XRQk0MXcRY6lxs0Ico-w0w');
            this.setState({ variant });
            clearInterval(this.intervalId);
          }
        }, 100);
      let tmp = formStatus;

      if (message) {
        if (message.includes("email address is invalid"))
          setStatusMessage("Seems your email address is invalid...");
        else if (message.includes("already subscribed")) {
          setStatusMessage(
            "Seems you're already subscribed. Let's celebrate anyway!"
          );
          tmp = "subscribed";
        } else if (message.includes("too many recent signup requests"))
          setStatusMessage(
            "Seems you've been trying to sign up too many times..."
          );
        else if (formStatus === "success")
          setStatusMessage("Thank you so much. Here's to better friendships!");
      }

      setStatus(tmp);
      handleStatus(tmp);
    }, [formStatus, message]);

    return (
      <Grid container spacing={1}>
        <Grid item xs={12} sm={5}>
          <div className={classes.flex}>
            <div className={classes.flexCenter}>
              <div>
                <div className={classes.flex}>
                  <div className={classes.flexCenter}>
                    <span
                      style={{ width: "100%" }}
                      className={clsx(classes.flexCenter, classes.emojiStatus)}
                    >
                      {status === "subscribed" ? (
                        <span role="img" aria-label="face with hearts emoji">
                          🥰
                        </span>
                      ) : status === "success" ? (
                        <span role="img" aria-label="party emoji">
                          🥳
                        </span>
                      ) : status === "error" ? (
                        <span role="img" aria-label="investigate emoji">
                          🧐
                        </span>
                      ) : (
                        <span role="img" aria-label="cheery emoji">
                          😄
                        </span>
                      )}
                    </span>
                  </div>
                </div>
                <Typography
                  className={classes.status}
                  align="center"
                  variant="caption"
                  component="p"
                >
                  {statusMessage || ""}
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={7}>
          <TextField
            autoComplete="off"
            label="Name"
            onChange={handleFormChange}
            name="NAME"
            placeholder="Firstname Lastname"
            fullWidth
            variant="outlined"
            margin="normal"
            className={classes.input}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            autoComplete="off"
            label="Email"
            placeholder="You@domain.com"
            onChange={handleFormChange}
            name="EMAIL"
            error={errors["EMAIL"] ? true : false}
            helperText={errors["EMAIL"] || ""}
            type="email"
            fullWidth
            variant="outlined"
            margin="normal"
            className={classes.input}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12} className={clsx(classes.submit, classes.flex)}>
          <div className={classes.flexCenter}>
            <Button
              onClick={submitForm}
              variant="contained"
              color="primary"
              size="large"
              style={{ backgroundColor: "#ffbd44" }}
              startIcon={<HandIcon />}
            >
              Sign me up
            </Button>
          </div>
        </Grid>
      </Grid>
    );
  };

  return (
    <div>
      {status === "success" || status === "subscribed" ? (
        <Confetti numberOfPieces={300} />
      ) : (
        ""
      )}

      <Dialog
        onClose={handleSubscribeClose}
        aria-labelledby="subscribe-dialog-title"
        open={subscribeOpen}
        className={classes.dialog}
      >
        <DialogTitle
          style={{ backgroundColor: "#7ac5ff", color: "white" }}
          id="subscribe-dialog-title"
        >
          Stay Updated
        </DialogTitle>
        <DialogContent
          style={{ backgroundColor: "#e9faff" }}
          className={classes.dialog}
        >
          <MailchimpSubscribe
            url={mailchimpUrl}
            render={({ subscribe, status, message }) => (
              <CustomForm
                handleStatus={handleStatus}
                formStatus={status}
                message={message}
                onValidated={formData => subscribe(formData)}
              />
            )}
          />
        </DialogContent>
      </Dialog>
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.main}
      >
        {/* <Grid item xs={12} sm={10} md={8} lg={6} xl={4}> */}
        <Grid item xs={10} sm={8} md={6} lg={4}>
          <Typography className={classes.header} variant="h2" align="center">
            Hey,
          </Typography>

          <Typography
            className={clsx(classes.subHeader)}
            variant="h5"
            align="center"
          >
            Let’s talk about social media.
          </Typography>

          {/*<Typography
            variant="body1"
            className={clsx(classes.body, classes.content)}
          >
            It all started out so innocent. Tom just wanted to be our friend.
            The Zuck promised us a better way to stay connected.
          </Typography>*/}

          <Typography
            variant="body1"
            className={clsx(classes.body, classes.content)}
          >
            Elon Musk is right: Facebook is lame. Ads, unsolicited
            political opinions, poorly-drawn memes, and post after post of
            mindless garbage. It’s enough to make you go crazy{" "}
            <span role="img" aria-label="mind blown emoji">
              🤯
            </span>
            .
          </Typography>

          <Typography
            variant="body1"
            className={clsx(classes.body, classes.content)}
          >
            <span className="strong">But, it doesn't <em> have </em> to stay like this.</span>
          </Typography>

          <Typography
            variant="body1"
            className={clsx(classes.body, classes.content)}
          >
            What if a service not only helped you stay connected, but actually
            helped improve your friendships? What if instead of being bombarded
            with nonsense, you got what you actually wanted: an easy way to keep
            up with your friends, without the{" "}
            <span role="img" aria-label="poop emoji">
              💩
            </span>
            .
          </Typography>

          <Typography
            variant="body1"
            className={clsx(classes.body, classes.content)}
          >
            We’re a small team of philosopher-hackers{" "}
            <span role="img" aria-label="nerd emoji">
              🤓
            </span>{" "}
            working on cutting through the noise of existing social media by
            using tech to radically improve people's relationships.
          </Typography>

          <Typography
            variant="body1"
            className={clsx(classes.body, classes.content)}
          >
            We’ve got a solution we’re launching soon{" "}
            <span role="img" aria-label="rocket emoji">
              🚀
            </span>{" "}
            and we’re really excited for you to try it.
          </Typography>

          <Typography
            variant="body1"
            className={clsx(classes.body, classes.content)}
          >
            Click{" "}
            <span
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                color: "orange",
                fontWeight:"bold",
                textDecoration: "underline"
              }}
              onClick={() => setSubscribeOpen(true)}
            >
              here
            </span>{" "}
            to subscribe and receive updates, important information, and{" "}
            <strong>exclusive BETA access</strong> to the project.
          </Typography>

          <div className={classes.divider}>
            <Typography variant="h5" className={classes.closing}>
              Sincerely,
            </Typography>
            <Typography variant="h4" className={classes.closing}>
              the Better Friend team{" "}
              <span role="img" aria-label="heart emoji">
                ❤️
              </span>
            </Typography>
            <button style={btnStyle} onClick={() => setSubscribeOpen(true)}>Sign Me Up</button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
