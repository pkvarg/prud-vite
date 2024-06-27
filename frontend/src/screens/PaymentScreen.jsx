import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Form, Button, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const navigate = useNavigate()

  if (!shippingAddress) {
    navigate('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('Hotovosť')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <>
      <Link className='btn btn-back my-3' to='/shipping'>
        Naspäť na informácie o doručení
      </Link>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />

        <h1>Spôsob platby</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            {/* <Form.Label as='legend'>Vyberte spôsob platby</Form.Label> */}
            <Col>
              {/* <Form.Check
                type='radio'
                label='Platba kartou Stripe / Google Pay'
                id='Stripe'
                name='paymentMethod'
                value='Stripe'
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check> */}
              <Form.Check
                type='radio'
                label='Hotovosť pri prevzatí'
                id='Cash'
                name='paymentMethod'
                value='Hotovosť'
                defaultChecked
                // onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Image
              style={{ width: '25%', marginLeft: '-3%' }}
              src='/images/slovenska_posta.webp'
              alt='posta'
              fluid
            ></Image>
          </div>
          <Button type='submit' className='my-3 btn-blue rounded'>
            Pokračovať
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default PaymentScreen
