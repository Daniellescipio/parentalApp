import React, {useContext, useEffect} from "react"
import NewPostORQuestion from "./PostOrQuestion"
import {UserContext} from "../logic/UserProvider"
import {UserDataContext} from "../logic/useUserData"
import ListComponent from "../logic/ListComponent"
//import YourConvos from "./YourConvos"
//import Misc from "./Misc"


    function HomePage(){
        //gets userId from login and passes it to get post and questions
        const {user, logout} = useContext(UserContext)
        //gets user specific post and questions
        const {getUserPosts, getUserQuestions, posts, questions} = useContext(UserDataContext)
        useEffect(()=>{
            getUserPosts(user._id)
            getUserQuestions(user._id)
            //eslint-disable-next-line
        },[])
        return(
            <div>
                <h1>Welcome {user.username}</h1>
                <NewPostORQuestion/>
                <ListComponent posts = {posts} questions = {questions} responses = {[]} user = {true}/>
                {/* <YourConvos userResponses ={user.responses}/> */}
                <p onClick = {logout}>logout</p>
            </div>
        )
    }
export default HomePage 