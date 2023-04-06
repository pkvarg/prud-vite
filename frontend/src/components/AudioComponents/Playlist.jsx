import React, { useContext } from 'react'
import playerContext from './context/playerContext'

let Playlist = (subcategory) => {
  const downloadFileHandler = (fileName) => {
    fileName = `${fileName}.mp3`
    console.log(fileName)
    fetch(`/uploads/${fileName}`).then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob)
        let alink = document.createElement('a')
        alink.href = fileURL
        alink.download = `${fileName}`
        alink.click()
      })
    })
  }

  let { songslist, currentSong, SetCurrent } = useContext(playerContext)
  songslist = songslist.filter((audio) => {
    return (
      audio.category === 'Slová života' &&
      audio.subcategory === subcategory.subcategory.subcategory
    )
  })

  return (
    <>
      <div className='playlist no_drag'>
        <div className='playlist-subcategory'>
          <h3>{subcategory.subcategory.subcategory}</h3>
        </div>
        <ul className='loi'>
          {songslist.map((song, i) => (
            <li
              className={
                'songContainer ' + (currentSong === i ? 'selected' : '')
              }
              key={i}
              onClick={() => SetCurrent(i)}
            >
              <div className='tmbn_song'>
                <i className='fas fa-play'></i>
              </div>
              <div className='songmeta_playlist'>
                <span className='songname'>{song.audioTitle}</span>
                <button
                  className='btn-mp3'
                  onClick={() => downloadFileHandler(song.audioTitle)}
                >
                  <i className='fa-solid fa-download'></i>
                </button>
              </div>
              <div className='playlist_btns_group'></div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Playlist
