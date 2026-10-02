export default function Faq() {
  return (
    <>
<section className="sec wrap faq" id="faq">
  <div className="faq__hd reveal">
    <div>
      <span className="eyebrow">Questions</span>
      <h2>The things everyone asks before they start.</h2>
    </div>
    
  </div>

  <div className="faq__list">
    <details className="faq__i reveal" open="">
      <summary><span>What exactly am I paying for?</span><i></i></summary>
      <div className="faq__a"><p>One setup fee that covers the whole build: the proposal, the engine itself, the training on your offer, and the launch. There is no monthly retainer and no contract to sign — once it is live, the engine is yours.</p></div>
    </details>

    <details className="faq__i reveal">
      <summary><span>Do I have to move off my CRM or buy new tools?</span><i></i></summary>
      <div className="faq__a"><p>No. The engine is built inside what you already pay for — HubSpot, Salesforce, Pipedrive, Gmail, Outlook, your calendar, your billing. No migration, no new seats, and nothing new for your team to learn. If a gap needs a tool you do not have, we tell you before we build, not after.</p></div>
    </details>

    <details className="faq__i reveal">
      <summary><span>Is this just AI sending mass emails?</span><i></i></summary>
      <div className="faq__a"><p>No. Volume is the easy part and the part that gets you blocked. The work is in sourcing and verifying the right accounts, qualifying replies against your rules, timing the ask, and protecting deliverability — domains, warming, sending limits. A named operator watches all of it. The automation does the repetition; the judgement is configured, reviewed and tuned by a person.</p></div>
    </details>

    <details className="faq__i reveal">
      <summary><span>How soon does it actually produce something?</span><i></i></summary>
      <div className="faq__a"><p>Go-live is day 30. Most clients see their first engine-booked meeting inside the first week after that. Subscription engines take longer to read properly — trial cohorts need a cycle or two before the numbers mean anything, so we report on the first full cohort rather than week one.</p></div>
    </details>

    <details className="faq__i reveal">
      <summary><span>Which engine should I pick?</span><i></i></summary>
      <div className="faq__a"><p>If your problem is an empty calendar, take Acquisition. If people already sign up and the trouble is getting them to pay and keep paying, take Monetisation. If you genuinely have both, say so in the proposal and we will price them together rather than selling you two builds.</p></div>
    </details>

    <details className="faq__i reveal">
      <summary><span>What do you need from us during the build?</span><i></i></summary>
      <div className="faq__a"><p>Roughly four hours across thirty days. A proposal call, access to the tools, a session on your offer and objections, and one approval on the copy and the rules before we launch. After that you review the numbers.</p></div>
    </details>

    <details className="faq__i reveal">
      <summary><span>Who owns the data and the setup?</span><i></i></summary>
      <div className="faq__a"><p>You do. Domains, sequences, lists, records and reporting all live in your accounts under your billing. If you stop working with us, nothing is switched off and nothing gets taken back.</p></div>
    </details>

    <details className="faq__i reveal">
      <summary><span>What if it does not work?</span><i></i></summary>
      <div className="faq__a"><p>The proposal sets a baseline before anything is built, so there is a number to judge it against rather than a feeling. Maintenance is month to month and you can stop it at any point. We would rather tell you in the proposal that the engine is not what your numbers justify than sell you a build that will not move them.</p></div>
    </details>
  </div>
</section>
    </>
  );
}
