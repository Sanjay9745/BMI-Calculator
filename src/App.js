import "./App.css";
import Form from "./Form";
import BmiList from "./BmiList";
import BmiScore from "./BmiScore";
import { useState } from "react";

function App() {
  const [show, setshow] = useState(false)
  const [changeWeight, setchangeWeight] = useState({weight: "",type:""})
  // eslint-disable-next-line
  const [bmi, setBmi] = useState("00");
  // eslint-disable-next-line
  const [bmiType, setBmiType] = useState("Not Calculated");
  const [bmiRange, setbmiRange] = useState({
    underWeight: {low: ""},
    normal: {low: "",high: ""},
    overWeight: {low: "",high: ""},
    obesityOne: {low: "",high: ""},
    obesityTwo: {low: "",high: ""},
    obesityThree: {high: ""}
  })

  const onFormSub = (w, h) => {
    let b = calBmi(w,h);
   
    setBmi(b);
  
    const bType = weightType(b)
    setBmiType(bType)
    const range ={
      underWeight: {low: calWeight(18.5,h)},
      normal: {low: calWeight(18.5,h),high: calWeight(24.9,h)},
      overWeight: {low: calWeight(25,h),high: calWeight(29.9,h)},
      obesityOne: {low: calWeight(30,h),high: calWeight(34.9,h)},
      obesityTwo: {low: calWeight(35,h),high: calWeight(39.9,h)},
      obesityThree: {high: calWeight(40,h)}
    }
    setbmiRange(range);
    setchangeWeight(weightChange(b,w,range))
    setshow(true)
  };
  const calBmi=(w,h)=>{
   
    return( w / (h * h)).toFixed(2); //tofixed for only one decimal point
  }
const calWeight = (b,h)=> (b*h*h).toFixed(2);

  const weightType = (bmi) =>{
    if(bmi<18.5){
      return "UnderWeight";
    }else if(18.5 < bmi && bmi <24.9){
      return "Normal"
    }
    else if(24.9 < bmi && bmi <29.9){
      return "Overweight"
    }
    else if(29.9 < bmi && bmi <34.9){
      return "Obesity Class I"
    }
    else if(34.9 < bmi && bmi <39.9){
      return "Obesity Class II"
    }
    else if( bmi >39.9){
      return "Obesity Class III"
    }
  }
const weightChange =(b,w,range)=>{
  let changeObj;
  if(b>24.9){
    changeObj ={
    weight : (w- range.normal.high).toFixed(2),
    type:"positive"
    }
    return changeObj;
  }else if(b < 18.5){
    changeObj ={
      weight : ( range.normal.low- w).toFixed(2),
      type:"negative"
      }
      return changeObj;
  }else{
    changeObj = {weight:0,type:"normal"}
    return changeObj;
  }
  
}


  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-5 mx-2">
          <Form getData={onFormSub} />
        </div>
        { show &&(
        <div className="row justify-content-center mt-5">
          <div className="col-12 col-sm-6 my-5">
            <BmiScore bmiNo={bmi} bmiName={bmiType} changeWeight={changeWeight}/>
          </div>
          <div className="col-12 col-sm-6">
            <BmiList range={bmiRange} bmi={bmi}/>
          </div>
        </div>
        )}
      </div>
    </>
  );
}

export default App;
