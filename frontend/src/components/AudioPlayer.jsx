import React from 'react'
import '../../src/audio.css'
import AudioActions from './AudioComponents/AudioActions'
import PlayerState from './AudioComponents/context/PlayerState'
import PlayControls from './AudioComponents/PlayControls'

let AudioPlayer = ({ category, subcategory }) => {
  return (
    <PlayerState>
      <div className='audioplayer'>
        <div className='inside_content'>
          <AudioActions category={category} />
          <PlayControls subcategory={subcategory} />
        </div>
      </div>
    </PlayerState>
  )
}

export default AudioPlayer
