import {
  Card,
  CardContent,
  createStyles,
  Grid,
  TextField,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core"
import * as R from "ramda"
import * as React from "react"
import { connect } from "react-redux"
import { bindActionCreators, Dispatch } from "redux"
import { RootState } from "../../../state"
import * as FormValidation from "../../../lib/forms/validation"
import { FormErrors } from "../../../lib/forms/FormErrors"
import DAOcreatorActions, * as daoCreatorActions from "../../../redux/actions/daoCreator"

// eslint-disable-next-line
interface Props extends WithStyles<typeof styles> {
  daoName: string
  tokenName: string
  tokenSymbol: string
  stepValid: boolean
  actions: DAOcreatorActions
}

type State = {
  config: DAOConfig
  formErrors: FormErrors<DAOConfig>
}

const initState: State = {
  daoName: "",
  tokenName: "",
  tokenSymbol: "",
  formErrors: ,
}

const requiredFields = ["daoName", "tokenName", "tokenSymbol"]

class NamingStep extends React.Component<Props, State> {
  state: Readonly<State> = initState

  constructor(props: Props) {
    super(props)
    this.props.actions.setStepIsValid(this.props.stepValid)
  }

  handleChange = async (event: any) => {
    const { name, value } = event.target
    let errorMessage = FormValidation.isRequired(value)

    await this.setState({
      formErrors: R.assoc(name, errorMessage, this.state.formErrors),
      [name]: value,
    } as any)

    const limitTokenSymbols = (tknSym: string) => tknSym.length > 4

    switch (name) {
      case "tokenSymbol": {
        errorMessage = FormValidation.checkIfHasError(
          limitTokenSymbols,
          "Error: Symbol should be max 4 characters for displays on exchanges"
        )(value)
        break
      }
      case "tokenName": {
        errorMessage = FormValidation.isValidName(value)
        break
      }
      case "daoName": {
        errorMessage = FormValidation.isValidName(value)
        break
      }
      default: {
      }
    }
    await this.setState({
      formErrors: R.assoc(name, errorMessage, this.state.formErrors),
      [name]: value,
    } as any)

    const formHasAllValues = R.none(
      field => R.isEmpty(R.prop(field, this.state as any)),
      requiredFields
    )

    const stepIsValid =
      formHasAllValues &&
      R.none(
        key => !R.isEmpty(this.state.formErrors[key]),
        R.keys(this.state.formErrors)
      )

    if (stepIsValid !== this.props.stepValid) {
      await this.props.actions.setStepIsValid(stepIsValid)
    }
  }

  render() {
    const { classes } = this.props
    const actions = this.props.actions

    const { daoName, tokenName, tokenSymbol, formErrors } = this.state

    return (
      <Card className={classes.card}>
        <form>
          <CardContent>
            <Typography variant="h4" className={classes.headline} gutterBottom>
              Name the DAO
            </Typography>
            <Grid container spacing={16}>
              <Grid item xs={12} md={5}>
                <Typography className={classes.guideText} variant="body2">
                  Welcome!
                  <br />
                  You're about to start the process of creating a DAO
                  (Decentralized Autonomous Organization).
                  <br />
                  <br />
                  Let's start by giving a name to the DAO and its token.
                  <br />
                </Typography>
              </Grid>
              <Grid item xs={12} md={7}>
                <Grid item xs={12}>
                  <TextField
                    className={classes.daoName}
                    name="daoName"
                    label="DAO Name"
                    value={daoName}
                    onChange={this.handleChange}
                    margin="normal"
                    onBlur={() => actions.setName(daoName)}
                    fullWidth
                    required
                    error={!R.isEmpty(formErrors.daoName)}
                    helperText={formErrors.daoName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.tokenName}
                    name="tokenName"
                    label="Token Name"
                    value={tokenName}
                    onChange={this.handleChange}
                    onBlur={() => actions.setTokenName(tokenName)}
                    margin="normal"
                    fullWidth
                    error={!R.isEmpty(formErrors.tokenName)}
                    helperText={formErrors.tokenName}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.tokenSymbol}
                    name="tokenSymbol"
                    label="Token Symbol"
                    value={tokenSymbol}
                    onChange={this.handleChange}
                    onBlur={() => actions.setTokenSymbol(tokenSymbol)}
                    margin="normal"
                    fullWidth
                    error={!R.isEmpty(formErrors.tokenSymbol)}
                    helperText={formErrors.tokenSymbol}
                    required
                  />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </form>
      </Card>
    )
  }
}

// STYLE
const styles = (theme: Theme) =>
  createStyles({
    card: {},
    headline: {},
    daoName: {},
    tokenName: {},
    tokenSymbol: {},
    guideText: {
      fontSize: 18,
      maxWidth: 450,
      paddingLeft: 30,
      paddingRight: 30,
      paddingTop: 50,
      paddingBottom: 50,
      margin: "auto",
    },
  })

const componentWithStyles = withStyles(styles)(NamingStep)

// STATE
const mapStateToProps = (state: RootState) => {
  return {
    daoName: state.daoCreator.config.daoName,
    tokenName: state.daoCreator.config.tokenName,
    tokenSymbol: state.daoCreator.config.tokenSymbol,
    stepValid: state.daoCreator.stepValidation[state.daoCreator.step],
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    actions: bindActionCreators(daoCreatorActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(componentWithStyles)
