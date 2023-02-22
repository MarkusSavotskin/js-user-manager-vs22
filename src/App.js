import React, {useState, Fragment} from "react";
import './App.css';
import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";

function App() {

    const [users, setUsers] = useState([])

    const onAddUserHandler = (username, age) => {
        setUsers((prevUsers) => {
            return [
                ...prevUsers,
                {
                    id: Math.random().toString(),
                    name: username,
                    age: age
                }
            ]
        })
    }

    return (
        <Fragment>
            <AddUser onAddUser={onAddUserHandler}/>
            <UsersList users={users}/>
        </Fragment>
    );
}

export default App;
