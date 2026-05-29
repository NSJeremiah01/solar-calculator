import Header from "./Components/Header"
import Nav from "./Components/Nav"
import Body from "./Components/Body"
import BodyPart1 from "./Components/BodyPart1"


function App() {
  

  return (
    <div className="flex flex-col w-full min-h-screen overflow-x-hidden">
    <div className="flex flex-col">
    <Header/>
    </div>
    <div className="flex flex-1  overflow-hidden">

        <div className="w-58 shrink-0">
      <Nav/>
      </div>
        <div className="flex-1 overflow-y-auto ">
      <Body/>
        
      </div>
     </div>
    </div>
         
                 
  )
}

export default App
