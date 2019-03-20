import React, {Component} from 'react';
import axios from 'axios';

class List extends Component {
	constructor(props) {
        super(props);

        this.state = {
            users: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/productsList')
            .then( (response) => {
                this.setState({users: response.data});
            })
    }

    render() {
        return (
            <div>
                <ul className="list"> 
                    <h3>Users List</h3>
                    <strong className="listElement col-3">Name</strong>
                    <strong className="listElement col-3">Surname</strong>
                    <strong className="listElement col-3">Mail</strong>
                    <strong className="listElement col-2">Date</strong>
                    {	
                        this.state.users.map(
                            (user, index) => <li key={index}>
                            			<div className="listElement col-3">{ user.name }</div>
                            			<div className="listElement col-3">{ user.surname }</div>
                            			<div className="listElement col-3">{ user.mail }</div>
                            			<div className="listElement col-2">{ new Date(user.date).toISOString().slice(0,10) }</div>
                            		</li>
                        )
                    }
                </ul>
            </div>
        );
    }
};

export default List;