import React from 'react';
import PropTypes from 'prop-types';
//Create a Stateless function

const ToDoForm = (props) => {
    return(
        <form onSubmit={props.addName}>
            <input type="text" value={props.currentName} onChange={props.updateName}/>
            <button type="submit">Submit</button>
        </form>
    )
}

ToDoForm.propTypes = {
    currentName : PropTypes.string.isRequired,
    updateName : PropTypes.func.isRequired
}

export default ToDoForm;