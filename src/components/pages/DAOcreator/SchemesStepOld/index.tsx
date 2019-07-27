import {
  Button,
  Card,
  CardContent,
  createStyles,
  ExpansionPanel,
  ExpansionPanelActions,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import * as R from "ramda";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import {
  getSchemeDefinition,
  SchemeConfig
} from "../../../../lib/dependency/arc";
import DAOcreatorActions, * as daoCreatorActions from "../../../../lib/redux/actions/daoCreator";
import AddSchemeDialog from "./AddSchemeDialog";

// eslint-disable-next-line
interface Props extends WithStyles<typeof styles> {
  schemes: SchemeConfig[];
  actions: DAOcreatorActions;
}

interface State {
  expanded: string | null;
  addSchemeDialogOpen: boolean;
}

class SchemesStep extends React.Component<Props, State> {
  public readonly state: State = {
    expanded: null,
    addSchemeDialogOpen: false
  };

  handleChange = (panelKey: any) => (event: any, expanded: boolean) => {
    this.setState({
      expanded: expanded ? panelKey : false
    });
  };

  addScheme = (schemeConfig: SchemeConfig) => {
    this.props.actions.addScheme(schemeConfig);
  };

  setSchemeDialog = (newStatus: boolean) => () =>
    this.setState({
      addSchemeDialogOpen: newStatus
    });

  render() {
    const { schemes, actions, classes } = this.props;
    const { expanded, addSchemeDialogOpen } = this.state;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Add Schemes
          </Typography>
        </CardContent>
        <div className={classes.root}>
          {R.map(schemeConfig => {
            const scheme = getSchemeDefinition(schemeConfig.typeName);
            return (
              <ExpansionPanel
                expanded={expanded === schemeConfig.id}
                onChange={this.handleChange(schemeConfig.id)}
                key={"scheme-" + schemeConfig.id}
              >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <div className={classes.column}>
                    <Typography className={classes.heading}>
                      {scheme.displayName}
                    </Typography>
                  </div>
                  <div className={classes.column}>
                    {schemeConfig.votingMachineConfig != null ? (
                      <Typography className={classes.secondaryHeading}>
                        {schemeConfig.votingMachineConfig.typeName}
                      </Typography>
                    ) : null}
                  </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div className={classes.column}>
                    <Typography>
                      TODO: scheme info (configurations etc.)
                    </Typography>
                  </div>
                  <div className={classes.column}>
                    <Typography>
                      TODO: voting machine info (configurations etc.)
                    </Typography>
                  </div>
                </ExpansionPanelDetails>
                <ExpansionPanelActions>
                  <Button
                    onClick={() => actions.removeScheme(schemeConfig.id)}
                    className={classes.button}
                  >
                    Delete
                  </Button>
                </ExpansionPanelActions>
              </ExpansionPanel>
            );
          }, schemes)}
        </div>
        {schemes.length === 0 ? (
          <CardContent>
            <Typography>
              No schemes added yet. Click the "Add Scheme" button to start
              adding Schemes.
            </Typography>
          </CardContent>
        ) : null}
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.setSchemeDialog(true)}
        >
          Add Scheme
        </Button>
        <AddSchemeDialog
          open={addSchemeDialogOpen}
          addScheme={this.addScheme}
          addedSchemes={schemes}
          close={this.setSchemeDialog(false)}
        />
      </Card>
    );
  }
}

// STYLE
const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    card: {},
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexShrink: 0
    },
    column: {
      flexBasis: "50%"
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary
    },
    button: {
      margin: theme.spacing.unit,
      float: "right"
    }
  });

const componentWithStyles = withStyles(styles)(SchemesStep);

// STATE
const mapStateToProps = (state: any) => {
  return {
    schemes: state.daoCreator.schemes
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    actions: bindActionCreators(daoCreatorActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(componentWithStyles);
