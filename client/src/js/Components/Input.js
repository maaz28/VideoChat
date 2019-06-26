import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },

});


class TextFields extends React.Component {
    onMySubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit()
    }


    render() {
        const { classes } = this.props;

        return (

            <form onSubmit={(e) => this.onMySubmit(e)} className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="standard-full-width"
                    label={this.props.label}
                    style={{ margin: '0px 8px', height: '36px' }}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    fullWidth
                    margin="normal"
                    onChange={(e) => this.props.onChange(e)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </form>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
