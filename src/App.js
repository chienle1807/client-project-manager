import "./App.css";
import Router from "./Routes/Router"
import axios from "axios";
import {useEffect,useState} from "react"
import { AuthContext } from "./Auth/AuthContext"
import apiEmployee from "./Api/apiEmployee";
function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    role:"",
    isActive:true,
    status: !!localStorage.getItem("accessToken"),
  });
  console.log(authState.status);
  useEffect(() => {
    const getAuth = async()=>{
      try{
        apiEmployee.getAuth().then(
          (res)=>{
            if (res.error) {
              setAuthState({ ...authState, status: false });
            }
            else{
              console.log(res)
              setAuthState({...res,status: true});
            }
          }
        )  
      }
      catch{

      }
    }
    getAuth()
  },[])
  console.log(authState)
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
    <div className="App">
      <Router/>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
