import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const style = theme => ({
    msgStyle: {
        display: 'inline-block',
        backgroundColor: '#1a7bf7',
        color: 'white',
        borderRadius: '20px',
        padding: theme.spacing.unit * 2,
        margin: '15px 15px 0px 0px',
        maxWidth: '80%'
        // float: 'right'
    }
})

const Reply = (props) => {
    const { classes } = props;
    const { message } = props;
    return (
        <>
            <div style={{ textAlign: 'right' }} >
                <div className={classes.msgStyle} >
                    {message}
                </div>
            </div>
        </>
    )
}

Reply.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(Reply)