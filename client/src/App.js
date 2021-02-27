import React, {useContext} from "react"
import Login from "./Login.js"
import PostPage from "./public/PostPage"
import AdviceBoard from "./public/AdviceBoard"
import HomePage from "./userOnly/Homepage"
import {Switch, Route, Redirect} from "react-router-dom"
import {UserContext} from "./logic/UserProvider"
import Header from "./public/Header"
import QuestionPage from "./public/QuestionPage"
import {UserDataProvider} from "./logic/useUserData"
    function App(){
        const {token} = useContext(UserContext)
        return(
            <div>
                <Header/>
                <Switch>
                    <Route exact path = "/">{token? <Redirect to = "/homepage"/>:<Login/>}</Route>
                    <UserDataProvider>
                        <Route path = "/homepage">{!token? <Redirect to = "/"/>:<HomePage/>}</Route>
                        <Route path = "/adviceBoard"><AdviceBoard/></Route>
                        <Route path = "/postpage/:postId"><PostPage/></Route>
                        <Route path = "/questionpage/:questionId"><QuestionPage/></Route>
                    </UserDataProvider>
                    
                </Switch>      
            </div>
        )
    }
export default App 