function verdictClass(v = '') {
  const lv = v.toLowerCase()

  if (lv.includes('strong hire') || lv === 'hire')
    return 'verdict-hire'

  if (lv.includes('no hire') || lv.includes('reject'))
    return 'verdict-nohire'

  if (lv.includes('hold') || lv.includes('defer'))
    return 'verdict-hold'

  return 'verdict-maybe'
}

function SeverityTag({ sev }) {
  const map = {
    High: 'tag-red',
    Medium: 'tag-amber',
    Low: 'tag-blue'
  }

  return (
    <span
      className={`tag item-badge ${map[sev] || 'tag-gray'}`}
    >
      {sev}
    </span>
  )
}

export default function ResultReport({
  result,
  candidate,
  interviewers,
  onEdit,
  onReset
}) {



  const r = result || {}

/* ==========================
   FORCE REAL SCORE
========================== */

const score =
interviewers.length > 0

? Math.round(

interviewers.reduce(
(sum, iv) =>
sum + Number(iv.rating || 0),
0
)

/

interviewers.length

)

: 0


/* ==========================
   FORCE RECOMMENDATION
========================== */

const recommendationList =
interviewers.map(
iv => iv.recommendation
  )
  

const finalRecommendation =

recommendationList.includes(
'Strong No Hire'
)

? 'Strong No Hire'

: recommendationList.includes(
'No Hire'
)

? 'No Hire'

: recommendationList.includes(
'Hire with Reservations'
)

? 'Hire with Reservations'

: recommendationList.filter(
rec => rec === 'Strong Hire'
).length >= 2

? 'Strong Hire'

: recommendationList.includes(
'Hire'
)

? 'Hire'

: 'Hold / Defer';


const circumference =
  2 * Math.PI * 30



  const dashOffset =
    circumference -
    (score / 10) *
    circumference

  const alignPct =
    Math.min(
      100,
      Math.max(
        0,
        Math.round(
          r.alignmentScore || 50
        )
      )
    )

  const vcls =
  verdictClass(
    finalRecommendation
  )

  return (

<>
{/* HERO */}

<div className="result-hero">

<div className="result-hero-label">
Consolidated Hiring Report
</div>


<div className="result-hero-name">
{candidate.name || 'Candidate'}
</div>


<div className="result-hero-meta">

{[
candidate.role,
candidate.level,
candidate.department

].filter(Boolean).join(' · ')}

{candidate.date &&
` · ${new Date(
candidate.date
).toLocaleDateString(
'en-IN',
{
day:'numeric',
month:'short',
year:'numeric'
}
)}`}

</div>



<div className="result-hero-bottom">

{/* SCORE */}

<div className="scoreSection">

<div className="score-ring">

<svg
width="78"
height="78"
viewBox="0 0 78 78"
>

<circle
cx="39"
cy="39"
r="30"
fill="none"
stroke="rgba(255,255,255,.1)"
strokeWidth="5"
/>

<circle
cx="39"
cy="39"
r="30"
fill="none"
stroke="#d4602a"
strokeWidth="5"
strokeLinecap="round"
strokeDasharray={circumference}
strokeDashoffset={dashOffset}
/>

</svg>

</div>


<div className="score-val">

<div className="score-num">

{score}/10

</div>


<div className={`verdict-chip ${vcls}`}>

{finalRecommendation}


</div>


<div className="score-note">

Based on
{interviewers.length}

interviewer

{
interviewers.length===1
?
' response'
:
' responses'
}

</div>

</div>

</div>

{/* Alignment */}

<div className="alignment-box">

<div className="align-label">

Panel Alignment —

{
r.interviewerAlignment
||
'Moderate'
}

</div>


<div className="align-track">

<div
className="align-fill"
style={{
width:
`${alignPct}%`
}}
/>

</div>


<div className="align-note">

{
r.alignmentNotes
||
''
}

</div>

</div>

</div>

</div>



{/* SUMMARY */}

<div
className="card"
style={{
marginBottom:
'1.25rem'
}}
>

<div className="card-title">

Executive Summary

</div>


<p
style={{
fontSize:14,
lineHeight:1.75
}}
>

{r.summary}

</p>


<div className="rec-box">

<div className="rec-box-label">

Recommendation Rationale

</div>

<p>

{
r.recommendationRationale
}

</p>

</div>

</div>



{/* Strengths + Concerns */}

<div className="result-grid">

<div className="card">

<div className="card-title">

<span className="tag tag-green">

Strengths

</span>

</div>


<div className="item-list">

{(r.strengths || [])
.map((s,i)=>(

<div
key={i}
className="item"
>

<div
className="item-dot item-dot-green"
/>

<div className="item-text">

{s.point}

{s.frequency && (

<>

<br/>

<span>

{s.frequency}

</span>

</>

)}

</div>

</div>

))}

</div>

</div>



<div className="card">

<div className="card-title">

<span className="tag tag-red">

Concerns

</span>

</div>


<div className="item-list">

{(r.concerns || [])
.map((c,i)=>(

<div
key={i}
className="item"
>

<div
className={`item-dot item-dot-${
c.severity === 'High'
?
'red'
:
c.severity === 'Medium'
?
'amber'
:
'blue'
}`}
/>


<div className="item-text">

{c.point}

</div>


<SeverityTag
sev={c.severity}
/>

</div>

))}

</div>

</div>

</div>



{/* Risk + Next */}

<div className="result-grid">

<div className="card">

<div className="card-title">

Risk Areas

</div>

{(r.riskAreas || [])
.map((rk,i)=>(

<div
key={i}
className="item"
>

{rk.area}

<br/>

{rk.description}

</div>

))}

</div>



<div className="card">

<div className="card-title">

Next Round Focus

</div>


{(r.nextRoundFocus || [])
.map((n,i)=>(

<div
key={i}
className="next-item"
style={{

background:"#f5f4f0",

padding:"24px",

borderRadius:"16px",

marginTop:"12px",

textAlign:"center"

}}
>

<div
style={{
marginBottom:"10px",
fontWeight:"500"
}}
>

{n.area}

</div>


<div>

"{n.suggestedQuestion}"

</div>

</div>

))}

</div>

</div>



{/* PANEL */}

<div className="card">

<div className="card-title">

Interviewer Panel Summary

</div>


{interviewers.map(
(iv,i)=>(

<div
key={iv.id}
className="panel-row"
>

<div>

<span>

{
iv.name ||
`Interviewer ${i+1}`
}

</span>

</div>


<div>

{
iv.rating &&
<span>

{iv.rating}/10

</span>
}


{
iv.recommendation &&

<span
className={`verdict-chip ${verdictClass(
iv.recommendation
)}`}
>

{
iv.recommendation
}

</span>

}

</div>

</div>

))}

</div>



{/* BUTTONS */}

<div className="result-actions">

<button
className="btn-ghost"
onClick={onEdit}
>

← Edit Feedback

</button>


<button
className="btn-primary"
onClick={onReset}
>

+ New Assessment

</button>


{/* ADDED DOWNLOAD REPORT */}

<button
className="btn-primary"
onClick={() =>
window.print()
}
>

Download Report

</button>

</div>


</>

)

}