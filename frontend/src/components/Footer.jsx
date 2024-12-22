import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CookieConsent from 'react-cookie-consent'
import { firebaseInitApp } from '../App'
import { getAnalytics } from 'firebase/analytics'
import axios from 'axios'

const Footer = () => {
  const [cookieAccept, setCookieAccept] = useState(false)

  if (cookieAccept === true) {
    const analytics = getAnalytics(firebaseInitApp)
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const increaseVisitors = async () => {
    try {
      const { data } = await axios.put(`api/counter/increase`, config)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {/* <button onClick={increaseVisitors}>Test</button> */}
      <CookieConsent
        location='bottom'
        style={{
          background: '#dadada',
          color: '#8a1b1f',
          fontSize: '15px',
          textAlign: 'justify',
        }}
        buttonStyle={{
          background: '#1d9f2f',
          color: '#fff',
          fontSize: '17.5px',
        }}
        buttonText='Súhlasím'
        expires={365}
        enableDeclineButton
        onAccept={() => {
          setCookieAccept(true)
          increaseVisitors()
        }}
        declineButtonStyle={{
          background: 'red',
          color: '#fff',
          fontSize: '17.5px',
        }}
        declineButtonText='Nesúhlasím'
        onDecline={() => {
          increaseVisitors()
        }}
      >
        Táto stránka používa len analytické a pre fungovanie webu nevyhnutné
        cookies. Nepoužívame funkčné ani marketingové cookies.{' '}
        <a
          style={{
            color: '#8a1b1f',
            fontSize: '15px',
            //textDecoration: 'none',
          }}
          href='/safety-privacy'
        >
          {' '}
          GDPR
        </a>
      </CookieConsent>

      <footer>
        <Container>
          <div className='footer-text'>
            <Row>
              <Col>
                <div className='footer-text-links '>
                  <h2>Informácie</h2>
                  <Link to='/about'>
                    <p>O nás</p>
                  </Link>
                  <Link to='/contact'>
                    <p className='footer-trade-rules'>Kontaktujte nás</p>
                  </Link>
                </div>
              </Col>
              <Col>
                <div className='footer-text-links '>
                  <h2>Podmienky</h2>
                  <Link to='/safety-privacy'>
                    <p>GDPR</p>
                  </Link>
                  <Link to='/trade-rules'>
                    <p className='footer-trade-rules'>Obchodné podmienky</p>
                  </Link>
                </div>
              </Col>
              <Col>
                <div className='footer-text-links '>
                  <h2>Váš účet</h2>
                  <Link to='/login?redirect=/profile'>
                    <p>Objednávky</p>
                  </Link>
                  <Link to='/forgot-password'>
                    <p className='footer-trade-rules'>Zabudnuté heslo</p>
                  </Link>
                </div>
              </Col>
              <Col>
                <div className='footer-text-links '>
                  <h2>Kontakt</h2>

                  <a href='mailto:eshop@prud.sk'>
                    <p>eshop@prud.sk</p>
                  </a>

                  <a href='tel:+421904060262'>
                    <p>+421 904 060 262</p>
                  </a>

                  {/* <p>www.prud.sk</p> */}
                </div>
              </Col>
            </Row>
          </div>
        </Container>
        <Container>
          <Row>
            <Col className='py-3'>
              <div className='footer-copyright no-mobile'>
                <p className='footer-link'>
                  Copyright &copy; {Date().substring(11, 15)} PRÚD, všetky práva
                  vyhradené,
                </p>
                <a
                  href='https://www.lsm.org'
                  target='_blank'
                  rel='noreferrer'
                  className='footer-link'
                >
                  s povolením Living Stream Ministry
                </a>
                <a
                  href='https://www.pictusweb.sk'
                  target='_blank'
                  rel='noreferrer'
                  className='footer-link'
                >
                  &#60;&#47;&#62; PICTUSWEB Development
                </a>
              </div>

              <div className='footer-copyright mobile-only'>
                <p>Copyright &copy; {Date().substring(11, 15)} PRÚD,</p>
                <p>všetky práva vyhradené,</p>
                {/* <p> s povolením</p> */}
                <a
                  href='https://www.lsm.org'
                  target='_blank'
                  rel='noreferrer'
                  className='footer-link'
                  style={{ marginLeft: '2px' }}
                >
                  s povolením LIVING STREAM MINISTRY
                </a>
                <a
                  href='https://www.pictusweb.sk'
                  target='_blank'
                  rel='noreferrer'
                  className='footer-link'
                >
                  &#60;&#47;&#62; PICTUSWEB Development
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  )
}

export default Footer
