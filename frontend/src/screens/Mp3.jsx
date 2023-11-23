import React, { useState, useRef } from 'react'
import axios from 'axios'

const Mp3 = () => {
  const urls = [
    'https://drive.google.com/file/d/1NWTrnZIyHT1mtOSQknJLwB-omNHxBVnz/preview',
    'https://drive.google.com/file/d/1mrdBvIiTDGmKEbqBGhkSrsHDWDYO8hWW/preview',
    'https://drive.google.com/file/d/1hKgPS6CwZuAFHG2e31EtmroOqc0M3hHW/preview',
  ]

  const objects = [
    {
      audioTitle: 'Edgar Meyer01',
      mp3file:
        'https://drive.google.com/file/d/1NWTrnZIyHT1mtOSQknJLwB-omNHxBVnz/preview',
      category: 'Štúdium života',
      subcategory: 'Štúdium života',
    },
    {
      audioTitle: 'Edgar Meyer02',
      mp3file:
        'https://drive.google.com/file/d/1mrdBvIiTDGmKEbqBGhkSrsHDWDYO8hWW/preview',
      category: 'Štúdium života',
      subcategory: 'Štúdium života',
    },
    {
      audioTitle: 'Prud 2019',
      mp3file:
        'https://drive.google.com/file/d/1msfH5ni3TgGm0DFrMpHwKYMQ9vFm0Kpe/preview',
      category: 'Slova života',
      subcategory: 'Štúdium života',
    },
  ]
  return (
    <div>
      {/* {urls.map((url) => (
        <>
          <h1>Title</h1>
          <iframe
            src={url}
            key={url}
            width='640'
            height='80'
            allow='autoplay'
          ></iframe>
        </>
      ))} */}
      {objects.map((url) => (
        <>
          <p>{url.audioTitle}</p>

          <iframe
            src={url.mp3file}
            key={url.mp3file}
            width='640'
            height='60'
            allow='autoplay'
          ></iframe>
          <p>{url.category}</p>
        </>
      ))}
    </div>
  )
}

export default Mp3
