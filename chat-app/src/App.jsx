import React, { useState } from "react";

const users = ["Alan", "Bob", "Carol", "Dean", "Elin"];

function App() {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");

  function sendMessage(event) {
    event.preventDefault();
    const text = draft.trim();

    if (!text) {
      return;
    }

    const user = users[Math.floor(Math.random() * users.length)];
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: `${Date.now()}-${Math.random()}`,
        user,
        text,
        sentAt: new Date(),
        likes: 0,
      },
    ]);
    setDraft("");
  }

  function likeMessage(messageId) {
    setMessages((currentMessages) =>
      currentMessages.map((message) =>
        message.id === messageId
          ? { ...message, likes: message.likes + 1 }
          : message,
      ),
    );
  }

  return (
    <main className="page">
      <section className="chat" aria-labelledby="chat-title">
        <header className="chat-header">
          <div className="header-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M4.5 18.5V6.75A2.25 2.25 0 0 1 6.75 4.5h10.5A2.25 2.25 0 0 1 19.5 6.75v7.5a2.25 2.25 0 0 1-2.25 2.25H9l-4.5 2Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <path
                d="M8 9h8M8 12.5h5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <p className="eyebrow">YOUR SPACE TO CONNECT</p>
            <h1 id="chat-title">Team chat</h1>
          </div>
          <div className="online-indicator">
            <span className="online-dot" />
            Chat is open
          </div>
        </header>

        <div
          className={`message-thread${messages.length ? " has-messages" : ""}`}
          aria-live="polite"
          aria-relevant="additions"
        >
          {messages.length === 0 ? (
            <div className="empty-state">
              <div className="empty-illustration" aria-hidden="true">
                <span className="sparkle sparkle-one">✦</span>
                <span className="sparkle sparkle-two">✧</span>
                <div className="empty-bubble">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <h2>Start the conversation</h2>
              <p>Your team is here. Send the first message!</p>
            </div>
          ) : (
            messages.map((message) => (
              <article className="message" key={message.id}>
                <div
                  className={`avatar avatar-${message.user.toLowerCase()}`}
                  aria-hidden="true"
                >
                  {message.user.charAt(0)}
                </div>
                <div className="message-content">
                  <div className="message-meta">
                    <span className="message-author">{message.user}</span>
                    <time dateTime={message.sentAt.toISOString()}>
                      {message.sentAt.toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </time>
                  </div>
                  <div className="message-row">
                    <p className="message-bubble">{message.text}</p>
                    <button
                      className="like-button"
                      type="button"
                      aria-label={`Like ${message.user}'s message`}
                      onClick={() => likeMessage(message.id)}
                    >
                      <span aria-hidden="true">♡</span>
                      <span>{message.likes}</span>
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <form className="composer" onSubmit={sendMessage}>
          <label className="sr-only" htmlFor="message-input">
            Write a message
          </label>
          <textarea
            id="message-input"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                event.currentTarget.form.requestSubmit();
              }
            }}
            placeholder="Write a message..."
            rows={1}
          />
          <div className="composer-footer">
            <span className="composer-hint">Press Enter to send · Shift + Enter for a new line</span>
            <button className="send-button" type="submit" disabled={!draft.trim()}>
              <span>Send message</span>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M3.5 10h12m-5-5 5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </form>
        <footer className="chat-footer">
          <span className="footer-mark" aria-hidden="true">✳</span>
          A little kindness goes a long way
        </footer>
      </section>
    </main>
  );
}

export default App;
