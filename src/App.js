import { useState, useEffect, useRef } from 'react'
import './App.css';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getFirestore, getDoc, onSnapshot, addDoc, orderBy, query, serverTimestamp, collection, Timestamp } from 'firebase/firestore'
import { auth, app } from './firebase'

const db = getFirestore(app)

function App() {
  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"))
    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  }, [])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages])

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    if (user) { // Ensure user is not null
      await addDoc(collection(db, "messages"), {
        uid: user.uid,
        photoURL: user.photoURL,
        displayName: user.displayName,
        text: newMessage,
        timestamp: serverTimestamp()
      })
    }

    setNewMessage("")
  }

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <div className="button-container">
        {user ? (
          <>
            <div>Logged in as {user.displayName}</div>
            <input
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send Message</button>
            <button onClick={() => auth.signOut()}>Logout</button>
          </>
        ) : (
          <button className="login-btn" onClick={handleGoogleLogin}>Login with Google</button>
        )}
      </div>

      <div className="messages-container">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.data.uid === user?.uid ? 'current' : 'other'}`}>
            <img
              src={msg.data.photoURL || "https://i.pravatar.cc/40"}
              alt="User Profile"
              className="profile-img"
            />
            <div className="message-content">
              <div className="username">
                {msg.data.displayName || "Unknown User"}
              </div>
              <div className="message-text">{msg.data.text}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

export default App;
