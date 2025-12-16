import './App.css'
import { useState } from 'react'
import UserProfile from './components/UserProfile'
import UserList from './components/UserList'
function App() {
     const [ color, setColor] = useState("red");
     const colors = [
      "red","blue","gray","white","black","Yellow"
     ];
   return( 
   <div>
   <UserList></UserList>
   <UserProfile name="sok" age={34}/>
   <h1>His Favorite color is {color}</h1>
   <button onClick={() => setColor(
    prev => {
      const index = colors.indexOf(prev);
      const nextIndex = (index + 1) % colors.length;
      return colors[nextIndex];
    }
   )
   }>
    Is it not ?
   </button>
   </div>
  )
}

export default App
