import { useState } from "react";

function Form({ getData }) {
  // eslint-disable-next-line
  const [weight, setWeight] = useState("");
  // eslint-disable-next-line
  const [height, setHeight] = useState("");
  // eslint-disable-next-line
  const [alert, setalert] = useState(false);
 const [change, setChange] = useState(false)
  const onSubmit = (e) => {
    e.preventDefault(); //to prevent refresh while submiting form
    
    if (isNaN(weight) || isNaN(height)) {
      setalert(true);
      
    } else {
      setalert(false);
      let num = parseInt(height)

      if(num>5){
        setChange(true)
        if(change){
          let a = height/100;
          let b = a.toString();     
          
          getData(weight, b);
          setWeight("");
          setHeight("");
        }
      }else{
      
        console.log(height)
        getData(weight, height);
        setWeight("");
        setHeight("");
    }
     
    }

  };



  return (
    <>
      <div className="col-sm-4 shadow rounded px-5">
        <h1 className="text-center pt-3 text-secondary h2">BMI Calculator</h1>
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="col col-sm-6">
              <div className="my-3">
                <label className="form-label">Weight(kg) :</label>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="col col-sm-6">
              <div className="my-3">
              <label className="form-label">Height m or cm</label> 
              
                <input
                  type="text"
                  value={height}
                  
                  onChange={(e) => setHeight(e.target.value)}
                  
                  className="form-control"
                  required
                />
              </div>
            </div>
          </div>
          <input
            type="submit"
            className="btn btn-primary my-3"
            value="Get BMI"
          />
        </form>
        {alert === true ? (
          <div className="alert alert-danger" role="alert">
            Plz Enter vaild data
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Form;
