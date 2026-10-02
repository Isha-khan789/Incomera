export default function Chatw() {
  return (
    <>
<div className="chatw" id="chatw">
  <div className="chatw__panel" id="chatPanel" role="dialog" aria-label="Chat with Incomera" aria-hidden="true">
    <div className="chatw__hd">
      <span className="chatw__av">RM<i></i></span>
      <div className="chatw__who">
        <b>Rana M.</b>
        <span id="chatStatus">Income operator &middot; online now</span>
      </div>
      <button className="chatw__min" type="button" id="chatMin" aria-label="Minimise chat">
        <svg viewBox="0 0 24 24"><path d="M6 12h12" /></svg>
      </button>
    </div>

    <div className="chatw__log" id="chatLog"></div>

    <div className="chatw__chips" id="chatChips"></div>

    <div className="chatw__foot">
      <div className="chatw__in">
        <textarea id="chatInput" rows="1" placeholder="Ask us anything\u2026" aria-label="Message"></textarea>
        <button className="chatw__send" id="chatSend" type="button" aria-label="Send">
          <svg viewBox="0 0 24 24"><path d="M4 12l16-8-6 8 6 8-16-8z" /></svg>
        </button>
      </div>
      <p className="chatw__legal">Answered by <b>Incomera</b> &middot; a person joins if it needs one</p>
    </div>
  </div>

  <div className="chatw__teaser" id="chatTeaser">
    <button className="chatw__tx" type="button" id="chatTx" aria-label="Dismiss">&#10005;</button>
    <b>Quick question?</b>
    Tell me which end of your revenue is leaking and I will tell you what we would build.
  </div>

  <button className="chatw__btn" id="chatBtn" type="button" aria-label="Open chat" aria-expanded="false">
    <span className="chatw__ring"></span>
    <svg className="chatw__ico chatw__ico--c" viewBox="0 0 24 24">
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.6 9.6 0 0 1-2.6-.4L4 21l1.6-4.2A8.2 8.2 0 0 1 3 11.5a8.4 8.4 0 0 1 9-8.4 8.4 8.4 0 0 1 9 8.4z" />
      <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" strokeWidth="2.4" />
    </svg>
    <svg className="chatw__ico chatw__ico--x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></svg>
    <span className="chatw__dot" id="chatDot">1</span>
  </button>
</div>
    </>
  );
}
