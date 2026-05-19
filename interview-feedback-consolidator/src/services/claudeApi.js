export async function consolidateFeedback(
candidate,
interviewers
) {

const feedbackText =
interviewers.map((iv,i)=>`

Interviewer ${i+1}:
${iv.name || 'Unnamed'}

(${iv.role || 'Unknown'})

Round:
${iv.round || 'General'}

Rating:
${iv.rating}/10

Technical Skills:
${iv.technicalSkills ||
'Not provided'}

Problem Solving:
${iv.problemSolving ||
'Not provided'}

Communication:
${iv.communication ||
'Not provided'}

Cultural Fit:
${iv.culturalFit ||
'Not provided'}

Overall Impression:
${iv.overallImpression ||
'Not provided'}

Recommendation:
${iv.recommendation ||
'Not provided'}

`).join('\n---\n')


const prompt = `

You are a senior HR analyst.

Candidate:

${candidate.name}

Role:

${candidate.role}

Level:

${candidate.level}

Department:

${candidate.department}


INTERVIEWER FEEDBACK:

${feedbackText}


Return ONLY valid JSON:

{

"hiringScore":<1-10>,

"finalRecommendation":
"<Strong Hire|Hire|Hold|No Hire>",

"recommendationRationale":"",

"interviewerAlignment":
"<High|Moderate|Low>",

"alignmentScore":
<0-100>,

"alignmentNotes":"",

"summary":"",

"strengths":[
{"point":"","frequency":""}
],

"concerns":[
{"point":"","severity":""}
],

"riskAreas":[
{"area":"",
"description":""}
],

"nextRoundFocus":[
{
"area":"",
"suggestedQuestion":""
}
]

}

`


/* ---------- Backend Call ---------- */

const response =
await fetch(

"http://127.0.0.1:8000/analyze",

{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({
prompt
})

}

)


if(!response.ok){

const err =
await response.json()
.catch(()=>({}))

throw new Error(

err?.detail ||

"Backend Error"

)

}


const data =
await response.json()


const raw =

data?.choices?.[0]
?.message?.content || ""


/* ---------- JSON Parse ---------- */

const clean =
raw
.replace(/```json/g,"")
.replace(/```/g,"")
.trim()


try{

const parsed =
JSON.parse(clean)


/* ---- Save History ---- */

const history =

JSON.parse(

localStorage.getItem(
"history"
)

)||[]


history.unshift({

candidate,

result:parsed,

createdAt:
new Date()
.toLocaleString()

})


localStorage.setItem(

"history",

JSON.stringify(
history
)

)


return parsed

}


catch{

console.log(clean)

throw new Error(

"Failed to parse AI response"

)

}

}