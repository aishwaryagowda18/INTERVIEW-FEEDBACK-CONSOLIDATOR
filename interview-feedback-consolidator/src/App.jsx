import { useState, useEffect } from 'react'

import Header from './components/Header'
import StepIndicator from './components/StepIndicator'
import CandidateForm from './components/CandidateForm'
import InterviewerForm from './components/InterviewerForm'
import LoadingScreen from './components/LoadingScreen'
import ResultReport from './components/ResultReport'
import HomePage from './components/HomePage'

import { useAssessment } from './hooks/useAssessment'


export default function App(){

const [showHome,setShowHome]=useState(true)



const {

step,
setStep,

candidate,
updateCandidate,

interviewers,
updateInterviewer,
addInterviewer,
removeInterviewer,

activeIdx,
setActiveIdx,

loading,
result,
error,

filledCount,
isFilled,

runAnalysis,
reset,

}=useAssessment()



const [history,setHistory]=useState(

JSON.parse(
localStorage.getItem(
"assessmentHistory"
)

)||[]

)



const [selectedReport,
setSelectedReport]=useState(

JSON.parse(
localStorage.getItem(
"selectedReport"
)

)||null

)



/* SAVE HISTORY */

useEffect(()=>{

if(!result) return

const latest=history[0]


if(

latest &&

latest.candidate?.name===candidate?.name &&

latest.result?.finalRecommendation===
result?.finalRecommendation

){

return

}


const newHistory=[

{

id:Date.now(),

candidate,

interviewers,

result,

date:new Date()
.toLocaleString()

},

...history

]


setHistory(newHistory)

localStorage.setItem(

"assessmentHistory",

JSON.stringify(newHistory)

)

},[result])




/* BACK BUTTON SUPPORT */

useEffect(()=>{

window.history.pushState(
{page:showHome ? "home":"app"},
""
)

const handleBack=()=>{

setShowHome(true)

}

window.addEventListener(
"popstate",
handleBack
)

return ()=>{

window.removeEventListener(
"popstate",
handleBack
)

}

},[showHome])




/* HOME PAGE */

if(showHome){

return(

<HomePage

onStart={()=>{

window.history.pushState(
{page:"app"},
""
)

setShowHome(false)

}}

 />

)

}




return(

<>

<Header/>


<div className="main">


<div className="hero">

<div className="hero-eyebrow">

AI-Powered Hiring Tool

</div>


<h1>

Interview Feedback
<br/>

Consolidator

</h1>


<p>

Collect structured feedback
from 2–4 interviewers
and generate a consolidated
hiring recommendation powered
by AI.

</p>

</div>



<StepIndicator

step={step}
setStep={setStep}

/>



{loading && (

<LoadingScreen
count={interviewers.length}
/>

)}



{

!loading &&
step===1 && (

<CandidateForm

candidate={candidate}

updateCandidate={
updateCandidate
}

onNext={()=>
setStep(2)
}

/>

)

}



{

!loading &&
step===2 && (

<InterviewerForm

interviewers={interviewers}

activeIdx={activeIdx}

setActiveIdx={setActiveIdx}

updateInterviewer={
updateInterviewer
}

addInterviewer={addInterviewer}

removeInterviewer={
removeInterviewer
}

isFilled={isFilled}

filledCount={filledCount}

onBack={()=>
setStep(1)
}

onAnalyze={
runAnalysis
}

error={error}

/>

)

}




{

!loading &&
step===4 &&
(result || selectedReport)

&& (

<ResultReport

result={
selectedReport?.result
||
result
}

candidate={
selectedReport?.candidate
||
candidate
}

interviewers={
selectedReport?.interviewers
||
interviewers
}



onEdit={()=>
setStep(2)
}



onReset={()=>{

localStorage.removeItem(
"selectedReport"
)

setSelectedReport(
null
)

reset()

setShowHome(true)

}}

/>

)

}





{

history.length>0 && (

<div
style={{
marginTop:"50px"
}}
>

<h2>

Previous Assessments

</h2>


{

history.map(item=>(

<div

key={item.id}

style={{

padding:"15px",

border:
"1px solid #ddd",

marginBottom:
"10px",

borderRadius:
"10px"

}}

>

<h3>

{
item.candidate?.name
}

</h3>


<p>

{
item.date
}

</p>


<p>

Recommendation:

{
item.result
?.finalRecommendation
}

</p>



<button

onClick={()=>{

localStorage.setItem(

"selectedReport",

JSON.stringify(item)

)

setSelectedReport(item)

setStep(4)

}}

>

Open Report

</button>

</div>

))

}

</div>

)

}



</div>

</>

)

}