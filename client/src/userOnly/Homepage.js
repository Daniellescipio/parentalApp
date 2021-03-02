import React, {useContext, useEffect} from "react"
import { Link} from "react-router-dom"
import NewPostORQuestion from "./PostOrQuestion"
import {LoginContext} from "../logic/LoginContext"
import {UserDataContext} from "../logic/UserDataContext"
import ListComponent from "../recurringComponents/ListComponent"

//import YourConvos from "./YourConvos"
//import Misc from "./Misc"
function HomePage(){
    //gets userId from login and passes it to get post and questions
    const {user, logout} = useContext(LoginContext)
    //gets user specific post and questions
    const {getUserPosts, getUserQuestions, posts, questions} = useContext(UserDataContext)
    //loads data from context
    useEffect(()=>{
        getUserPosts(user._id)
        getUserQuestions(user._id)
        //eslint-disable-next-line
    },[])
    return(
        <div className = 'homepage'>
            <h1 className = 'welcome'>Welcome {user.username}</h1>
            <NewPostORQuestion/>
            <ListComponent posts = {posts} questions = {questions} responses = {[]} user = {true}/>
            {/* <YourConvos userResponses ={user.responses}/> */}
            <button><Link to= {{pathname: `/changecredentials/`}}>Change username/password</Link></button>
            <button onClick = {logout}>logout</button>  
        </div>
    )
}
export default HomePage 