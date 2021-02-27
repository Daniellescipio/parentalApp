import axios from "axios"
import React, {useState} from "react"
const TopicSpecificContext = React.createContext()
const userAxios = axios.create()

userAxios.interceptors.request.use(config=>{
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function TopicSpecificProvider(props){
    const [loading, setLoading]= useState(true)
    const [posts, setPosts] = useState([])
    const [questions, setQuestions] = useState ([])
    const [topics, setTopics]= useState([])

    function getAllTopics(){
        setLoading(true)
        userAxios.get(`/parental/topics/`)
        .then(response=>{
            console.log(response.data)
            setTopics(response.data)
            setLoading(false)
        })
        .catch(err=>console.log(err.response.data.errMessage))
    }
    function getTopicPosts(topicId, topic){
        setLoading(true)
        userAxios.get(`/parental/posts/${topicId}/topics`)
        .then(response=>{
            setPosts(response.data)
        setLoading(false)
        })
        .catch(err=>console.log(err.response.data.errMessage))
    }
    function getTopicQuestions(topicId){
        userAxios.get(`/parental/questions/${topicId}/topics`)
        .then(response=>{
            console.log(response.data)
            setQuestions(response.data)
        })
        .catch(err=>console.log(err.response.data.errMessage))
    }
    
    return(
        <TopicSpecificContext.Provider value={{loading, posts, topics, questions, getTopicQuestions, getAllTopics, getTopicPosts}}>
            {props.children}
        </TopicSpecificContext.Provider>
    )
}

export {TopicSpecificProvider, TopicSpecificContext}