import './App.css';
import './bootstrap.css'
import { BrowserRouter, Redirect, Route, Link, Routes } from 'react-router-dom';
import { HomePage } from './Components/HomePage';
import { LoginForm } from './Components/LoginForm'
import Trylogin from './Components/Trylogin';
import { AllUsers } from './Components/AllUsers';
import { AllJudges } from './Components/AllJudges';
import { AllSingers } from './Components/AllSingers';
import { AllSongs } from './Components/AllSongs';
import { AllTypesPlan } from './Components/AllTypesPlan';
import { AllMessage } from './Components/AllMessage';
import { HomePageManager } from './Components/HomePageManager';
import { AllPlans } from './Components/AllPlans';
import Plans from './Components/Plans';
import GestMenue from './Components/GestMenue';
import ScrollableTabsButtonForce from './Components/Tabs';
import AlertPage from './Components/Alert';
import CustomizedSteppers from './Components/AllStepInPlans'
import AddOrUpdatePlan from './Components/AddOrUpdatePlan'
import Timer from './Components/Timer'
import { RgisterOrUpdateForm } from './Components/RgisterOrUpdateForm'
import MyModal from './Components/Modal'
import Raiting from './Components/Raiting'
import AuthForm from './Components/FormAuto'
import RecipeReviewCard from './Components/Plans'
import AllRaitings from './Components/AllRaitings'
import StepersAddUpdatePlan from './Components/StepersAddUpdatePlan'
import AddOrUpdateSteps from './Components/AddOrUpdateSteps'
import { SingerArea } from './Components/SingerArea';
import { UploadSong } from './Components/UploadSong';
import { Songs } from './Components/Songs';
import { AllRaitingsForSong } from './Components/AllRatingForSong';
import ShowRaiting from './Components/ShowRaiting'
import AddJudgesForCurrentPlan from "./Components/AddJudgesForCurrentPlan";
import { Area } from "./Components/Area";


function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <div className='allApp'>

        {/* <ShowRaiting></ShowRaiting> */}

        <BrowserRouter>
          <Routes>
            <Route path="/Nav" element={<ScrollableTabsButtonForce></ScrollableTabsButtonForce>} >
              <Route path="Plans" element={<RecipeReviewCard></RecipeReviewCard>}></Route>
              <Route path="MySongs/:idUser" element={<Songs></Songs>} ></Route>
              <Route path="SingerArea" element={<SingerArea></SingerArea>}></Route>
              <Route path="Area/:idUser" element={<Area></Area>}></Route>
              <Route path="AllRaitingsForSong/:idSong" element={<AllRaitingsForSong></AllRaitingsForSong>}></Route>
              
              <Route path="AllStepInPlans/:idPlan" element={<CustomizedSteppers></CustomizedSteppers>}>
                <Route path="Timer/:LastDateToRaiting" element={<Timer></Timer>}></Route>
                <Route path="AllSongs/:idPlan" element={<AllSongs />} ></Route>
                <Route path="UploadSong/:idPlan" element={<UploadSong></UploadSong>}></Route>
              </Route>

              <Route path="StepersAddUpdatePlan/:idPlan" element={<StepersAddUpdatePlan></StepersAddUpdatePlan>}>
                <Route path="AddOrUpdatePlan/:idPlan" element={<AddOrUpdatePlan></AddOrUpdatePlan>}></Route>
                <Route path="AddOrUpdateSteps/:idPlan/:addOrUpdate" element={<AddOrUpdateSteps></AddOrUpdateSteps>}></Route>
                <Route path="AddJudgesForCurrentPlan/:idPlan/:addOrUpdate" element={<AddJudgesForCurrentPlan></AddJudgesForCurrentPlan>}></Route>
              </Route>
              <Route path="AllRaitings/:idSong/:ifJudes/:idPlan" element={<AllRaitings></AllRaitings>}></Route>
              <Route path="ShowRaiting/:idPlan/:idSong" element={<ShowRaiting></ShowRaiting>}></Route>


              <Route path="LoginForm/:ifRaiting/:idPlan" element={<Trylogin />}></Route>
              <Route path="RgisterOrUpdateForm" element={<RgisterOrUpdateForm></RgisterOrUpdateForm>}></Route>
              {/* <Route path="AllRaitings/:idSong" element={<AllRaitings></AllRaitings>}></Route> */}
              <Route path="HomePageManager" element={<HomePageManager />} ></Route>

              {/* <Route path="AllRaitings/:idSong" element={<AllRaitings></AllRaitings>}></Route> */}


              {/* <Route path="/HomePage" element={<HomePage />}></Route>
              <Route path="/AllJudges" element={<AllJudges />} ></Route>
              <Route path="/AllUsers" element={<AllUsers />} ></Route>
              <Route path="/AllMessage" element={<AllMessage />} ></Route>
              <Route path="/AllSingers" element={<AllSingers />} ></Route>
              <Route path="/AllTypesPlan" element={<AllTypesPlan />} ></Route>
              <Route path="/AllSongs" element={<AllSongs />} ></Route>
              <Route path="/AllStepInPlans/:id" element={<CustomizedSteppers></CustomizedSteppers>}></Route>
              <Route path="/Timer" element={<Timer></Timer>}></Route>
              <Route path="/RgisterOrUpdateForm" element={<RgisterOrUpdateForm></RgisterOrUpdateForm>}></Route> */}


            </Route>


            <Route path="/" element={<ScrollableTabsButtonForce></ScrollableTabsButtonForce>} />
          </Routes>
        </BrowserRouter>
      </div>
      {/* </header> */}

    </div>

  );
}

// //ניווט ברירת מחדל לדף הבית
// function PageNotFound() {
//   return <div>
//     <h1>PageNotFound</h1>
//     <Link to='/HomePage' >
//       <button>HOME</button>
//     </Link>
//   </div>
// }

export default App;

