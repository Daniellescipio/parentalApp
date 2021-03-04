import React, {useContext, useEffect} from "react"
import { Link} from "react-router-dom"
import NewPostORQuestion from "./PostOrQuestion"
import {LoginContext} from "../logic/LoginContext"
import {UserDataContext} from "../logic/UserDataContext"
import ListComponent from "../recurringComponents/ListComponent"
//import Extras from "../recurringComponents/Extras"

//import YourConvos from "./YourConvos"
//import Misc from "./Misc"
function HomePage(){
    //gets userId from login and passes it to get post and questions
    const {user, logout} = useContext(LoginContext)
    //gets user specific post and questions
    const {getUserPosts, getUserQuestions, posts, questions} = useContext(UserDataContext)
    //loads data from context
    function getEverything(){
        getUserPosts(user._id)
        getUserQuestions(user._id)
    }
    useEffect(()=>{
        getEverything()
        //eslint-disable-next-line
    },[])
    const score = posts.reduce((final, post)=>{
        final = final + post.vote.vote
        return final
    }, 0)
    return(
        <div className = 'homepage'>
            <h1 className = 'welcome'>Welcome {user.username}</h1>
            <h2>User Score: {score} </h2>
            <NewPostORQuestion/>
            <ListComponent posts = {posts} questions = {questions} responses = {[]} user = {true}/>
            {/* <YourConvos userResponses ={user.responses}/> */}
            <button><Link to= {{pathname: `/changecredentials/`}}>Change username/password</Link></button>
            {/* <Extras posts = {posts} questions = {questions} function = {getEverything}/> */}
            <button onClick = {logout}>logout</button>  
        </div>
    )
}
export default HomePage 