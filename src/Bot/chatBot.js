import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import UserNavbar from '../NavBar/UserNav'
// import image from "./chatbot-page-img.svg";

const ChatBot = () => {

  const [question, setQuestion] = useState('');

  const [messages, setMessages] = useState([]);

  function addMessage(type, text) {
    console.log(text);
    setMessages(messages => [...messages, {type: type, text: text}]);
  }

  function sendQuestion(e) {
    e.preventDefault();
    const text = question;
    addMessage("question", text);
    var answer;
    const article = { question: '' + question + "?" };
    // console.log("article",article)
    axios.post('https://chatbot-api-cfg.herokuapp.com/chatbot', article)
      .then(response => {
        answer = response.data['answer'];
        addMessage("answer", answer);
      });
  }

  return (
    <>

    
      <UserNavbar/>

      <br />
      <div className="container col-md-8 col-sm-12">
        <div className="row">
          <div className="col-md-6 col-sm-12 my-auto">
            <strong><p style={{ fontSize: "3rem" }}>Feel free to chat with us!!</p></strong>
          </div>
          <div className="col-md-6 col-sm-12">
            {/* <img src={image} alt="" width="100%" /> */}
          </div>
        </div>
        <br />
        <br />
        <div id="chatbot" className="container col-md-8 col-sm-12 shadow-lg" style={{ height: "500px" }}>

          <div id="messages" style={{ height: "85%", backgroundColor: "rgb(250, 250, 250)", overflowY: "scroll" }}>
            <div className="m-1">
              {
                messages.map((message, i) => (
                  <div key={i} className="p-2 my-3" style={{ color: "white", width: "70%", lineHeight: "1", marginLeft: message.type === "answer" ? "0px" : "auto", backgroundColor: message.type === "answer" ? "#7868E6" : "#845EC2", borderRadius: "10px", borderBottomLeftRadius: message.type === "answer" ? "0px" : "10px", borderBottomRightRadius: message.type === "answer" ? "10px" : "0px" }}><small>{message.text}</small></div>
                ))
              }
            </div>
          </div>
          <br />
          <div id="type-area" style={{ height: "15%" }}>
            <form onSubmit={sendQuestion}>
              <input type="text" className="form-control container-fluid" placeholder="How can we help you?" onChange={(e) => setQuestion(e.target.value)} />
              <input className="btn btn-dark" type="submit" style={{ display: "none" }} />
            </form>
          </div>
          <br />
          <br />
        </div>
        <br />
      </div>
      <br />
      <br />
      <br />
    </>
  );

}

export default ChatBot;