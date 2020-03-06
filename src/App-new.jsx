import React from 'react';
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import {
    Typography
  } from "@material-ui/core";
  const useStyles = makeStyles(theme => ({

    subHeader: {
      margin: "2rem",
      fontWeight: "bold",
      color: "#373D3F"
    }
  }));
function App() {
  const classes = useStyles();
    return (
        <div>
            <header>
                <Typography
                    className={clsx(classes.subHeader)}
                    variant="h5"
                    align="center"
                >
                    Let’s talk about social media.
                </Typography>
            </header>
    
            <main>
            {this.props.children}
            </main>
    
            <footer>
            Better Friend &copy;2020
            </footer>
        </div>
    );
}
export default App;