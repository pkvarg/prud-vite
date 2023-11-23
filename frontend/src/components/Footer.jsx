import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CookieConsent from 'react-cookie-consent'
import { firebaseInitApp } from '../App'
import { getAnalytics } from 'firebase/analytics'

const Footer = () => {
  const [cookieAccept, setCookieAccept] = useState(false)

  if (cookieAccept) {
    const analytics = getAnalytics(firebaseInitApp)
  }

  return (
    <>
      <CookieConsent
        location='bottom'
        style={{
          background: '#dadada',
          color: '#000',
          fontSize: '22.5px',
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
        onDecline={() => {
          setCookieAccept(false)
          increaseVisitorsDeclined()
        }}
        declineButtonStyle={{
          background: 'red',
          color: '#fff',
          fontSize: '17.5px',
        }}
        declineButtonText='Nesúhlasím'
        onAccept={() => {
          setCookieAccept(true)
        }}
      >
        Táto stránka používa len analytické a pre fungovanie webu nevyhnutné
        cookies. Nepoužívame funkčné ani marketingové cookies.{' '}
        <a href='/gdpr'> GDPR</a>
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

                  <a href='mailto:admin@prud.sk'>
                    <p>admin@prud.sk</p>
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
                <p>všetky práva vyhradené, s povolením</p>
                {/* <p> s povolením</p> */}
                <a
                  href='https://www.lsm.org'
                  target='_blank'
                  rel='noreferrer'
                  className='footer-link'
                >
                  LIVING STREAM MINISTRY
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
