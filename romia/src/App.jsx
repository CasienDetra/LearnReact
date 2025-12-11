import './App.css'
import UserProfile from './components/UserProfile'
import UserList from './components/UserList'
function App() {
   return( 
   <div>
   <UserList></UserList>
   <UserProfile name="sok" age={34}/>
   </div>
  )
}

export default App
