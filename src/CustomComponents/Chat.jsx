// import {
//     collection,
//     addDoc,
//     onSnapshot,
//     query,
//     orderBy,
//     serverTimestamp,
// } from "firebase/firestore";
// import { db } from "./Firebase";
// import { useEffect, useState } from "react";
// import { useUser } from "../Context/userContext";
// import { useTradeData } from "./DataContext/TradeDataContext";

// const Chat = () => {
//     const { tradeData } = useTradeData();
//     const { user } = useUser();
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState("");
//     const currentUserId = user?.user_id;

//     const chatId = getChatId(currentUserId, tradeData?.user_id);
//     const messagesRef = collection(db, "chats", chatId, "messages");

//     useEffect(() => {
//         const q = query(messagesRef, orderBy("createdAt"));
//         const unsubscribe = onSnapshot(q, (snapshot) => {
//             setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//         });
//         return unsubscribe;
//     }, [chatId]);

//     const sendMessage = async (e) => {
//         e.preventDefault();
//         if (!input.trim()) return;
//         await addDoc(messagesRef, {
//             text: input,
//             sender: currentUserId,
//             createdAt: serverTimestamp(),
//         });
//         setInput("");
//     };

//     return (
//         <div style={{ margin: '100px', maxWidth: '600px' }}>
//             <div style={{
//                 maxHeight: 400,
//                 overflowY: "auto",
//                 border: "1px solid #ccc",
//                 borderRadius: "8px",
//                 padding: "10px",
//                 marginBottom: "10px",
//                 background: "#f9f9f9",
//             }}>
//                 {messages.map((msg) => {
//                     const isCurrentUser = msg.sender === currentUserId;
//                     return (
//                         <div
//                             key={msg.id}
//                             style={{
//                                 textAlign: isCurrentUser ? "right" : "left",
//                                 marginBottom: "8px"
//                             }}
//                         >
//                             <div
//                                 style={{
//                                     display: "inline-block",
//                                     background: isCurrentUser ? "#d1ffd6" : "#e1e1e1",
//                                     padding: "8px 12px",
//                                     borderRadius: "16px",
//                                     maxWidth: "70%",
//                                 }}
//                             >
//                                 <strong>{isCurrentUser ? "You" : "Them"}</strong>: {msg.text}
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>

//             <form onSubmit={sendMessage} style={{ display: "flex", gap: "8px" }}>
//                 <input
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     style={{
//                         flex: 1,
//                         padding: "10px",
//                         borderRadius: "8px",
//                         border: "1px solid #ccc"
//                     }}
//                     placeholder="Type your message..."
//                 />
//                 <button type="submit" style={{
//                     padding: "10px 16px",
//                     borderRadius: "8px",
//                     border: "none",
//                     background: "#4caf50",
//                     color: "white",
//                     cursor: "pointer"
//                 }}>
//                     Send
//                 </button>
//             </form>
//         </div>
//     );
// };

// // 🔁 Helper to generate consistent chatId
// function getChatId(userA, userB) {
//     return [userA, userB].sort().join("_");
// }

// export default Chat;
