import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const style = theme => ({
    msgStyle: {
        backgroundColor: 'white',
        borderRadius: '20px',
        border: '1px solid lightgrey',
        padding: theme.spacing.unit * 2,
        margin: '15px 0px 0px 15px',
        maxWidth: '80%'
    }
})

const Recieved = (props) => {
    const { classes } = props;
    const { msg } = props.data
    return (
        <>
            <div>
                <div style={{ display: 'inline-block' }} className={classes.msgStyle} >
                    {msg}
                </div>
            </div>
        </>
    )
}

Recieved.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(Recieved)