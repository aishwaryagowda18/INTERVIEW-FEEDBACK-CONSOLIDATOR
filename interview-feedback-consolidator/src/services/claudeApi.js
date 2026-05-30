export async function consolidateFeedback(
  candidate,
  interviewers
) {

  /* ==========================
     CALCULATE REAL SCORE
  ========================== */

  const ratings =
    interviewers.map(
      iv => Number(iv.rating || 0)
    )

  const averageRating =
    ratings.reduce(
      (a,b)=>a+b,
      0
    ) / ratings.length

  const hiringScore =
    Math.round(averageRating)


  /* ==========================
     CALCULATE RECOMMENDATION
  ========================== */

  const recommendations =
    interviewers.map(
      iv => iv.recommendation
    )

  let finalRecommendation =
    "Hold"

  if (
    recommendations.includes(
      "Strong No Hire"
    )
  ) {

    finalRecommendation =
      "Strong No Hire"

  }

  else if (

    recommendations.includes(
      "No Hire"
    )

  ) {

    finalRecommendation =
      "No Hire"
  }

  else if (

    recommendations.includes(
      "Hire with Reservations"
    )

  ) {

    finalRecommendation =
      "Hire with Reservations"
  }

  else if (

    recommendations.filter(
      r => r === "Strong Hire"
    ).length >= 2

  ) {

    finalRecommendation =
      "Strong Hire"
  }

  else if (

    recommendations.includes(
      "Hire"
    )

  ) {

    finalRecommendation =
      "Hire"
  }


  /* ==========================
     BUILD FEEDBACK TEXT
  ========================== */

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

IMPORTANT:
Use the exact recommendation and score below.

Hiring Score:
${hiringScore}/10

Final Recommendation:
${finalRecommendation}

Return ONLY valid JSON:

{

"hiringScore":
${hiringScore},

"finalRecommendation":
"${finalRecommendation}",

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
{
"area":"",
"description":""
}
],

"nextRoundFocus":[
{
"area":"",
"suggestedQuestion":""
}
]

}

`


  /* ==========================
     BACKEND CALL
  ========================== */

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


  /* ==========================
     JSON Parse
  ========================== */

  const clean =
  raw
  .replace(/```json/g,"")
  .replace(/```/g,"")
  .trim()


  try{

    const parsed =
    JSON.parse(clean)


    /* FORCE CORRECT VALUES */

    parsed.hiringScore =
      hiringScore

    parsed.finalRecommendation =
      finalRecommendation


    /* SAVE HISTORY */

    const history =

    JSON.parse(

      localStorage.getItem(
        "history"
      )

    ) || []


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