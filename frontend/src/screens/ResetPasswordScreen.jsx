import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { resetPasswordAction } from '../actions/userActions'

const ResetPasswordScreen = () => {
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [messageSuccess, setMessageSuccess] = useState(null)

  const dispatch = useDispatch()

  const resetPassword = useSelector((state) => state.resetPassword)
  const { loading, error } = resetPassword
  const params = useParams()
  const genToken = params.genToken
  const name = params.name
  const email = params.email
  const id = params.id

  const user = {
    name,
    id,
    email,
    password,
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Heslá sa nezhodujú')
    } else {
      dispatch(resetPasswordAction(user, genToken))
      setMessageSuccess('Heslo bolo úspešne zmenené')
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }

  return (
    <FormContainer>
      <h1>Zadajte Vaše nové heslo</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {messageSuccess && <Message variant='success'>{messageSuccess}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='password'>
          <Form.Label>Nové heslo</Form.Label>
          <Form.Control
            type='password'
            placeholder='Zadajte heslo'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Potvrďte nové heslo</Form.Label>
          <Form.Control
            type='password'
            placeholder='Potvrďte nové heslo'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='my-3 btn-blue'>
          Zmeniť heslo
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ResetPasswordScreen
