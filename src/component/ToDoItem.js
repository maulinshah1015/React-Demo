import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bindFunc from '../util.js'
class ToDoItem extends Component {

    constructor(props) {
        super(props);
        // this.renderForm = this.renderForm.bind(this);
        // this.renderItem = this.renderItem.bind(this);
        // this.toggleState = this.toggleState.bind(this);
        // this.updateItem = this.updateItem.bind(this);
        bindFunc.call(this,['renderForm','renderItem','toggleState','updateItem'])
        this.state = {
            isEditing: false,
        }
    }

    toggleState(props) {
        this.fullName = props.details.firstname + " " + props.details.lastname;
        const { isEditing } = this.state;
        return (
            this.setState({
                isEditing: !isEditing,
            })
        )
    }

    updateItem(evt){
        evt.preventDefault();
        console.log(this.fullName);
        this.props.updateByName(this.props.index,this.input.value);
        this.toggleState(this.props);
    }

    renderForm() {
        return (
            <form onSubmit={this.updateItem}>
                <input type="text" ref = {(value) => {
                    this.input = value;
                }} defaultValue={this.fullName} />
                <button type="Submit">Update Item</button>
            </form>
        )
    }

    renderItem() {
        return (
            <li className={this.props.details.completed ? 'completed' : ''}
                onClick={() => {
                    this.props.clickHandler(this.props.index)
                }}>
                {this.props.details.firstname}
                {this.props.details.lastname}
                <button onClick={(evt) => {
                    evt.stopPropagation();
                    this.props.deleteName(this.props.index)
                }}>Delete Name</button>
                <button onClick={(evt) => {
                    this.toggleState(this.props)
                }}>Edit Name</button>
            </li>
        )
    }

    render() {
        const { isEditing } = this.state;
        return (
            <section>
                {
                    isEditing ? this.renderForm() : this.renderItem()
                }
            </section>
        )
    }

}

ToDoItem.propTypes = {
    deleteName : PropTypes.func.isRequired,
    updateByName : PropTypes.func.isRequired,
    clickHandler : PropTypes.func.isRequired,
    index : PropTypes.number.isRequired,
    details : PropTypes.object.isRequired
}

export default ToDoItem