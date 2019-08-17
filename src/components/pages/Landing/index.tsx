import * as React from "react";
import {
  withStyles,
  Theme,
  WithStyles,
  createStyles,
  Grid,
  Typography
} from "@material-ui/core";
import LearnMore from "./LearnMore";
import CaseCard from "./CaseCard";

// eslint-disable-next-line
interface Props extends WithStyles<typeof styles> {}

const Landing: React.SFC<Props> = ({ classes }) => (
  <div className={classes.root}>
    <LearnMore />
    <Grid
      container
      direction={"column"}
      justify={"flex-start"}
      alignItems={"center"}
    >
      <Grid item className={classes.centerText}>
        <Typography align={"center"} variant={"h3"}>
          Let's Build Together
        </Typography>
        <Typography align={"center"} variant={"h5"}>
          dOrg is a self-organized developer community that wills software into
          existence.
        </Typography>
      </Grid>
      <Grid item className={classes.cases}>
        <Typography align={"center"} variant={"h4"}>
          Cases
        </Typography>
        <Grid
          container
          direction={"row"}
          justify={"space-evenly"}
          alignItems={"flex-start"}
        >
          <Grid item xs={3} className={classes.caseCard}>
            <CaseCard
              icon={"/icons/gnosis.svg"}
              title={"Continuous Funding"}
              description={"Bonding curve based funding module for DAOs."}
              github={"https://github.com/dOrgTech/BC-DAO"}
            />
          </Grid>
          <Grid item xs={3} className={classes.caseCard}>
            <CaseCard
              icon={"/icons/etoro.svg"}
              title={"Identity DAO"}
              description={"DAO curated registry of human identities."}
              github={"https://github.com/dOrgTech/ID-DAO"}
            />
          </Grid>
          <Grid item xs={3} className={classes.caseCard}>
            <CaseCard
              icon={"/icons/daostack.svg"}
              title={"DAOcreator"}
              description={"Wizard for DAO design and deployment."}
              github={"https://github.com/dOrgTech/DAOcreator"}
              test={"https://dorg.tech/#/dao-creator"}
            />
          </Grid>
          <Grid item xs={3} className={classes.caseCard}>
            <CaseCard
              icon={"/icons/daostack.svg"}
              title={"DAOcomponents"}
              description={"DAO enabling React applications."}
              github={"https://github.com/dOrgTech/DAOcomponents"}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </div>
);

// STYLE
const styles = (theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      height: "75vh",
      // bring forward (infront of background)
      position: "relative",
      // disable pointer events, don't block background
      pointerEvents: "none"
    },
    header: {
      pointerEvents: "all",
      height: "50px",
      width: "100%"
    },
    centerText: {
      margin: "20px",
      paddingTop: "20px",
      maxWidth: "680px"
    },
    cases: {
      margin: "20px",
      paddingTop: "20px",
      maxWidth: "840px"
    },
    caseCard: {
      minWidth: "380px",
      maxWidth: "420px",
      margin: "20px"
    }
  });

export default withStyles(styles)(Landing);
