import React from 'react'

// Component
let AudioActions = (category) => {
  return (
    <div className='actions'>
      <div className='album_meta'>
        <h1 className='album_meta_title'>
          {category.category === 'SLOVÁ ŽIVOTA A PRAVDY'
            ? 'SLOVÁ ŽIVOTA A PRAVDY'
            : 'ŠTÚDIUM ŽIVOTA'}
        </h1>
      </div>
    </div>
  )
}

export default AudioActions
