import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import GoogleSignIn from '../components/GoogleSignIn'

const RegisterScreen = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister
  const location = useLocation()
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Heslá nesúhlasia')
    } else {
      dispatch(register(name, email, password))
      setMessage(
        `Registračný link Vám bol odoslaný na ${email}. Potvrďte prosím svoju registráciu kliknutím na prijatý link.`
      )
      setName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      window.scrollTo(0, 200)
    }
  }

  return (
    <>
      <Link className='btn btn-back my-3' to='/'>
        Naspäť
      </Link>

      <FormContainer>
        <h1>Zaregistrujte sa</h1>
        {message && <Message variant='success'>{message}</Message>}

        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Meno a priezvisko</Form.Label>
            <Form.Control
              type='name'
              placeholder='Meno a priezvisko'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Heslo</Form.Label>
            <Form.Control
              type='password'
              placeholder='Heslo'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Potvrďte heslo</Form.Label>
            <Form.Control
              type='password'
              placeholder='Potvrďte heslo'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            type='submit'
            variant='primary'
            className='my-5 btn-blue rounded'
          >
            Registrovať
          </Button>
        </Form>

        <h2 className='my-3'>Registrácia účtom Google</h2>
        <GoogleSignIn />

        <Row className='py-3 sign-in-forgot'>
          <Col>
            Už máte u nás účet?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Prihláste sa
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  )
}

export default RegisterScreen
