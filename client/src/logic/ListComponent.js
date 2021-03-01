import React from "react"
import {Link} from "react-router-dom/cjs/react-router-dom.min"

function ListComponent(props){
    //gets arrays from props
    const postArray = props.posts
    const questionsArray = props.questions  
    const responsesArray = props.responses
    //creates a list of post/questions/responses to display
    const postList = postArray.map(post=>{
      return  (
            <div key = {post._id}>
                <Link to = {{pathname: `/postpage/${post._id}`, state:post, user:props.user}}>
                    <h3>{post.title}</h3>
                </Link>
                <p>{post.topic.topic}</p>
                <p>Current Vote: {post.vote.vote}</p>
            </div>
        )          
})
    const questionList = questionsArray.map(question=>{
       return (
            <div key = {question._id}>
                <Link to = {{pathname: `/questionpage/${question._id}`, state:question}}>
                    <h3>{question.question}</h3>
                </Link>
                <p>{question.topic.topic}</p>
                <p>Answers:{question.answers.length}</p>
            </div>
        )
    })
    const responseList = responsesArray.map(response=>{
       return (
            <div key = {response._id}>
                <Link to = {`/postpage/${response.owner}`}>
                    <p>Go to the post to view the entire conversation</p>
                </Link>
                <p>{response.comment}</p>
            </div>
        )
    })
    //public or user view
    if(props.user){
        return(
            <div>
                {postList}
                {questionList}
                {responseList}
            </div>
        )
    }else{
        return(
            <div>
                {postList}
                {questionList}
            </div>
        )

    }
   
}

export default ListComponent