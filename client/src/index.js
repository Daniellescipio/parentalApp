import React from "react"
import ReactDom from "react-dom"
import App from "./App"
import {LoginProvider} from "./logic/LoginContext"
import {TopicSpecificProvider} from "./logic/TopicContext"
//import {LoginProvider} from "./logic/userContext.js"
import {BrowserRouter as Router} from "react-router-dom"
import "./style.css"
ReactDom.render(
<Router>
    <TopicSpecificProvider>
        <LoginProvider>
            <App/>
        </LoginProvider>
    </TopicSpecificProvider>      
</Router>,
document.getElementById("root"))