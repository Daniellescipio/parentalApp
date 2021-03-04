// import React from "react";
// import { useEffect, useContext, useState } from "react/cjs/react.development";
// import { LoginContext } from "../logic/LoginContext";
// //import YourConvos from "./YourConvos"
// //import Misc from "./Misc"
// function Extras(props) {
//   //const [otherUsers, setOtherUsers] = useState([]);
//   const { editUser, users, getAllUsers, user } = useContext(LoginContext);
//   const [topTopics, setTopTopics] = useState(user.topTopics)
//   //gets user specific post and questions
//   const { posts, questions } = props || user
//   const [postAndQuestions, setPostsAndQuestions] = useState([])
//   const [topicObject, setTopicObject] = useState({})
//   //loads data from context

// //   useEffect(() => {
// //     console.log(topTopics)
// //     editUser(topTopics);
// //     getAllUsers();
// //     // eslint-disable-next-line
// //   }, []);
// useEffect(()=>{
//     console.log(posts, questions)
//     const together = posts.concat(questions)
//     setPostsAndQuestions(together)
// }, [posts, questions])
// useEffect(()=>{
//     console.log(postAndQuestions)
//     if (postAndQuestions.length > 0) {
//         for (let i = 0; i < postAndQuestions.length; i++) {
//             console.log(postAndQuestions)
//           let topic = postAndQuestions[i].topic.topic;
//           setTopicObject(prev=>{
//               console.log(prev)
//               if(prev[topic]){
//                   return {...prev, [topic]:prev[topic]+1}
//               }else {
//                   return{...prev, [topic]:1}
                
//               }
//           })
//         }
//       }
// },[])


//   console.log(topicObject);
//   let topicArray = [];
//   for (const key in topicObject) {
//     topicArray.push([key, topicObject[key]]);
//     topicArray.sort((a, b) => b[1] - a[1]);
//   }

// //   if (topicArray.length < 1) {
// //     setTopTopics([
// //       "Add a New Post or Question",
// //       "Add a New Post or Question",
// //       "Add a New Post or Question"
// //     ]);
// //   } else if (topicArray.length === 1) {
// //     setTopTopics([
// //       topicArray[0][0],
// //       "Add a New Post or Question",
// //       "Add a New Post or Question"
// //     ]);
// //   } else if (topicArray.length === 2) {
// //     setTopTopics([
// //       topicArray[0][0],
// //       topicArray[1][0],
// //       "Add a New Post or Question"
// //     ]);
// //   } else {
// //     setTopTopics([topicArray[0][0], topicArray[1][0], topicArray[2][0]]);
// //   }

// //   const similarUsers = [];
// //   let count = 0;
// //   while (similarUsers.length < 5 && count < users.length-1) {
// //     const eachUser = users[count];
// //     console.log(eachUser)
// //     let similar = 0;
// //     for (let i = 0; i < eachUser.topTopics.length; i++) {
// //       if (topTopics.indexOf(eachUser.topTopics[i]) >= 0) {
// //         similar++;
// //       }
// //     }
// //     if (similar === 3) {
// //       similarUsers.push(eachUser.username);
// //     } else if (similar === 2) {
// //       similarUsers.push(eachUser.username);
// //     } else if (similar === 1) {
// //       similarUsers.push(eachUser.username);
// //     }
// //     count++
// //   }
// //   console.log(similarUsers)
//   return (
//     <div className="extras">
//       <p>You seem to like...</p>
//       {/* <ul>
//         <li>{topTopics[0] ? topTopics[0] : ""}</li>
//         <li>{topTopics[1] ? topTopics[1] : ""}</li>
//         <li>{topTopics[2] ? topTopics[2] : ""}</li>
//       </ul> */}
//       <p>Here are some other users with te same interest!</p>
//     </div>
//   );
// }
// export default Extras;
