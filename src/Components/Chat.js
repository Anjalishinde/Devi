import image from './chat-image.svg';
import firebase from 'firebase/app';
import fire from '../Config/Config'
import React, { useState, useEffect } from 'react'
// import "./Chat.css";

function Chat() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [Phoneno, setPhoneno] = useState();
  const [message, setMessage] = useState();
  const [userid, setUid] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          setUid(user.uid)
        } else {
          console.log("Not logged in")
        }
      });
},[])

  const handelSubmit = (e) => {

    e.preventDefault();
    setLoader(true)
    fire.firestore().collection('ChatApplication').doc(userid).set({
      name: name,
      email: email,
      Phoneno: Phoneno,
      message: message,
      active: false
    }).then(() => {
      alert('form submitted')
      setLoader(false)
    }).catch((error) => {
      alert(error.message);
      setLoader(false)
    })
    setName("");
    setEmail("");
    setPhoneno("");
    setMessage("");

  };

  return (
    <>
      <div className="container col-md-8 col-sm-12">
        <div className="row">
          <div className="col-md-7 my-auto" style={{ fontSize: "3rem", color: "black" }}><b>Connect with us</b></div>
          <div className="col-md-5"><img src={image} alt="" width="100%" /></div>
        </div>
      </div>
      <div className="container col-md-5 col-sm-12">

        <form id="contact">
          <h3>Contact us by filling the form</h3>
          <fieldset>
            <input class="container-fluid" placeholder="Your name" type="text" tabindex="1" required autofocus value={name} onChange={(e) => setName(e.target.value)}></input>
          </fieldset>
          <fieldset>
            <input class="container-fluid" placeholder="Your Email Address" type="email" tabindex="2" required value={email} onChange={(e) => setEmail(e.target.value)}></input>
          </fieldset>
          <fieldset>
            <input class="container-fluid" placeholder="Your Phone Number (optional)" type="tel" tabindex="3" required value={Phoneno} onChange={(e) => setPhoneno(e.target.value)}></input>
          </fieldset>
          <fieldset>
            <textarea class="container-fluid" placeholder="Feel free to ask us...." tabindex="5" required value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
          </fieldset>
          <fieldset>
            <button name="submit" type="submit" onClick={handelSubmit} id="contact-submit" data-submit="...Sending" style={{ backgroundColor: "#f37175" }}>Submit</button>
          </fieldset>
        </form>
      </div>
    </>
  )
}

export default Chat