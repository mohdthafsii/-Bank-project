
import { useEffect, useState } from 'react';
import './Request.css';
import { Link } from 'react-router-dom';
import Array from './Data';
import quest from './Qsdata';
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
    localsavedquestions ? localsavedquestions : quest
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

  const filterData = Array.filter(
    (Ac) => bank.CustomerAccountnumber === Ac.customeraccountnumber
  );
  return (
    <div className='rqt'>
       <div className='rqtbar'>
        <h1 className='bardash'>|</h1><h2>REQUEST FORM</h2>
       </div>
       <div className='rqtdash'>
          <Link to={'/'}> <h4>DASHBOARD</h4></Link> <h4>/</h4> <h4>REQUEST FORM</h4>
       </div>
      <div className='dashbox'>
    <div className='leftinputs'>
          <div className='col1'>
          <label htmlFor="">Branch Code *</label>
          <input type="text" name="" id="" value={bank.BranchCode} placeholder='Branch Code'  onChange={(e) => handle(e)} />
          </div>

          <div className='col1'>
          <label htmlFor="">Branch Name *</label>
          <input type="text" name="" id="" value={bank.BranchName} placeholder='Branch Name' onChange={(e) => handle(e)}/>
          </div>

          <div className='col1'>
          <label htmlFor="">Customer Name *</label>
          <input type="text" name="" id="" value={bank.CustomerName} placeholder='Customer Name'  onChange={(e) => handle(e)} />
          </div>


          <div className='col1'>
          <label htmlFor="">Customer Account Number *</label>
          <input type='number' name="" id="" value={bank.CustomerAccountnumber} placeholder='Customer Account Number'  onChange={(e) => handle(e)}/>
          </div>

          <div className='selection'>
          <label htmlFor="">Customer Account Type *</label>
          <select name="" value={bank.CustomerAccountType} id="accounttype"  onChange={(e) =>handle(e)}>
            <option value="--select--">--select--</option>
            <option value="SA">SA</option>
            <option value="CA">CA</option>
            <option value="SA-NRE">SA-NRE</option>
            <option value="SA-NRO">SA-NRO</option>
          </select> 

          </div>
          
             
      </div>
      <div className="innertable">
        {filterData.length>0 && (
          <div className="con1"> 
            <h3 className='previous'>Previous approved compensation claims</h3>
            <table className='table2' border={1}>
              <thead>
                <th className='rth'>Requested On</th>
                <th className='rth'>Compensation amount(Rs.)</th>
                <th className='rth'>Reason for compensation</th>
                <th className='rth'>Approved On</th>
              </thead>
              <tbody>
              {filterData.map((obj)=>(
                <tr key={obj.customeraccountnumber}>
                  <td className='rtd'>{obj.requestedOn}</td>
                  <td className='rtd'>{obj.compensation}</td>
                  <td className='rtd'>{obj.reason}</td>
                 <td className='rtd'>{obj.status}</td>
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
            <div className="qs" key={test}>
              {question.isVisible && (
                <div key={test} className="que">
                  <p>{question.text}</p>
                  <div className="yesorno">
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
            <div className='innerfile'>
            <label className='pl'>Please upload your compensation letter</label>
            <div className="inp">
              <div className="choosefile">
                <input type="file" className="inputfile"/>
              </div>
              <button className="upload" onClick={handleSubmit}>
                Submit
              </button>
            </div>
            <ul className='uplist'>
              <li className="move">Upload a maximum of live files</li>
              <li className="move">Each with a minimum size of 2 MP</li>
              <li className="move">Allowed file types of doc,pdf and exel</li>
            </ul>
            </div>
          </div>
        )}
         <div className="pro">
          {button &&(
          <button className='procebtn' onClick={procee}>Proceed</button>
          
          )}
          </div>
      </div>
       
        {pro &&(
        <div className="div">
          <div className="hh">
            <label>Date of complaint</label>
             <input type="date" className='ii'/>
          </div>
          <div className="hh">
             <label>Date of occurance of incident</label>
             <input type="date" className='ii'/>
          </div>
          <div className="hh">
             <label>Date of identification of incident</label>
             <input type="date" className='ii'/>
          </div>
          <div className="hh">
             <label>debit GL a/c</label>
             <input type="number" className='ii'/>
          </div>
          <div className="hh">
             <label>Brief description about the incident</label>
             <input type="text"className='ii br' />
          </div>
          <div className="hh">
             <label>Reason for compensation</label>
             <input type="text" className='ii br'/>
          </div>
          <div className="hh">
             <label>Compensation claimed (Rs.)</label>
             <input type="number" className='ii' />
          </div>
          <div className="hh">
             <label>Attachment</label>
             <div className="ss">
             <input type="file" className='ii'/>
             </div>
          </div>
          <div className="hh">
             <label>Recommended name</label>
             <form action="" onSubmit={handleSubmit}><input type="text" value={todo} onChange={(event)=>settodo(event.target.value)} className='ii' /><button className="btnkk" onClick={addtodo}>add</button>
             </form>

             <ul>
               {
                 todos.map((obj,index)=>(
                  <div className="list" key={index}>
                   <li>{obj}</li>
                   <button className='btndlt' onClick={() => deleteTodo(index)}>Delete</button>
                   </div>
                  ))}
              </ul>
          </div>

        </div>
        )} 
      <hr className='hr2'/>
``
    </div>
  )
}

export default Request
