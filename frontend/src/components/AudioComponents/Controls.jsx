import React, { useState, useEffect, useRef, useContext } from 'react'
import playerContext from './context/playerContext'
import * as Icon from 'react-bootstrap-icons'

let Controls = ({ subcategory, songslist }) => {
  // Global State
  // let { currentSong, nextSong, prevSong, playing, togglePlaying, songslist } =
  //   useContext(playerContext)
  let { currentSong, nextSong, prevSong, playing, togglePlaying } =
    useContext(playerContext)

  const audio = useRef('audio_tag')

  const handleEnd = () => {
    //   if (currentSong === songslist.length - 1) {
    //     return
    //   } else {
    //     nextSong()
    // }
    return
  }

  // self State
  const [statevolum, setStateVolum] = useState(0.3)
  const [dur, setDur] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const fmtMSS = (s) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + ~~s
  }

  const toggleAudio = () =>
    audio.current.paused ? audio.current.play() : audio.current.pause()

  const handleVolume = (q) => {
    setStateVolum(q)
    audio.current.volume = q
  }

  const handleProgress = (e) => {
    let compute = (e.target.value * dur) / 100
    setCurrentTime(compute)
    audio.current.currentTime = compute
  }

  useEffect(() => {
    audio.current.volume = statevolum
    if (playing) {
      toggleAudio()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong])

  return (
    <div className='controls'>
      <audio
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        onCanPlay={(e) => setDur(e.target.duration)}
        onEnded={handleEnd}
        ref={audio}
        preload='true'
        src={songslist[currentSong].mp3file}
        type='audio/mpeg'
      />
      <div className='vlme'>
        <span className='volum'>
          <Icon.VolumeDown size={35} />
        </span>
        <input
          value={Math.round(statevolum * 100)}
          type='range'
          name='volBar'
          id='volBar'
          onChange={(e) => handleVolume(e.target.value / 100)}
        />
      </div>
      <div className='musicControls'>
        <span className='prev' onClick={prevSong}>
          <Icon.SkipBackward />
        </span>

        <span
          className='play'
          onClick={() => {
            togglePlaying()
            toggleAudio()
          }}
        >
          <span className={!playing ? '' : 'hide'}>
            <Icon.Play />
          </span>
          <span className={!playing ? 'hide' : ''}>
            <Icon.Pause />
          </span>
        </span>

        <span className='next' onClick={nextSong}>
          <Icon.SkipForward />
        </span>
      </div>

      <div className='progressb'>
        <input
          onChange={handleProgress}
          value={dur ? (currentTime * 100) / dur : 0}
          type='range'
          name='progresBar'
          id='prgbar'
        />
        <span className='currentT'>
          {currentTime < 599.516421
            ? '0' + fmtMSS(currentTime)
            : fmtMSS(currentTime)}
        </span>
        /<span className='totalT'>{fmtMSS(dur)}</span>
      </div>
    </div>
  )
}

export default Controls
