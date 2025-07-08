/*import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
  FaFileAlt,
  FaPaperPlane,
  FaSmile,
  FaPaperclip,
} from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";

export default function ChatBox() {
  const [user, setUser] = useState(null);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let msgs = [];
      snapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  const handleSend = async () => {
    if (text.trim() === "" && !file) return;

    await addDoc(collection(db, "messages"), {
      text,
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: serverTimestamp(),
    });

    setText("");
    setFile(null);
    setImagePreview(null);
  };

  const handleEmojiClick = (emoji) => {
    setText((prev) => prev + emoji.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);

    if (selected && selected.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(selected);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="flex flex-col h-full">
      //Messages
      <div className="flex-1 overflow-y-auto bg-gray-700 p-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.uid === user?.uid ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.uid === user?.uid
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              <p className="text-sm font-semibold">{msg.displayName}</p>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      //Emoji Picker
      {showEmojiPicker && (
        <div className="absolute bottom-20 left-4 z-10">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      //Preview
      {imagePreview && (
        <div className="mb-2 px-4">
          <img
            src={imagePreview}
            alt="preview"
            className="w-32 rounded-lg shadow"
          />
        </div>
      )}
      {file && !imagePreview && (
        <div className="mb-2 text-sm text-gray-700 flex items-center gap-2 px-4">
          <FaFileAlt /> {file.name}
        </div>
      )}

      //Input
      <div className="p-4 bg-white border-t flex gap-2 items-center">
        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="text-yellow-700 hover:text-gray-700"
        >
          <FaSmile size={20} />
        </button>

        <label className="text-gray-500 hover:text-gray-700 cursor-pointer">
          <FaPaperclip size={20} />
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
        </label>

        <input
          type="text"
          className="flex-1 border rounded px-4 py-2"
          placeholder="Typing Message....."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          <FaPaperPlane size={20} />
        </button>
      </div>
    </div>
  );
}*/
// src/pages/ChatBox.jsx
import React, { useEffect, useRef, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
  FaFileAlt,
  FaPaperPlane,
  FaSmile,
  FaPaperclip,
  FaCheck,
  FaCheckDouble,
} from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";

export default function ChatBox() {
  const [user, setUser] = useState(null);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const scrollRef = useRef();

  // Auth
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  // Fetch messages and seen
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  // Typing status tracking
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "typingStatus"), (snapshot) => {
      const status = {};
      snapshot.forEach((doc) => {
        const { uid, isTyping } = doc.data();
        if (uid !== user?.uid && isTyping) {
          status[uid] = true;
        }
      });
      setTypingUsers(status);
    });
    return () => unsub();
  }, [user]);

  // Auto scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (text.trim() === "" && !file) return;

    const docRef = await addDoc(collection(db, "messages"), {
      text,
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: serverTimestamp(),
      status: "sent",
    });

    // Mark message as delivered
    await updateDoc(doc(db, "messages", docRef.id), {
      status: "delivered",
    });

    setText("");
    setFile(null);
    setImagePreview(null);
  };

  const handleTyping = async (typing) => {
    if (!user) return;
    await setDoc(doc(db, "typingStatus", user.uid), {
      uid: user.uid,
      isTyping: typing,
    });
  };

  const handleEmojiClick = (emoji) => {
    setText((prev) => prev + emoji.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);

    if (selected && selected.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(selected);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-red-300 p-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.uid === user?.uid ? "justify-end" : "justify-start"
            }`}
            ref={idx === messages.length - 1 ? scrollRef : null}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.uid === user?.uid
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              <p className="text-sm font-semibold">{msg.displayName}</p>
              <p>{msg.text}</p>
              {msg.uid === user?.uid && (
                <div className="text-xs flex justify-end mt-1">
                  {msg.status === "delivered" ? (
                    <FaCheckDouble size={12} />
                  ) : (
                    <FaCheck size={12} />
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {Object.keys(typingUsers).length > 0 && (
          <p className="text-sm text-gray-500 italic">Someone is typing...</p>
        )}
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-20 left-4 z-10">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      {/* Preview */}
      {imagePreview && (
        <div className="mb-2 px-4">
          <img
            src={imagePreview}
            alt="preview"
            className="w-32 rounded-lg shadow"
          />
        </div>
      )}
      {file && !imagePreview && (
        <div className="mb-2 text-sm text-gray-700 flex items-center gap-2 px-4">
          <FaFileAlt /> {file.name}
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-white border-t flex gap-2 items-center">
        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="text-yellow-700 hover:text-gray-700"
        >
          <FaSmile size={20} />
        </button>

        <label className="text-gray-500 hover:text-gray-700 cursor-pointer">
          <FaPaperclip size={20} />
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        <input
          type="text"
          className="flex-1 border rounded px-4 py-2"
          placeholder="Typing Message....."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            handleTyping(true);
          }}
          onBlur={() => handleTyping(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
              handleTyping(false);
            }
          }}
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          <FaPaperPlane size={20} />
        </button>
      </div>
    </div>
  );
}

