import axios from "axios"
import React, {useState} from "react"
const UserDataContext = React.createContext()
const userAxios = axios.create()

userAxios.interceptors.request.use(config=>{
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function UserDataProvider(props){
    const [loading, setLoading]= useState(true)
    const [posts, setPosts] = useState([])
    const [questions, setQuestions] = useState([])
    const [editedPost, setEditedPost] = useState({})
    const [editedQuestion, setEditedQuestion] = useState({})

    function getUserPosts(userId){
        setLoading(true)
        userAxios.get(`/parental/posts/${userId}`)
        .then(response=>{
            setPosts(response.data)
            setLoading(false)
        })
        .catch(err=>console.log(err.response.data.errMessage))
    }
    function getUserQuestions(userId){
        setLoading(true)
        userAxios.get(`/parental/questions/${userId}`)
        .then(response=>{
            setQuestions(response.data)
            setLoading(false)
        })
        .catch(err=>console.log(err.response.data.errMessage))

    }
    function addPost(topicId, newPost){
        setLoading(true)
        userAxios.put(`/parental/users/${topicId}/addPost`,newPost)
        .then(response=>{
            console.log(response.data)
            setLoading(false)
        })
        .catch(err=>console.log(err.response.data.errMessage))
    }
    function editPost(postId, edits){
        setLoading(true)
        userAxios.put(`/parental/posts/${postId}/`, edits)
        .then(response=>{
            console.log(response.data)
            setEditedPost(response.data)
            setLoading(false)
        })
    }
    function deletePost(topicId, postId){
        console.log('delete')
        setLoading(true)
        userAxios.put(`/parental/users/${topicId}/${postId}/removePost`)
        .then(response=>{
            console.log(response.data)
            setLoading(false)
        })
        .catch(err=>console.log(err.response.data.errMessage))
        userAxios.delete(`/parental/posts/${postId}`)
    }
    function addQuestion(topicId, newQuestion){
        setLoading(true)
        userAxios.put(`/parental/users/${topicId}/addQuestion`,newQuestion)
        .then(response=>{
            console.log(response.data)
            setLoading(false)
        })
        .catch(err=>console.log(err.response.data.errMessage))
    }
    function editQuestion(questionId, edits){
        setLoading(true)
        userAxios.put(`/parental/questions/${questionId}/`, edits)
        .then(response=>{
            console.log(response.data)
            setEditedQuestion(response.data)
            setLoading(false)
        })
    }
    function deleteQuestion(topicId, questionId){
        setLoading(true)
        userAxios.put(`/parental/users/${topicId}/${questionId}/removeQuestion`)
        .then(response=>{
            console.log(response.data)
            setLoading(false)
        })
        .catch(err=>console.log(err.response.data.errMessage))
        userAxios.delete(`/parental/questions/${questionId}`)
    }

    return(
        <UserDataContext.Provider value={
            {
                getUserPosts, 
                getUserQuestions, 
                addPost, 
                editPost,
                deletePost,
                addQuestion,
                editQuestion,
                deleteQuestion,
                editedQuestion,
                editedPost,
                posts, 
                questions, 
                loading}}>
            {props.children}
        </UserDataContext.Provider>
    )
}

export {UserDataProvider, UserDataContext}