import React, { Fragment, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import UseMediaQuery from "@material-ui/core/UseMediaQuery";
import AddIcon from "@material-ui/icons/Add";
import Hidden from "@material-ui/core/Hidden";
import FilterListIcon from "@material-ui/icons/FilterList";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";

import EnhancedTable from "../src/ui/EnhancedTable";

const useStyles = makeStyles((theme) => ({
  service: {
    fontWeight: 300,
  },
  users: {
    marginRight: 0,
  },
  button: {
    color: "#fff",
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    textTransform: "none",
    "$:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

function createData(
  name,
  date,
  service,
  features,
  complexity,
  platforms,
  users,
  total,
  search
) {
  return {
    name,
    date,
    service,
    features,
    complexity,
    platforms,
    users,
    total,
    search,
  };
}

const ProjectManager = () => {
  const classes = useStyles();
  const theme = useTheme();

  const matchesMD = UseMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = UseMediaQuery(theme.breakpoints.down("sm"));

  const [websiteChecked, setWebsiteChecked] = useState(false);
  const [iOSChecked, setIOSChecked] = useState(false);
  const [androidChecked, setAndroidChecked] = useState(false);
  const [softwareChecked, setSoftwareChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [total, setTotal] = useState("");
  const [service, setService] = useState("");
  const [complexity, setComplexity] = useState("");
  const [users, setUsers] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [features, setFeatures] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = useState([
    createData(
      "Zachary Reece",
      "11/2/19",
      "Website",
      "E-Commerce",
      "N/A",
      "N/A",
      "N/A",
      "$1500",
      true
    ),
    createData(
      "achary Reece",
      "11/2/19",
      "Website",
      "E-Commerce,E-Commerce,E-Commerce,E-Commerce, ",
      "N/A",
      "N/A",
      "N/A",
      "$1500",
      true
    ),
  ]);

  const platformOptions = ["Web", "iOS", "Andriod"];
  let featureOptions = [
    "Photo/Video",
    "GPS",
    "File Transfer",
    "User/Authentication",
    "Biometrics",
    "Push Notifications",
  ];
  let websiteOptions = ["Basic", "Interactive", "E-Commerce"];

  const addProject = () => {
    setRows([
      ...rows,
      createData(
        name,
        format(date, "MM/dd/yy"),
        service,
        features.join(", "),
        service === "Website" ? "N/A" : complexity,
        service === "Website" ? "N/A" : platforms.join(", "),
        service === "Website" ? "N/A" : users,
        `$${total}`,
        true
      ),
    ]);
    setDialogOpen(false);
    setName("");
    setDate(new Date());
    setTotal("");
    setService("");
    setComplexity("");
    setUsers("");
    setPlatforms([]);
    setFeatures([]);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);

    const rowData = rows.map((row) =>
      Object.values(row).filter((option) => option !== true && option !== false)
    );

    const matches = rowData.map((row) =>
      row.map((option) =>
        option.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );

    const newRows = [...rows];
    matches.map((row, index) =>
      row.includes(true)
        ? (newRows[index].search = true)
        : (newRows[index].search = false)
    );

    setRows(newRows);
    setPage(0);
  };

  const serviceQuestions = (
    <Fragment>
      <Grid item style={{ marginTop: matchesSM ? 20 : "5em" }}>
        <Typography variant="h4">Service</Typography>
      </Grid>
      <Grid item>
        <RadioGroup
          aria-label="service"
          name="service"
          value={service}
          onChange={(e) => {
            setService(e.target.value);
            setFeatures([]);
          }}
        >
          <FormControlLabel
            classes={{ label: classes.service }}
            value="Website"
            label="Website"
            control={<Radio />}
          />
          <FormControlLabel
            classes={{ label: classes.service }}
            value="Mobile App"
            label="Mobile App"
            control={<Radio />}
          />
          <FormControlLabel
            classes={{ label: classes.service }}
            value="Custom Software"
            label="Custom Software"
            control={<Radio />}
          />
        </RadioGroup>
      </Grid>
    </Fragment>
  );

  const complexityQuestions = (
    <Grid item style={{ marginBottom: matchesSM ? 50 : null }}>
      <Grid
        item
        container
        direction="column"
        style={{ marginTop: matchesSM ? 50 : "5em" }}
      >
        <Grid item>
          <Typography variant="h4">Complexity</Typography>
        </Grid>
        <Grid item>
          <RadioGroup
            aria-label="complexity"
            name="complexity"
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
          >
            <FormControlLabel
              disabled={service === "Website"}
              classes={{ label: classes.service }}
              value="Low"
              label="Low"
              control={<Radio />}
            />
            <FormControlLabel
              disabled={service === "Website"}
              classes={{ label: classes.service }}
              value="Medium"
              label="Medium"
              control={<Radio />}
            />
            <FormControlLabel
              disabled={service === "Website"}
              classes={{ label: classes.service }}
              value="High"
              label="High"
              control={<Radio />}
            />
          </RadioGroup>
        </Grid>
      </Grid>
    </Grid>
  );

  const userQuestions = (
    <Grid item style={{ alignSelf: matchesSM ? "center" : "flex-end" }}>
      <Grid
        item
        container
        direction="column"
        style={{ marginTop: matchesSM ? 50 : "5em" }}
      >
        <Grid item>
          <Typography variant="h4">Users</Typography>
        </Grid>
        <Grid item>
          <RadioGroup
            aria-label="users"
            name="users"
            value={users}
            onChange={(e) => setUsers(e.target.value)}
          >
            <FormControlLabel
              disabled={service === "Website"}
              classes={{
                label: classes.service,
                root: classes.users,
              }}
              value="0-10"
              label="0-10"
              control={<Radio />}
            />
            <FormControlLabel
              disabled={service === "Website"}
              classes={{
                label: classes.service,
                root: classes.users,
              }}
              value="10-100"
              label="10-100"
              control={<Radio />}
            />
            <FormControlLabel
              disabled={service === "Website"}
              classes={{
                label: classes.service,
                root: classes.users,
              }}
              value="100+"
              label="100+"
              control={<Radio />}
            />
          </RadioGroup>
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid
        container
        direction="column"
        alignItems={matchesMD ? "center" : undefined}
      >
        <Grid
          item
          style={{ marginTop: "2em", marginLeft: matchesSM ? 0 : "5em" }}
        >
          <Typography variant="h1">Projects</Typography>
        </Grid>
        <Grid item>
          <TextField
            placeholder="Search project details or create a new entry."
            style={{
              width: matchesSM ? "25em" : "35em",
              marginLeft: matchesSM ? 0 : "5em",
            }}
            value={search}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => setDialogOpen(true)}
                  style={{ cursor: "pointer" }}
                >
                  <AddIcon color="primary" style={{ fontSize: 30 }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid
          item
          style={{ marginLeft: matchesSM ? 0 : "5em", marginTop: "2em" }}
        >
          <FormGroup row>
            <Grid
              container
              direction={matchesSM ? "column" : "row"}
              justify={matchesSM ? "center" : undefined}
            >
              <Grid item>
                <FormControlLabel
                  style={{ marginRight: matchesSM ? 0 : "5em" }}
                  label="Websites"
                  labelPlacement={matchesSM ? "end" : "start"}
                  control={
                    <Switch
                      checked={websiteChecked}
                      color="primary"
                      onChange={() => setWebsiteChecked(!websiteChecked)}
                    />
                  }
                ></FormControlLabel>
              </Grid>
              <Grid item>
                <FormControlLabel
                  style={{ marginRight: matchesSM ? 0 : "5em" }}
                  label="iOS Apps"
                  labelPlacement={matchesSM ? "end" : "start"}
                  control={
                    <Switch
                      checked={iOSChecked}
                      color="primary"
                      onChange={() => setIOSChecked(!iOSChecked)}
                    />
                  }
                ></FormControlLabel>
              </Grid>
              <Grid item>
                <FormControlLabel
                  style={{ marginRight: matchesSM ? 0 : "5em" }}
                  label="Android Apps"
                  labelPlacement={matchesSM ? "end" : "start"}
                  control={
                    <Switch
                      checked={androidChecked}
                      color="primary"
                      onChange={() => setAndroidChecked(!androidChecked)}
                    />
                  }
                ></FormControlLabel>
              </Grid>
              <Grid item>
                <FormControlLabel
                  label="Custom Software"
                  labelPlacement={matchesSM ? "end" : "start"}
                  control={
                    <Switch
                      checked={softwareChecked}
                      color="primary"
                      onChange={() => setSoftwareChecked(!softwareChecked)}
                    />
                  }
                ></FormControlLabel>
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>
        <Grid
          item
          style={{
            marginTop: "5em",
            marginBottom: matchesMD ? "40em" : "35em",
            maxWidth: "100%",
          }}
        >
          <EnhancedTable
            setRows={setRows}
            rows={rows}
            page={page}
            setPage={setPage}
            websiteChecked={websiteChecked}
            iOSChecked={iOSChecked}
            androidChecked={androidChecked}
            softwareChecked={softwareChecked}
          />
        </Grid>
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          fullWidth
          maxWidth="md"
          style={{ zIndex: 1302 }}
          fullScreen={matchesSM}
        >
          <Grid container justify="center">
            <Grid item>
              <Typography variant="h1" gutterBottom>
                Add a new project
              </Typography>
            </Grid>
          </Grid>
          <DialogContent>
            <Grid
              container
              justify="space-between"
              direction={matchesSM ? "column" : "row"}
            >
              <Grid item>
                <Grid
                  item
                  container
                  direction="column"
                  sm
                  alignItems={matchesSM ? "center" : undefined}
                >
                  <Hidden mdUp style={{ marginTop: 20 }}>
                    {serviceQuestions}
                  </Hidden>
                  <Hidden mdUp>{userQuestions}</Hidden>
                  <Hidden mdUp>{complexityQuestions}</Hidden>
                  <Grid item>
                    <TextField
                      style={{ width: matchesSM ? 250 : undefined }}
                      fullWidth={!matchesSM}
                      label="Name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid
                    item
                    container
                    direction="column"
                    alignItems={matchesSM ? "center" : undefined}
                  >
                    <Hidden smDown>{serviceQuestions}</Hidden>
                    <Grid item style={{ marginTop: matchesSM ? 50 : "5em" }}>
                      <Select
                        style={{ width: matchesSM ? 250 : "12em" }}
                        disabled={service === "Website"}
                        labelId="platforms"
                        id="platforms"
                        multiple
                        renderValue={
                          platforms.length > 0 ? undefined : () => "Platforms"
                        }
                        displayEmpty
                        value={platforms}
                        onChange={(e) => setPlatforms(e.target.value)}
                      >
                        {platformOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  item
                  container
                  direction="column"
                  sm
                  alignItems="center"
                  style={{ marginTop: 16 }}
                >
                  <Grid item style={{ marginTop: matchesSM ? 50 : null }}>
                    <KeyboardDatePicker
                      style={{ width: matchesSM ? 250 : undefined }}
                      format="MM/dd/yyyy"
                      value={date}
                      onChange={(newDate) => setDate(newDate)}
                    />
                  </Grid>
                  <Hidden smDown>{complexityQuestions}</Hidden>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  item
                  container
                  direction="column"
                  sm
                  alignItems={matchesSM ? "center" : undefined}
                >
                  <Grid item style={{ marginTop: matchesSM ? 50 : null }}>
                    <TextField
                      style={{ width: matchesSM ? 250 : undefined }}
                      label="Total"
                      id="total"
                      value={total}
                      onChange={(e) => setTotal(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Hidden smDown>{userQuestions}</Hidden>
                  <Grid item style={{ marginTop: matchesSM ? 50 : "5em" }}>
                    <Select
                      style={{ width: matchesSM ? 250 : "12em" }}
                      MenuProps={{
                        style: {
                          zIndex: 1302,
                        },
                      }}
                      labelId="features"
                      id="features"
                      multiple
                      renderValue={
                        features.length > 0 ? undefined : () => "Features"
                      }
                      displayEmpty
                      value={features}
                      onChange={(e) => setFeatures(e.target.value)}
                    >
                      {service === "Website"
                        ? (featureOptions = websiteOptions)
                        : null}
                      {featureOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container justify="center" style={{ marginTop: "3em" }}>
              <Grid item>
                <Button
                  color="primary"
                  style={{ fontWeight: 300 }}
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={addProject}
                  disabled={
                    service === "Website"
                      ? name.length === 0 ||
                        total.length === 0 ||
                        features.length === 0 ||
                        features.length > 1
                      : name.length === 0 ||
                        total.length === 0 ||
                        features.length === 0 ||
                        users.length === 0 ||
                        complexity.length === 0 ||
                        platforms.length === 0 ||
                        service.length === 0
                  }
                >
                  Add Project +
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default ProjectManager;
