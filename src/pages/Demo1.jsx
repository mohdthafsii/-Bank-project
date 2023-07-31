import React from "react";
import Qdata from "./Que";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./request.css";
import data from "./Data";

function Request() {
  const localsavedquestions = JSON.parse(localStorage.getItem("data"));
  const formdata = {
    BranchCode: "",
    BranchName: "",
    CustomerName: "",
    CustomerAccountnumber: "",
    CustomerAccountType: "",
  };

  const [questions, setQuestion] = useState(
    localsavedquestions ? localsavedquestions : Qdata
  );
  const [prop, setProp] = useState(false);
  const [bank, setBank] = useState(formdata);
  const [button,setbutton]=useState(false)
  const [pro,setpro]=useState(false)
   const [todo,settodo]=useState('')
   const [todos,settodos]=useState([])
 
   const handlesubmit=(e)=>{
    e.preventDefault();
}
const addtodo=()=>{
    settodos([...todos,todo])

}
const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    settodos(updatedTodos);
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("itemss"));
    if (storedData) {
      setBank(storedData);
      setbutton(JSON.parse(localStorage.getItem('procee')))
    }
  }, []);
  function procee(){
    setpro(true)
  }
  const handleAnswerChange = (index, selectanswer) => {
    if (index < questions.length) {
      if (questions[index].answer === selectanswer) {
        if (index === questions.length - 1) {
          setProp(true);

        }
        const updated = [...questions];
        updated[index].answers = selectanswer;

        if (updated[index + 1]) {
          updated[index + 1].isVisible = true;
        }
        setQuestion(updated);
      }
      else{
        alert("Not correct")
      }
    }
    console.log(questions);
  };
  function handleSubmit() {
    localStorage.setItem("itemss", JSON.stringify(bank));
    
    alert("Data uploaded successfully!");
    window.location.reload();
    console.log(bank);
    localStorage.setItem('procee','true')
    localStorage.setItem("data", JSON.stringify(questions));
    
  }
  const handle = (e) => {
    const { value, name } = e.target;
    setBank((darft) => ({ ...darft, [name]: value }));
    console.log(e);
  };

  const filterData = data.filter(
    (Ac) => bank.CustomerAccountnumber === Ac.customeraccountnumber
  );

  return (
    <div className="tt">
      <div className="reform">
      <h1 className="req">REQUEST FORM</h1></div>
      <div className="item">
        <Link to={"/"} className="da">
          DASHBOARD
        </Link>
        <p> / REQUEST FORM</p>
      </div>
      <div className="main">
        <div className="code">
          <label>Branch code*</label>
          <input
            name="BranchCode"
            placeholder="Branch Code"
            type="text"
            className="reqinp"
            value={bank.BranchCode}
            onChange={(e) => handle(e)}
          />
        </div>
        <div className="name">
          <label>Branch Name*</label>
          <input
            name="BranchName"
            placeholder="Branch Name"
            type="text"
            className="reqinp"
            value={bank.BranchName}
            onChange={(e) => handle(e)}
          />
        </div>
        <div className="customer">
          <label>Customer Name*</label>
          <input
            name="CustomerName"
            placeholder="Customer Name"
            type="text"
            className="reqinp"
            value={bank.CustomerName}
            onChange={(e) => handle(e)}
          />
        </div>
        <div className="acc">
          <label>Customer Account number*</label>
          <input
            name="CustomerAccountnumber"
            placeholder="Customer Account number"
            type="number"
            className="reqinp"
            value={bank.CustomerAccountnumber}
            onChange={(e) => handle(e)}
          />
        </div>
        <div className="type">
          <label>Customer Account type*</label>
          <select
            name="CustomerAccountType"
            className="re"
            value={bank.CustomerAccountType}
            onChange={(e) => handle(e)}
          >
            <option>--select---</option>
            <option>ssss</option>
          </select>
        </div>
        <div className="innertable">
          {filterData.length > 0 && (
            <div className="con1">
              <h2 className="font">Previous Approved Compensation Claims</h2>
              <table className="table2" border={1}>
                <thead>
                  <th className="rth">Requested On</th>
                  <th className="rth">Compensation amount(Rs.)</th>
                  <th className="rth">Reason for compensation</th>
                  <th className="rth">Approved On</th>
                </thead>
                <tbody>
                  {filterData.map((obj) => (
                    <tr key={obj.customeraccountnumber}>
                      <td className="rtd">{obj.requestedOn}</td>
                      <td className="rtd">{obj.compensation}</td>
                      <td className="rtd">{obj.reason}</td>
                      <td className="rtd">{obj.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {questions.map((question, test) => {
          // console.log(question);
          return (
            <div className="que1" key={test}>
              {question.isVisible && (
                <div key={test} className="que">
                  <p>{question.text}</p>
                  <div className="ans">
                    <div className="one">
                      <label>
                        <input
                          
                          type="radio"
                          // value='yes'
                          checked={question.answers}
                          onChange={() => handleAnswerChange(test, true)}
                        />
                        Yes
                      </label>
                    </div>
                    <div className="two">
                      <label>
                        <input
                          
                          type="radio"
                          checked={
                            question.answers != null ? !question.answers : null
                          }
                          onChange={() => handleAnswerChange(test, false)}
                        />
                        No
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {prop && (
          <div className="file">
            <label>Please upload your compensation letter</label>
            <div className="inp">
              <div className="ss">
                <input type="file" className="uploadfile"/>
              </div>
              <button className="submit-button" onClick={handleSubmit}>
                Submit
              </button>
            </div>
            <ul>
              <li className="move">Upload a maximum of live files</li>
              <li className="move">Each with a minimum size of 2 MP</li>
              <li className="move">Allowed file types of doc,pdf and exel</li>
            </ul>
          </div>
        )}
         <div className="pro">
          {button &&(
          <button className='btn' onClick={procee}>Proceed</button>
          
          )}
          </div>
      </div>
      {pro &&(
           <div className="div">
            <div className="hh">
            <label>Date of complaint</label>
             <input type="date" className='ii'/></div>
             <div className="hh">
             <label>Date of occurance of incident</label>
             <input type="date" className='ii'/></div>
             <div className="hh">
             <label>Date of identification of incident</label>
             <input type="date" className='ii'/></div>
             <div className="hh">
             <label>debit GL a/c</label>
             <input placeholder="516141108" type="number" className='ii'/></div>
             <div className="hh">
             <label>Brief description about the incident</label>
             <input placeholder="Brief description of the incident" type="text"className='ii br' /></div>
             <div className="hh">
             <label>Reason for compensation</label>
             <input type="text" className='ii br'/></div>
             <div className="hh">
             <label>Compensation claimed (Rs.)</label>
             <input type="number" className='ii' /></div>
             <div className="hh">
             <label>Attachment</label>
             <div className="sss">
             <input type="file"  className='ii'/></div></div>
             <div className="hh">
             <label>Recommended name</label>
             <form className="kk" onSubmit={handlesubmit}><input  type="text" value={todo}    className='ii iii' onChange={(event)=>settodo(event.target.value)}/>
              <button className="btnkk" onClick={addtodo}>add</button></form>
              <ul>
         {
       todos.map((obj,index)=>(
        <div className="list" key={index}>
        <li>{obj}</li>
        <button className='btndlt' onClick={() => deleteTodo(index)}>
              Delete
            </button>
            

        </div>
       ))

}

      </ul>
              </div>
           </div>
          )}
          <div className="mm"></div>
    </div>
  );
}
export default Request;