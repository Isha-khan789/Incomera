export default function Rvwwrap() {
  return (
    <>
<div className="rvw" id="rvwWrap" aria-hidden="true">
  <div className="rvw__bd" data-rvw-close=""></div>
  <div className="rvw__box" role="dialog" aria-modal="true" aria-label="Client reviews">

    <div className="rvw__stage">
      <div className="plr" id="rvwPlayer">
        <video className="plr__vid" id="rvwVid" playsInline="" webkit-playsinline="" preload="auto"></video>
        <span className="plr__grain" aria-hidden="true"></span>

        {/* one segment per film, laid over the top of the picture */}
        <div className="rvw__seg" id="rvwSeg"></div>

        {/* who is speaking, over the picture */}
        <div className="rvw__top">
          <span className="rvw__who">
            <span className="rvw__av" id="rvwAv" aria-hidden="true">FS</span>
            <span className="rvw__wt"><b id="rvwWho">&mdash;</b><span id="rvwRole">&mdash;</span></span>
          </span>
          <span className="rvw__count" id="rvwCount">01 / 05</span>
          <button className="rvw__x" type="button" data-rvw-close="" aria-label="Close">&#10005;</button>
        </div>

        <button className="plr__side plr__side--prev" type="button" data-rvw-prev="" aria-label="Previous film">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.3 5l-9 7 9 7z" /><rect x="5.7" y="5" width="2.2" height="14" rx="1" /></svg>
        </button>
        <button className="plr__side plr__side--next" type="button" data-rvw-next="" aria-label="Next film">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.7 5l9 7-9 7z" /><rect x="16.1" y="5" width="2.2" height="14" rx="1" /></svg>
        </button>

        <div className="plr__idle">
          <button className="plr__go" type="button" id="rvwGo" aria-label="Play film">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
          </button>
        </div>

        {/* what they said and what it moved, until the film starts */}
        <div className="rvw__brief">
          <blockquote className="rvw__quote" id="rvwQuote"></blockquote>
          <div className="rvw__facts" id="rvwFacts"></div>
        </div>

        <p className="plr__cap" id="rvwCap"></p>

        {/* transport, along the foot of the picture */}
        <div className="rvw__bar">
          <button className="plr__toggle" type="button" data-rvw-play="" aria-label="Play or pause">
            <svg className="ic-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
            <svg className="ic-pause" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
          </button>
          <button className="plr__snd" type="button" data-rvw-mute="" aria-label="Sound on or off">
            <svg className="ic-on" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="M16.5 8.5a5 5 0 0 1 0 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            <svg className="ic-off" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="M16.5 9.5l5 5M21.5 9.5l-5 5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" /></svg>
          </button>
          <em className="plr__t" id="rvwTime">0:00</em>
        </div>
      </div>
    </div>

    {/* the other films, as a strip under the picture */}
    <div className="rvw__rail">
      <div className="rvw__list" id="rvwList"></div>
    </div>

  </div>
</div>
    </>
  );
}
