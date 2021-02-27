import React from "react"
import ReactDom from "react-dom"
import App from "./App"
import {UserProvider} from "./logic/UserProvider"
import {TopicSpecificProvider} from "./logic/useTopicSpecificData"
//import {UserProvider} from "./logic/userContext.js"
import {BrowserRouter as Router} from "react-router-dom"
import "./style.css"
ReactDom.render(
<Router>
    <TopicSpecificProvider>
        <UserProvider>
            <App/>
        </UserProvider>
    </TopicSpecificProvider>      
</Router>,
document.getElementById("root"))