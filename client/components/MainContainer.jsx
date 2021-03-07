import React, { Component } from 'react';
import RepoGrabber from './RepoGrabber.jsx';
import DataDisplay from './DataDisplay'

class MainContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: true,
      name: '',
      repos: [{name: "myFirst Repo", followers: [1,2,3,4,5]},
      {name: "my Onlyfans Repo", followers: [1,2,3,4,5]},
      {name: "I got another repo", followers: [1,2,3,4,5]}],
      personalFollowers: ['Amy', 'Beth', 'Carl', 'Drago'],
      checked: new Map(),
      toBeSent: new Map(),
    };
    this.getFollowers = this.getFollowers.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  getFollowers(){
    let toBeSent = new Map();
    for(const [key, value] of this.state.checked){
      console.log("key in loop", key, value)
    if (value===true){
      toBeSent.set(key, value);
    }}
    console.log("toBeSent in func?", toBeSent)
    this.setState({...this.state, toBeSent: toBeSent})
    setTimeout(() => {console.log("toBeSent in state?", this.state)}, 1000)
    // fetch request to db for user's repo follower data should go here
  }

    handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({...this.state, checked: prevState.checked.set(item, isChecked) }));
  }

  componentDidMount () {
    //db fetch request
    fetch("/getUser")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({...this.state, name : data.name})
      })
      .catch(err => console.log(err));
    //that url runs a get request on the db 
  }

  render(){
    return(
      <div className="MainContainer">
        <h3>Hi, {this.state.name}. Would you like to see your bomb ass repos?</h3>
        <RepoGrabber 
        repos={this.state.repos}
        personalFollowers={this.state.personalFollowers}
        getFollowers={this.getFollowers}
        handleChange={this.handleChange}
        checkedItems={this.state.checked}
        />
        <DataDisplay 
        toBeSent={this.state.toBeSent}
        />
      </div>
    );
  }
}
export default MainContainer;