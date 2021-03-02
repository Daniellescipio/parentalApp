import {useState, useContext} from "react"
import {LoginContext} from "./LoginContext"
function ChangeVote(){
    // this property when true triggers the use effect that sets vote, the same use effect toggles it back to false when the data is retrieved
    const [voted, setVoted] = useState(false)
    //sets the subject(postOrResponse) we need to send our axios call in useInteraction
    const [subject, setSubject] = useState('')
    //tracks the vote after we get it from responseSection or DetailPage
    const [vote, setVote] = useState({vote:0,users:[]})
    //pulls the current voter from context for comparisons
    const {user} = useContext(LoginContext)
//This function is responsible for checking a voter and adding/changing/rejecting their vote
    function voteFunction(boolean, XForVote){
    //^^^The boolean and XForvote(which will be a response or post) will come from the component ChangeVote is called

    //Changes our initial vote to the vote of the response or post being voted on
    setVote(XForVote.vote)
     //establishes current vote and the array of voters
    const currentVote = XForVote.vote.vote
    const voterArray = XForVote.vote.users
    //establishes the newVote and checks array of voters to see if the user has voted before
    let newVote = {
        id: user._id,
        vote: boolean
    }
    let previousVote = voterArray.find(userVote=>userVote.id===user._id)
    //if a user has not voted before, previousVote will be undefined and they can up or down vote
        if(!previousVote){
            //sets the vote in state by adding or subtracting one from the current vote and adds the newVoter to voter array 
            setVote((prev)=>{
                if(boolean){
                return(
                    {vote:prev.vote+ 1, users:[...prev.users, newVote]}
                    ) 
                }else{
                    return(
                        {vote:prev.vote - 1, users:[...prev.users, newVote]}
                    )
                } 
            })
            //sets id and boolean in state to pass to useEffect
            //the reason I do this here instead of the parent component is because responseSection(a responses parent component) is responsible for an array of comments where as DetailPage(a posts parent component) is only responsible for it's one post. so the inner function here handles the logic of getting that specific Id from the response array or the only Id from post and changing everything.
            setSubject(XForVote)
          setVoted(true)       
        }else{
            //if the user has voted before we get their id and previous vote from the variable we declared earlier
            let votedUser = previousVote.id
            let voterBoolean = previousVote.vote
            //checks to see if the current user trying to vote has the same Id as the previous voter, if they do, it checks to see if the incoming vote is the same as the voters boolean if the booleans are different, it should allow the user to switch their vote
            if(votedUser === user._id && voterBoolean !==boolean){
                //finds voter and reassings their vote
                const voterIndex = voterArray.findIndex(voter=>voter.id ===votedUser)
                Object.assign(voterArray[voterIndex], newVote)
                setVote(()=>{
                    if(boolean){
                        return(
                            {vote:currentVote + 1, users:[...voterArray]}
                        ) 
                    }else{
                        return(
                            {vote:currentVote - 1, users:[...voterArray]}
                        )
                    } 
                })
                setSubject(XForVote)
                setVoted(true)   
            }else{
                //rejects a vote if it is the same as their previous vote
                alert `You already voted!`
            }   
        }
    }
    //allows useEffect to switch voted to false after it 'votes' which essentially turns the useEffect 'off'
    function toggleVote(){
       setVoted(false) 
    }
    //updates the post
    function updatePost(){
        Object.assign(subject.vote, vote)
    }
    
    return{vote, voted, subject, voteFunction, toggleVote, updatePost}
}

export default ChangeVote