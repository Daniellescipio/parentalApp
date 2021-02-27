import React from "react"

function TopicDropDown(props){
    const topics = props.topics
    const topic = props.topic
    const topicMenu = topics.map(topic=>{
        return <option value = {topic}>{topic.topic}</option>
    })
    function handleDropDown(e){
        const {value} = e.target
        props.settingFunction(value)     
    }
    return(
        <div>
            <label>Topics</label>
                <select 
                    value={topic}
                    onChange={handleDropDown}
                    name="topic">
                    {topicMenu}
                </select>
        </div>
    )
}

export default TopicDropDown