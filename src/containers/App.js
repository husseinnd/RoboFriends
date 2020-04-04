import React, {Component} from 'react';
import CardList from '../components/CardList';
import { robots } from '../robots';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';



class App extends Component {
    constructor(){
        super()
        this.state = {
            robots: robots,
            searchField: ""
        }
    }

    componentDidMount(){
        fetch('http://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots: users}));
    }
0
    onSearchchange= (event) => {
        this.setState({searchField: event.target.value});
    }

    render() {
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLocaleLowerCase().includes(this.state.searchField.toLocaleLowerCase())
        })
        return(
            <div className="tc">
                <h1 className="f1"> Robo Friends </h1>
                <SearchBox searchChange={(this.onSearchchange)}/>
                <Scroll>
                   <ErrorBoundry>
                        <CardList robots = {filteredRobots}/>
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
    }
   
}

export default App;