import React from 'react'

function Pin_sidebar({pin}) {
  return (
    <div>
      <img src={pin.urls.small}/>
    </div>
  )
}

export default Pin_sidebar
