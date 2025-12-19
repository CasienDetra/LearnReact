import "./App.css"
export default function what() {
  const nameList = [ `Thyda`,`Vuthy`,`Phally`];
  return (
    <div>
      <ul>
        { nameList.map({name, index} => {
          <li key={ index }>{name}</li>
        })}
      </ul>
    </div>
  )
}

