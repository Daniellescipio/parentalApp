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
    const [allPosts, setAllPosts] = useState([])
    const [allQuestions, setAllQuestions]= useState([])
    
    function getAllTopics(){
        setLoading(true)
        userAxios.get(`/parental/topics/`)
        .then(response=>{
            setTopics(response.data)
            setLoading(false)
        })
        .catch(err=>console.log(err.response.data.errMessage))
    }
    function getAllPosts(){
        setLoading(true)
        userAxios.get(`/parental/posts/`)
        .then(response=>{
            setAllPosts(response.data)
            setLoading(false)
        })
        .catch(err=>console.log(err.response.data.errMessage))
    }
    function getAllQuestions(){
        setLoading(true)
        userAxios.get(`/parental/questions/`)
        .then(response=>{
            setAllQuestions(response.data)
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
            setQuestions(response.data)
        })
        .catch(err=>console.log(err.response.data.errMessage))
    }
    
    return(
        <TopicSpecificContext.Provider value={{loading, posts, topics, questions, allQuestions, allPosts, getAllQuestions, getAllPosts, getTopicQuestions, getAllTopics, getTopicPosts}}>
            {props.children}
        </TopicSpecificContext.Provider>
    )
}

export {TopicSpecificProvider, TopicSpecificContext}