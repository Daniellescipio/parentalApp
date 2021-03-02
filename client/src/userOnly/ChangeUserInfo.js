import React, {useContext, useState, useEffect} from "react"
import {useHistory} from "react-router-dom"
import { LoginContext } from "../logic/LoginContext"
//import YourConvos from "./YourConvos"
//import Misc from "./Misc"
function ChangeUserInfo(){
    const history = useHistory()
    const {user, editUser} = useContext(LoginContext)
    //gets userId from login and passes it to get post and questions
    const [passwordMatch, setPasswordmatch] = useState(false)
    const [test, setTest] = useState({username:'', password:''})
    const [newInfo, setNewInfo] = useState({username:'', password:''})
    //loads data from context
    useEffect(()=>{

    })
    function checkCredentials(e){
        e.preventDefault()
        if(test.username === user.username && test.password === user.password){
            setPasswordmatch(true)
        }else{
            alert `those credentials are not correct`
        }
    }
    function handleChange(e){
        const {name, value} = e.target
        if(passwordMatch){
            setNewInfo(prev=>({...prev, [name]:value}))
        }else{
           setTest(prev=>({...prev, [name]:value})) 
        }    
    }
    function updateUser(e){
        e.preventDefault()
        editUser(newInfo)
        history.push("/homepage")

    }
    return(
        <div className = 'credentials'>{
            passwordMatch ?
            <div>
                <p>Set your new username and/or password</p>
                <form>
                    <input
                    name = 'username'
                    type = 'text'
                    onChange = {handleChange}
                    value = {newInfo.username}/>
                    <input
                    name = 'password'
                    type = 'text'
                    onChange = {handleChange}
                    value = {newInfo.password}/>
                    <button onClick = {updateUser}>submit</button>
                    {/* <button><Link to = "/homepage">Done</Link></button> */}
                </form>
            </div>
            :
            <div>
                <p>Enter your current Username and password</p>
                <form>
                    <input
                    name = 'username'
                    type = 'text'
                    onChange = {handleChange}
                    value = {test.username}/>
                    <input
                    name = 'password'
                    type = 'text'
                    onChange = {handleChange}
                    value = {test.password}/>
                    <button onClick = {checkCredentials}>submit</button>
                </form>
            </div>
            }  
        </div>
    )
}
export default ChangeUserInfo 