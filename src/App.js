import React, { Component } from 'react';
import ToDoItem from './component/ToDoItem';
import ToDoForm from './component/ToDoForm';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Route,Link } from 'react-router-dom';
import HomePage from './component/HomePage';
import ToDoList from './component/ToDoList';
import bindFunc from './util.js'
class App extends Component {

  constructor() {
    console.log("Constructor");
    super();
    // this.changeStatus = this.changeStatus.bind(this);
    // this.updateName = this.updateName.bind(this);
    // this.addName = this.addName.bind(this);
    // this.deleteName = this.deleteName.bind(this);
    // this.updateByName = this.updateByName.bind(this);
    bindFunc.call(this,['changeStatus','updateName','addName','deleteName','updateByName']);
    this.state = {
      names: [
        {
          id: 1,
          firstname: "Maulin",
          lastname: "Shah",
          completed: false
        },
        {
          id: 2,
          firstname: "Gunjan",
          lastname: "Shah1",
          completed: false
        }
      ],
      currentName: ""
    }
  }

  componentWillMount() {
    console.log("Before render")
  }

  componentDidMount() {
    console.log("after render")
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.names !== nextState.name;
  }

  changeStatus(index) {
    var tasks = this.state.names;
    var task = tasks[index];
    task.completed = !task.completed;
    this.setState({ tasks: tasks });
  }

  updateName(newValue) {
    this.setState({ currentName: newValue.target.value })
  }

  updateByName(index, fullName) {
    var names = this.state.names;
    var name = names[index];
    name["firstname"] = fullName.split(' ')[0];
    name["lastname"] = fullName.split(' ')[1];
    name["completed"] = false;
    this.setState({ names });
  }

  deleteName(index) {
    let names = this.state.names;
    names.splice(index, 1);
    this.setState({ names });
  }

  addName(evt) {
    var names = this.state.names;
    names.push({
      id: names.length + 1,
      firstname: this.state.currentName.split(' ')[0],
      lastname: this.state.currentName.split(' ')[1],
      completed: false
    })
    this.setState({ names, currentName: "" });
    evt.preventDefault();
  }

  render() {
    return (
      <section>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
                <Link to="/ToDoList">ToDoList</Link>
              </li>
            </ul>
            <Route exact path="/" component={HomePage} />
            <Route path="/ToDoList" component={ToDoList} />
          </div>
        </Router>
        <ToDoForm
          currentName={this.state.currentName}
          updateName={this.updateName}
          addName={this.addName}
        />
        <ul>
          {
            this.state.names.map((name, index) => {
              return <ToDoItem
                key={name.id}
                deleteName={this.deleteName}
                updateByName={this.updateByName}
                clickHandler={this.changeStatus}
                index={index}
                details={name} />
            })
          }
        </ul>
      </section>
    );
  }
}

export default App;
