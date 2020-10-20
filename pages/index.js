import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles((theme) => ({}));

const ProjectManager = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [websiteChecked, setWebsiteChecked] = useState(false);
  const [iOSChecked, setIOSChecked] = useState(false);
  const [androidChecked, setAndroidChecked] = useState(false);
  const [softwareChecked, setSoftwareChecked] = useState(false);

  return (
    <Grid container direction="column">
      <Grid item style={{ marginTop: "2em", marginLeft: "5em" }}>
        <Typography variant="h1">Projects</Typography>
      </Grid>
      <Grid item>
        <TextField
          placeholder="Search project details or create a new entry."
          style={{ width: "35em", marginLeft: "5em" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AddIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item style={{ marginLeft: "5em", marginTop: "2em" }}>
        <FormGroup row>
          <FormControlLabel
            style={{ marginRight: "5em" }}
            label="Websites"
            labelPlacement="start"
            control={
              <Switch
                checked={websiteChecked}
                color="primary"
                onChange={() => setWebsiteChecked(!websiteChecked)}
              />
            }
          ></FormControlLabel>
          <FormControlLabel
            style={{ marginRight: "5em" }}
            label="iOS Apps"
            labelPlacement="start"
            control={
              <Switch
                checked={iOSChecked}
                color="primary"
                onChange={() => setIOSChecked(!iOSChecked)}
              />
            }
          ></FormControlLabel>
          <FormControlLabel
            style={{ marginRight: "5em" }}
            label="Android Apps"
            labelPlacement="start"
            control={
              <Switch
                checked={androidChecked}
                color="primary"
                onChange={() => setAndroidChecked(!androidChecked)}
              />
            }
          ></FormControlLabel>

          <FormControlLabel
            label="Custom Software"
            labelPlacement="start"
            control={
              <Switch
                checked={softwareChecked}
                color="primary"
                onChange={() => setSoftwareChecked(!softwareChecked)}
              />
            }
          ></FormControlLabel>
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default ProjectManager;
