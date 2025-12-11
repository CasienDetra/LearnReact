import React, { Fragment } from 'react'

export default function UserList() {
  const users = [
    { id: 1, name:"vibol",age:24},
    { id: 2, name:"kanha",age:34}
  ];
  return (
    <>
    {users.map(user => {
        return (
            <Fragment key={user.id}>
                <h3> name : {user.name}</h3>
                <p> age : {user.age}</p>
            </Fragment>
        );
    })}
    </>
  );
}
