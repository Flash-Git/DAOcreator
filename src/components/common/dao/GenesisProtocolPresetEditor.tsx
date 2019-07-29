import * as React from "react";
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Select,
  FilledInput,
  FormControl,
  InputLabel,
  Grid,
  Fab,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Settings";
import GenesisProtocolEditor from "./GenesisProtocolEditor";
import { GenesisProtocolForm } from "../../../lib/forms";
import { GenesisProtocol } from "../../../lib/dependency/arc";
import GenesisProtocolAnalytics from "./GenesisProtocolAnalytics";

interface Props extends WithStyles<typeof styles> {
  form: GenesisProtocolForm;
  editable: boolean;
}

enum ProtocolPreset {
  easy = "Easy",
  normal = "Normal",
  critical = "Critical",
  custom = "Custom"
}

interface State {
  protocol: ProtocolPreset;
  editing: boolean;
}

class GenesisProtocolPresetEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.props.form.fromState(GenesisProtocol.NormalConfig);
    this.state = {
      protocol: ProtocolPreset.normal,
      editing: false
    };
  }

  render() {
    const { classes, form, editable } = this.props;
    const { protocol, editing } = this.state;

    const onChange = (event: React.ChangeEvent<{ value: any }>) => {
      const preset = event.target.value as ProtocolPreset;

      // update the backing form to a preset if needed
      switch (preset) {
        case ProtocolPreset.easy:
          form.fromState(GenesisProtocol.EasyConfig);
          break;
        case ProtocolPreset.normal:
          form.fromState(GenesisProtocol.NormalConfig);
          break;
        case ProtocolPreset.critical:
          form.fromState(GenesisProtocol.CriticalConfig);
          break;
      }

      this.setState({
        ...this.state,
        protocol: preset
      });
    };

    const onEdit = () => {
      this.setState({
        ...this.state,
        editing: true,
        protocol: ProtocolPreset.custom
      });
    };

    const onClose = () => {
      this.setState({
        ...this.state,
        editing: false
      });
    };

    // TODO: base class for all forms (move analytics into step, pass for into here)
    return (
      <>
        <FormControl variant="filled" fullWidth>
          <InputLabel htmlFor="protocol">Genesis Protocol</InputLabel>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={10}>
              <Select
                native
                fullWidth
                disabled={!editable}
                value={protocol}
                onChange={onChange}
                input={<FilledInput name="protocol" id="protocol" />}
              >
                <option value={ProtocolPreset.easy}>
                  {ProtocolPreset.easy}
                </option>
                <option value={ProtocolPreset.normal}>
                  {ProtocolPreset.normal}
                </option>
                <option value={ProtocolPreset.critical}>
                  {ProtocolPreset.critical}
                </option>
                <option value={ProtocolPreset.custom}>
                  {ProtocolPreset.custom}
                </option>
              </Select>
            </Grid>
            <Grid item>
              <Fab
                disabled={!editable}
                size="small"
                color="secondary"
                onClick={onEdit}
              >
                <EditIcon />
              </Fab>
            </Grid>
            <Dialog
              open={editing}
              onClose={onClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Genesis Protocol</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  TODO: Something about something Something about something
                  Something about something Something about something Something
                  about something Something about something Something about
                  somethingSomething about somethingSomething about something
                </DialogContentText>
                <div>
                  <span>&nbsp;&nbsp;</span>
                </div>
                <GenesisProtocolEditor form={form} editable={true} />
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose}>Save</Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </FormControl>
      </>
    );
  }
}

const styles = (theme: Theme) => createStyles({});

export default withStyles(styles)(GenesisProtocolPresetEditor);
