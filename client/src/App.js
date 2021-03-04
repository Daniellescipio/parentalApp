import React, {useContext} from "react"
import Login from "./Login.js"
import PostPage from "./public/PostPage"
import AdviceBoard from "./public/AdviceBoard"
import HomePage from "./userOnly/Homepage"
import {Switch, Route, Redirect} from "react-router-dom"
import {LoginContext} from "./logic/LoginContext"
import Header from "./public/Header"
import QuestionPage from "./public/QuestionPage"
import {UserDataProvider} from "./logic/UserDataContext"
import {InteractionProvider} from "./logic/InteractionContext"
import ChangeUserInfo from "./userOnly/ChangeUserInfo"
    function App(){
        const {token} = useContext(LoginContext)
        return(
            <div>
                <Header/>
                <Switch>
                    <InteractionProvider>
                        <UserDataProvider>
                            <Route exact path = "/">{token? <Redirect to = "/homepage"/>:<Login/>}</Route>
                            <Route path = "/homepage">{!token? <Redirect to = "/"/>:<HomePage/>}</Route>
                            <Route path = "/adviceBoard"><AdviceBoard/></Route>
                            <Route path = "/postpage/:postId"><PostPage/></Route>
                            <Route path = "/questionpage/:questionId"><QuestionPage/></Route>
                            <Route path = "/changecredentials"><ChangeUserInfo/></Route>         
                        </UserDataProvider>
                    </InteractionProvider>
                </Switch>      
            </div>
        )
    }
export default App 