import {useState, useContext} from "react"
import {UserContext} from "./UserProvider"
function ChangeVote(){
    
    const [voted, setVoted] = useState(false)
    const [idForVoting, setIdForVoting] = useState('')
    const [vote, setVote] = useState({vote:0,users:[]})
    const {user} = useContext(UserContext)
    //pulls data from responseBeingVotedOne
    //let response = responses.find(response=>response._id===responseBeingVotedOne._id)
    //if there is no previous vote, the user should be able to vote up or down
    function voteFunction(boolean, XForVote){
        
    //establishes current vote and the array of voters
    const currentVote = XForVote.vote.vote
    const voterArray = XForVote.vote.users
    //checks array of voters to see if the user has voted before
    let previousVote = voterArray.find(userVote=>userVote.id===user._id)
    //establishes the new voter and their vote
    let newVote = {
        id: user._id,
        vote: boolean
    }
    console.log(user._id)
        if(!previousVote){
            //sets the vote in state by adding or subtracting one from the current voteand adds the newVoter to voter array 
            setVote((prev)=>{
                if(boolean){
                return(
                    {vote:currentVote+ 1, users:[...voterArray, newVote]}
                    ) 
                }else{
                    return(
                        {vote:currentVote - 1, users:[...voterArray, newVote]}
                    )
                } 
            })
            //sets id and boolean in state to pass to useEffect
            setIdForVoting(XForVote._id)
            setVoted(true)       
        }else{
            console.log('previous voter')
            //if the user has voted before we get their id and previous vote from the variable we declared earlier
            let votedUser = previousVote.id
            let voterBoolean = previousVote.vote
            console.log(`voterUser: ${previousVote} and voter Boolean :${voterBoolean}`)
            //checks to see if the current user trying to vote has the same Id as the previous voter, if the do, it checks to see if the incoming vote is the same as the voters boolean if the booleans are different, it should allow the user to switch their vote
            if(votedUser === user._id && voterBoolean !==boolean){
                console.log('with a new vote')
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
                setIdForVoting(XForVote._id)
                setVoted(true)   
            }else{
                alert `You already voted!`
            }   
        }
    }
    function toggleVote(){
       setVoted(false) 
    }
    
    return{vote, voted, idForVoting, voteFunction, toggleVote}
}

export default ChangeVote