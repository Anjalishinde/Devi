import React, { useState, useEffect, useRef } from 'react';
import './Join.css';
import io from 'socket.io-client';
import { TweenMax, Power2, Expo } from 'gsap';
import PrivateCode from './PrivateCode';

let socket;

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [loginError, setLoginError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [showPrivateDialog, setShowDialog] = useState(false);
  const [privateCode, setPrivateCode] = useState('');

  let h1Ref = useRef(null);
  let roomsref = useRef(null);
  let nameRef = useRef(null);
  let roomRef = useRef(null);
  let mybtn = useRef(null);
  let overlay = useRef(null);
  let overlay2 = useRef(null);
  let screen = useRef(null);
  let loginBtn = useRef(null);

  // const ENDPOINT = "https://buzz-and-go.herokuapp.com/";
  // //const ENDPOINT = "http://localhost:5000/"

  const ENDPOINT =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000/'
      : 'https://buzz-and-go.herokuapp.com/';

  useEffect(() => {
    socket = io(ENDPOINT);
  }, [ENDPOINT]);

  useEffect(() => {
    setLoginError('');
    setSubmitting(false);
    setName('');
    setRoom('');
  }, []);

  const handleSubmit = (e) => {
    socket.emit('check', { name, room }, async (error) => {
      if (error) {
        setLoginError(error.error);
        setSubmitting(false);
      }
      if (!name || !room) {
        setLoginError('Please fill all the fields');
        setSubmitting(false);
        return;
      }

      if (!error && name && room) {
        setLoginError('');
        setSubmitting(true);

        const res = await fetch(`/api/getRoomDetails/${room}`);
        const roomDetails = await res.json();
        
        if (roomDetails.status && roomDetails.status === 'private') {
          // bring popup to show the box
          setShowDialog(true);
          setPrivateCode(roomDetails.privateCode);
        } else {
          TweenMax.to(loginBtn.current, {
            y: '-150px',
            backgroundColor: '#003459',
          });
          TweenMax.to(nameRef.current, 1.5, {
            opacity: 0,
          });
          TweenMax.to(roomRef.current, 1.5, {
            opacity: 0,
          });
          TweenMax.to(h1Ref.current, 1.5, {
            opacity: 0,
          });
          TweenMax.to(roomsref.current, 1.5, {
            opacity: 0,
          });
          setTimeout(() => {
            window.location.replace(`/chat?name=${name}&room=${room}`);
          }, 2000);
        }
      }
    });
  };
  const fadeOut = () => {
    TweenMax.to(mybtn, 2, {
      y: '-100%',
      opacity: 0,
    });

    TweenMax.to(screen, 2, {
      y: '-400%',
      opacity: 0,
      ease: Power2.easeInOut,
      delay: 1,
    });

    TweenMax.from(overlay, 2, {
      ease: Power2.easeInOut,
    });
    TweenMax.to(overlay, 2, {
      delay: 1,
      top: '-110%',
      ease: Expo.easeInOut,
    });

    TweenMax.to(overlay2, 2, {
      delay: 1.5,
      top: '-110%',
      ease: Expo.easeInOut,
    });
  };
  useEffect(() => {
    socket.on('getrooms', (rooms) => {
      setRooms(rooms);
    });
  }, []);

  return (
    <div className='joinOuterContainer'>
      <div
        className='overlay'
        ref={(element) => {
          overlay = element;
        }}
      >
        <div className='screen'>
          <p
            ref={(element) => {
              screen = element;
            }}
          >
            Create a room <br /> or join one
            <br />
            Chat <br />
            forget
          </p>
        </div>
        <div className='intro'>
          <p>
            Your privacy is our concern.
            <br />
            The rooms are temporary.
            <br />
            Your chats are not being saved.
            <br />
            No authentication required.
          </p>
          <button
            className='myBtn'
            onClick={() => fadeOut()}
            ref={(element) => {
              mybtn = element;
            }}
          >
            Get started
          </button>

          <a href="http://localhost:3006/UserSignIn">
          Home
        </a>
        </div>
      </div>
      <div
        className='overlay-2'
        ref={(element) => {
          overlay2 = element;
        }}
      ></div>
      <div className='joinInnerContainer'>
        <h1 className='heading' ref={h1Ref}>
          Create or Join a Present Room
        </h1>
        <ul id='RoomList' ref={roomsref}>
          <h2>Public Rooms</h2>
          {rooms.map((room) =>
            room.status === 'public' ? (
              <li onClick={() => setRoom(room.room)} key={room.room}>
                Room {room.room} with Participants {room.part}
              </li>
            ) : null
          )}
        </ul>
        <div ref={nameRef}>
          {loginError ? <h3 className='errorh3'>{`${loginError}`}</h3> : null}
          <input
            placeholder='Name'
            className='joinInput'
            type='text'
            required={true}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div ref={roomRef}>
          <input
            placeholder='Room'
            className='joinInput mt-20'
            type='text'
            value={room}
            onChange={(event) => setRoom(event.target.value)}
            onKeyDown={(e) => (e.keyCode === 13 ? handleSubmit() : null)}
          />
        </div>

        <button
          className={'button mt-20'}
          type='submit'
          ref={loginBtn}
          onClick={() => handleSubmit()}
        >
          {submitting ? 'Welcome' : 'Sign In'}
        </button>
      </div>
      {showPrivateDialog && (
        <PrivateCode privateCodeCheck={privateCode} name={name} room={room} />
      )}
    </div>
  );
};

export default Join;
