import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Form, Button, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress, paymentMethod } = cart
  const navigate = useNavigate()

  if (!shippingAddress) {
    navigate('/shipping')
  }

  const [method, setMethod] = useState('')

  useEffect(() => setMethod(paymentMethod), [paymentMethod])

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    if (!method) {
      alert('Vyberte prosím spôsob platby.')
      return
    }
    dispatch(savePaymentMethod(method))
    navigate('/placeorder')
  }

  return (
    <>
      <Link className="btn btn-back my-3" to="/shipping">
        Naspäť na informácie o doručení
      </Link>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />

        <h1>Spôsob platby</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Col>
              {/* <Form.Check
                type='radio'
                label='Platba kartou Stripe / Google Pay'
                id='Stripe'
                name='paymentMethod'
                value='Stripe'
                onChange={(e) => setMethod(e.target.value)}
              ></Form.Check> */}
              {shippingAddress.country === 'Slovensko' ? (
                <>
                  <Form.Check
                    type="radio"
                    label="Platba bankovým prevodom vopred"
                    id="Bank"
                    name="paymentMethod"
                    value="Prevodom vopred"
                    checked={method === 'Prevodom vopred'}
                    onChange={(e) => setMethod(e.target.value)}
                  ></Form.Check>
                  <Form.Check
                    type="radio"
                    label="Hotovosť pri prevzatí"
                    id="Cash"
                    name="paymentMethod"
                    value="Hotovosť"
                    checked={method === 'Hotovosť'}
                    //defaultChecked
                    onChange={(e) => setMethod(e.target.value)}
                  ></Form.Check>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Image
                      style={{ width: '25%', marginLeft: '-3%' }}
                      src="/images/slovenska_posta.webp"
                      alt="posta"
                      fluid
                    ></Image>
                  </div>
                </>
              ) : (
                <Form.Check
                  type="radio"
                  label="Platba bankovým prevodom vopred"
                  id="Bank"
                  name="paymentMethod"
                  value="Prevodom vopred"
                  checked={method == 'Prevodom vopred'}
                  onChange={(e) => setMethod(e.target.value)}
                ></Form.Check>
              )}
            </Col>
          </Form.Group>

          <Button type="submit" className="my-3 btn-blue rounded">
            Pokračovať
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default PaymentScreen
