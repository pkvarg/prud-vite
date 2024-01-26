import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { wordsOflife } from '../functions'

const WordsOfLife = () => {
  const [subcategory, setSubcategory] = useState('Božie evanjelium')
  const myRef = useRef(null)
  const subHandler = (sub) => {
    myRef.current.scrollIntoView({ behavior: 'smooth' })
    setSubcategory(sub)
  }

  const category = 'SLOVÁ ŽIVOTA A PRAVDY'

  return (
    <>
      <Link className='btn btn-back my-3' to='/'>
        Naspäť
      </Link>

      <div className='podcast'>
        <h1 className='my-3'>Poslucháreň</h1>
        <h3 className='my-3'>SLOVÁ ŽIVOTA A PRAVDY</h3>
        <p>
          Relácia Slová života a pravdy, ktorú odvysielalo Rádio 7 je založená
          na krátkych úryvkoch z kníh Watchmana Nee a Witnessa Lee. Jednotlivé,
          zhruba 15 minútové nahrávky prezentujú publikácie oboch autorov, ktoré
          prinášajú svieži pohľad na pravdu zjavenú v Písme z hľadiska božského
          života, z ktorého sa tešia všetci veriaci v Krista.{' '}
        </p>
      </div>
      <div className='subcategories'>
        <div className='subcategories-frame no-mobile'>Predmet</div>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Boh v liste Rimanom')}
        >
          Boh v liste Rimanom
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Božie evanjelium')}
        >
          Božie evanjelium
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Charakter Pánovho pracovníka')}
        >
          Charakter Pánovho pracovníka
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Človek a dva stromy')}
        >
          Človek a dva stromy
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Evanjelium kráľovstva')}
        >
          Evanjelium kráľovstva
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Fakt viera a skúsenosť')}
        >
          Fakt viera a skúsenosť
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Hlavné Kristove kroky')}
        >
          Hlavné Kristove kroky
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Kresťanský život')}
        >
          Kresťanský život
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Kristovo vzkriesenie')}
        >
          Kristovo vzkriesenie
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Kristus ako zľutovnica')}
        >
          Kristus ako zľutovnica
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Naplnenie starého zákona')}
        >
          Naplnenie starého zákona
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Nevystihnuteľné Kristovo bohatstvo')}
        >
          Nevystihnuteľné Kristovo bohatstvo
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('O človeku')}
        >
          O človeku
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('O Duchu')}
        >
          O Duchu
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('O Kristovi')}
        >
          Kristovi
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Porátať sa s hriechmi')}
        >
          Porátať sa s hriechmi
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Porátať sa so svetom')}
        >
          Porátať sa so svetom
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Posolstvo evanjelia')}
        >
          Posolstvo evanjelia
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Prežívanie Krista')}
        >
          Prežívanie Krista
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Rada pre nových veriacich')}
        >
          Rada pre nových veriacich
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Rok milosti')}
        >
          Rok milosti
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() =>
            subHandler('Skúsenosti veriacich s Kristovým vzkriesením')
          }
        >
          Skúsenosti veriacich s Kristovým vzkriesením
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Skúsenosť života')}
        >
          Skúsenosť života
        </button>{' '}
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Spasenie')}
        >
          Spasenie
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Štruktúra Božieho evanjelia')}
        >
          Štruktúra Božieho evanjelia
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Svedomie')}
        >
          Svedomie
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Trojnásobné semeno')}
        >
          Trojnásobné semeno
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Učenie apoštolov')}
        >
          Učenie apoštolov
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Udeľovanie života')}
        >
          Udeľovanie života
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Večný Boží plán')}
        >
          Večný Boží plán
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Vzoprieť sa satanovi')}
        >
          Vzoprieť sa satanovi
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Základné prvky kresťanského života')}
        >
          Základné prvky kresťanského života
        </button>
        <button
          className='btn-subcategory'
          onClick={() => subHandler('Zjavenie života')}
        >
          Zjavenie života
        </button>
      </div>

      <div ref={myRef}></div>
      <div className='iframes-grid'>
        {wordsOflife.map(
          (url) =>
            url.subcategory === subcategory && (
              <div key={url._id} className='iframe-w'>
                <div className='mp3-frame-desc'>
                  <p className='sub'>{url.subcategory}</p>
                  <p className='tit'>{url.audioTitle}</p>
                  <p className='download'>Stiahnuť</p>
                </div>
                <iframe
                  src={url.mp3file}
                  width='640'
                  height='480'
                  allow='autoplay'
                ></iframe>
              </div>
            )
        )}
      </div>
    </>
  )
}

export default WordsOfLife
