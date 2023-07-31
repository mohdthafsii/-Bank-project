
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import Report from './pages/Report';
import Request from './pages/Request';
// import Demo1 from './pages/Demo1';

function App() {
  return (
    <div>
      
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<Layout/>}>
          <Route index  element={<Dashboard/>}/>
          <Route path='/rpt' element={<Report/>}/>
          <Route path='/rqt' element={<Request/>}/>

        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
