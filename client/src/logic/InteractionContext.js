import axios from "axios"
import React, {useState} from "react"
const InteractionContext = React.createContext()
const userAxios = axios.create()
//configures axios to use authentication headers
userAxios.interceptors.request.use(config=>{
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})
function InteractionProvider(props){
    const [responses, setResponses] = useState([])

    function getResponses(id, postOrQuestion){
        userAxios.get(`/parental/responses/${id}/${postOrQuestion}`)
        .then(response=>(setResponses(response.data)))
        .catch(err=>console.log(err.response.data.errMessage))
    }
    function addResponses(id, newResponse,answerOrComment){
        userAxios.put(`/parental/users/${id}/add${answerOrComment}`, newResponse)
        .then(response=>(setResponses(prev=>[...prev, response.data])))
        .catch(err=>console.log(err.response.data.errMessage))
    }

     function deleteResponses(id, responseId,answerOrComment){
        userAxios.put(`/parental/users/${id}/${responseId}/remove${answerOrComment}`)
        userAxios.delete(`/parental/responses/${responseId}`)
     }
     function voteOnResponse(responseId, newVote){
         const updatedResponses = responses.map(response=>{
                if(responseId===response._id){
                    response.vote = newVote
                    return response
                }else{
                    return response
                }
            })
            console.log(updatedResponses)
         userAxios.put(`/parental/responses/${responseId}/vote`, newVote)
         .then(response=>{setResponses(updatedResponses)})
         .catch(err=>console.log(err.response.data.errMessage))
     }
     function voteOnAPost(postId, newVote){
     userAxios.put(`/parental/posts/${postId}/vote`, newVote)}
     
    return(
        <InteractionContext.Provider value={{voteOnResponse, getResponses, addResponses, deleteResponses, responses, voteOnAPost}}>
            {props.children}
        </InteractionContext.Provider>
    )
}

export {InteractionProvider, InteractionContext}