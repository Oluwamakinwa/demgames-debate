import React, { Component } from 'react';
import { Gamebox } from '../Gamebox';
import DataTable from 'react-data-table-component';
import { Details } from '../Details';
import ListQuestion from '../List/ListQuestions';
import './styles.scss';

const columns = [
    {
        name: 'Id',
        selector: 'id',
        sortable: true,
    },
    {
        name: 'Caption',
        selector: 'caption',
        sortable: true,
    },
    {
        name: 'Description',
        selector: 'gamedescription',
        sortable: true,
    },
    {
        name: 'Type',
        selector: 'gametype',
        sortable: true,
    }
];

class ListGames extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [{
            }],
            activeGame:null,
            activeTab:1,
        };
        this.simpleTable = this.simpleTable.bind(this);
    }

    pool() {
        const url = 'http://localhost:9000/listgames';
        fetch(url, {
            method: 'get',
            headers: {
                "authorization": "Bearer " + localStorage.getItem("access_token"),
                "Content-Type": "Application/json",
                "Accept": "application/json"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('api data -->', JSON.stringify(data))
                this.setState({games: data,activeGame:data[0].id,
                    activeGameDetails:[
                        {key:"Name",value:data[0].caption},
                        {key:"Description",value:data[0].gamedescription},
                        {key:"Game Type",value:data[0].gametype}
                    ]});
            })
            .catch(err => console.log(err));
        console.log(this.state.games,this.state.activeGame,"fre");
    }
    componentDidMount() {
        this.pool();
    }

    handleGameBoxClick=(id)=>{
        this.setState({
            activeGameDetails:[
                {key:"Name",value:this.state.games[id].caption},
                {key:"Description",value:this.state.games[id].gamedescription},
                {key:"Game Type",value:this.state.games[id].gametype}
            ],
            activeGame:this.state.games[id].id
        });
    }
    

    simpleTable() {

        return (
            <>
            <Gamebox games={this.state.games} activeGame={this.state.activeGame} handleGameBoxClick={this.handleGameBoxClick} addGame={this.props.toggleGame}/>
            {/* <DataTable
                title="List of Games"
                columns={columns}
                data={this.state.games}
                pagination
            /> */}
            <div className="tab-container">
                <div className={`tab ${this.state.activeTab===1?"active":""}`} onClick={()=>this.setState({activeTab:1})}>
                    Game Details
                </div>
                <div className={`tab ${this.state.activeTab===2?"active":""}`} onClick={()=>this.setState({activeTab:2})}>
                    Questions
                </div>
            </div>
            
            {this.state.activeTab===1?<Details data={this.state.activeGameDetails}/>:<ListQuestion />}
            </>
            
        );
    }
    render() {
        console.log(this.state.activeGame,this.state.activeGameDetails,"DSfsd");
        return (
            <div className="App">
                <div>

                    {this.simpleTable()}

                </div>
            </div>
        );
    }
}

export default ListGames;