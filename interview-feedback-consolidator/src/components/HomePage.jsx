import "./HomePage.css";

export default function HomePage({ onStart }) {

return(

<div className="home">

{/* Navbar */}

<nav className="navbar">

<div className="logoSection">

<span className="dot"></span>

<h1 className="logo">

HireInsight

</h1>

</div>


<button
className="startBtn"
onClick={onStart}
>

Interview Feedback Consolidator

</button>

</nav>



{/* Hero */}

<section className="heroSection">

<p className="subTitle">

AI-POWERED HIRING TOOL

</p>


<h1 className="mainTitle">

Interview Feedback
<br/>

Consolidator

</h1>


<p className="description">

Collect structured feedback from
2–4 interviewers and generate
AI powered hiring recommendations.

</p>


<button
  className="start-btn"
  onClick={onStart}
>
  Generate Hiring Insights →
</button>

</section>




{/* Feature Cards */}

<section className="cardContainer">

<div className="card">

<h2>

Collect Feedback

</h2>

<p>

Gather feedback from
2–4 interviewers

</p>

</div>



<div className="card">

<h2>

AI Analysis

</h2>

<p>

Summarize strengths,
concerns and risks

</p>

</div>



<div className="card">

<h2>

Recommendation

</h2>

<p>

Hire / Hold / Reject

</p>

</div>



<div className="card">

<h2>

Reports

</h2>

<p>

Download AI reports

</p>

</div>

</section>




{/* Bottom CTA */}

<section className="bottomSection">

<h2>

Ready to start assessment?

</h2>


<p className="bottomText">

Begin evaluating candidates with
AI-powered interview consolidation.

</p>


<button

className="bottomBtn"

onClick={onStart}

>

Get Started

</button>

</section>


</div>

)

}