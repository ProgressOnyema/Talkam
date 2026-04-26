import { useState, useEffect, useRef } from "react";
import styled from 'styled-components'
import { ChevronLeft, BadgeCheck, Menu, Plus } from 'lucide-react'
import IMAGES from "../images/images";
import Lottie from "lottie-react";
import can_pulse from "../images/can_pulse.json";


const ChatWrapper = styled.main`
    background: #111;
    color: #fff;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
`;


const Nav = styled.nav`
    display: flex;
    width: 100%;
    height: 88px;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    background: #111;
    color: #fff;
    z-index: 10;
`;

const Disclaimer = styled.div`
    display: flex;
    width: 350px;
    padding: 6px 16px;
    align-items: center;
    gap: -30px;
    border-radius: 10px;
    background: #222;
    color: #fff;
    margin: 0 auto;
    /* margin-top: 100px; */
`;


const ChatInputWrapper = styled.div`
    position: fixed;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    padding: 16px 10px;
    z-index: 100;
    background-color: #111;
`

const ChatInput = styled.div`
    height: 56px;
    flex: 1 0 0;
    border-radius: 50px;
    background: #222;
    padding: 0 6px 0 16px;
    display: flex;
    align-items: center;
    

    form {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 8px;
    }

    input {
        flex: 1;
        background: transparent;
        border: none;
        color: #fff;
        outline: none;
    }
`


const Padlock = styled.div`
    display: flex;
    /* padding: 10px; */
    align-items: center;
    /* gap: 10px; */
    background: linear-gradient(90deg, rgba(34, 34, 34, 0.30) 0%, #222 25.57%);
`;


const MessageContainer = styled.section`
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 0 32px;
    padding-top: 88px;
    padding-bottom: 100px;
    overflow-y: auto;
    height: 100%;
    -webkit-overflow-scrolling: touch;
    flex: 1;
    position: relative;
`;


const UserMessage = styled.div`
    display: flex;
    width: max-content;
    max-width: 345px;
    padding: 16px 16px 16px 42px;
    justify-content: right;
    align-items: center;
    gap: 10px;
    border-radius: 10px;
    background: #222;
    margin-left: auto;

    p {
        color: #FFF;
        font-size: 20px;
        font-weight: 400;
        line-height: 30px;
    }
`;

const BotMessage = styled.div`
    display: flex;
    width: 345px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    margin-right: auto;

    p {
        font-size: 20px;
        font-weight: 400;
        line-height: 30px;
        white-space: pre-wrap;
        word-break: break-word;
    }

    code {
        background: #333;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: monospace;
    }

    pre {
        background: #333;
        padding: 12px;
        border-radius: 8px;
        overflow-x: auto;
        width: 100%;
    }
`;


function Chatbot() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentBotMessage, setCurrentBotMessage] = useState("");
  const [displayedBotMessage, setDisplayedBotMessage] = useState("");
  const [pendingBotMessage, setPendingBotMessage] = useState(null);
  const messageContainerRef = useRef(null);

  const scrollToNewMessage = () => {
    if (messageContainerRef.current) {
      const container = messageContainerRef.current;
      const newMessage = container.querySelector('.new-message');
      if (newMessage) {
        newMessage.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
        // Remove the class after scrolling
        setTimeout(() => {
          newMessage.classList.remove('new-message');
        }, 1000);
      }
    }
  };

  useEffect(() => {
    let timeoutId;
    let currentIndex = 0;

    const typeNextChar = () => {
      if (currentIndex < currentBotMessage.length) {
        setDisplayedBotMessage(currentBotMessage.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeNextChar, 10);
      } else {
        setIsTyping(false);
        setDisplayedBotMessage(currentBotMessage);
        if (pendingBotMessage) {
          setChats(prev => [...prev, pendingBotMessage]);
          setPendingBotMessage(null);
          setTimeout(scrollToNewMessage, 100);
        }
      }
    };

    if (isTyping && currentBotMessage) {
      typeNextChar();
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isTyping, currentBotMessage, pendingBotMessage]);

  const formatMessage = (text) => {
    // Format code blocks
    text = text.replace(/```([\s\S]*?)```/g, '<pre>$1</pre>');
    // Format inline code
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Format newlines
    text = text.replace(/\n/g, '<br />');
    return text;
  };

  const chat = async (e, message) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);
    setDisplayedBotMessage("");
    setCurrentBotMessage("");
    setTimeout(scrollToNewMessage, 100);

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    setMessage("");

    try {
      const response = await fetch("http://172.20.10.6:8000/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chats,
        }),
      });
      
      const data = await response.json();
      setPendingBotMessage(data.output);
      setCurrentBotMessage(data.output.content);
    } catch (error) {
      console.log(error);
      setIsTyping(false);
    }
  };

  return (
    <>
      <Nav>
        <div className="flex flex-row gap-2">
          <ChevronLeft />
          <div className="flex">
          <img src={IMAGES.nobibot} alt="" className="mr-2" /> <h3 className="font-bold text-xl">NobiBot</h3> <img src={IMAGES.gold} alt="" srcset="" />
          </div>
        </div>
        <Menu/>
      </Nav>
      <ChatWrapper>
        <MessageContainer ref={messageContainerRef}>
          <Disclaimer>
            <p className="text-sm truncate">
              Your conversation is private and secure. 
              Everything you share stays confidential, 
              and no one else can see your messages. 
              Feel free to talk openly
            </p>
            <Padlock className="text-sm">🔒</Padlock>
          </Disclaimer>
          {chats && chats.length
            ? chats.map((chat, index) => (
                <div key={index} className={index === chats.length - 1 ? 'new-message' : ''}>
                  {chat.role === "user" ? (
                    <UserMessage>
                      <p>{chat.content}</p>
                    </UserMessage>
                  ) : (
                    <BotMessage>
                      <p dangerouslySetInnerHTML={{ __html: formatMessage(chat.content) }} />
                      <div className="flex items-center justify-items-center gap-2">
                        <img src={IMAGES.nobibot} alt="" width="24px" />
                        <span className="text-xs text-gray-400">NobiBot</span>
                      </div>
                    </BotMessage>
                  )}
                </div>
              ))
            : ""}
          {isTyping && (
            <div className="new-message">
              <BotMessage>
                <p dangerouslySetInnerHTML={{ __html: formatMessage(displayedBotMessage) }} />
                <Lottie animationData={can_pulse} style={{ width: '48px', height: '48px' }} />
                <div className="flex items-center justify-items-center gap-2">
                  <img src={IMAGES.nobibot} alt="" width="24px" />
                  <span className="text-xs text-gray-400">NobiBot</span>
                </div>
              </BotMessage>
            </div>
          )}
        </MessageContainer>
        <ChatInputWrapper>
          <ChatInput>
            <form action="" onSubmit={(e) => chat(e, message)}>
              <Plus size={20} className="text-gray-400" />
              <input
                type="text"
                name="message"
                value={message}
                placeholder="Ask anything"
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit">
                <img 
                  src={IMAGES.send} 
                  alt="Send message" 
                  width="48px" 
                  height="48px"
                  className={`transition-all duration-200 ${!message ? 'grayscale' : ''}`}
                />
              </button>
            </form>
          </ChatInput>
        </ChatInputWrapper>
      </ChatWrapper>
    </>
  );
}

export default Chatbot;
