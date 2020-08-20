import React from 'react';

function ListItem({ title, btnFunc, id }) {
  return (
    <li>
      {title}
      <button onClick={() => btnFunc(id)}>Remover</button>
    </li>
  )
}

export default ListItem;