import Header from "./Components/Header"
import Nav from "./Components/Nav"
import Body from "./Components/Body"



function App() {
  

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <Header/>
   
    <div className="flex flex-1 min-h-0 overflow-hidden">

      <Nav/>
        <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
          <Body/>
        </main>
     </div>
    </div>
         
                 
  )
}

export default App
