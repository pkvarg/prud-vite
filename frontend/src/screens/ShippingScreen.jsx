import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [name, setName] = useState('')

  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')

  // Billing Address
  const [billingName, setBillingName] = useState('')

  const [billingAddress, setBillingAddress] = useState('')
  const [billingCity, setBillingCity] = useState('')
  const [billingPostalCode, setBillingPostalCode] = useState('')
  const [billingCountry, setBillingCountry] = useState('')

  const [billingICO, setBillingICO] = useState('')

  const [billingDIC, setBillingDIC] = useState('')

  const [note, setNote] = useState('')

  const [phone, setPhone] = useState('')

  useEffect(() => {
    setName(shippingAddress.name || '')
    setAddress(shippingAddress.address || '')
    setCity(shippingAddress.city || '')
    setPostalCode(shippingAddress.postalCode || '')
    setCountry(shippingAddress.country || '')
    setBillingName(shippingAddress.billingName || '')
    setBillingAddress(shippingAddress.billingAddress || '')
    setBillingCity(shippingAddress.billingCity || '')
    setBillingPostalCode(shippingAddress.billingPostalCode || '')
    setBillingCountry(shippingAddress.billingCountry || '')
    setBillingICO(shippingAddress.billingICO || '')
    setBillingDIC(shippingAddress.billingDIC || '')
    setNote(shippingAddress.note || '')
    setPhone(shippingAddress.phone || '')
  }, [])

  const autofilledAlternatives = [
    'slovakia',
    'Slovakia',
    'sr',
    'SR',
    'slovensko',
    'Slovak Republic',
    'slovak republic',
    'slovenska republika',
    'Slovenska Republika',
    'slovenská republika',
    'Slovenská Republika',
    'Slovenská republika',
  ]

  useEffect(() => {
    if (autofilledAlternatives.includes(country)) {
      setCountry('Slovensko')
    }
  }, [country])

  const dispatch = useDispatch('')
  const navigate = useNavigate('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (country === '' || country === 'Uveďte štát' || country.includes('Uveďte štát')) {
      alert('Uveďte prosím štát.')
      return
    }
    dispatch(
      saveShippingAddress({
        name,
        address,
        city,
        postalCode,
        country,
        billingName,
        billingAddress,
        billingCity,
        billingPostalCode,
        billingCountry,
        billingICO,
        billingDIC,
        note,
        phone,
      }),
    )
    navigate('/payment')
  }

  const [checked, setChecked] = useState(false)
  const handleChange = () => {
    setChecked(!checked)
  }
  const [checkedICO, setCheckedICO] = useState(false)
  const handleChangeICO = () => {
    setCheckedICO(!checkedICO)
  }

  const handleRadioChange = (e) => {
    const value = e.target.value
    setCountry(value)
  }

  return (
    <>
      <Link to="/cart" className="btn btn-back my-3">
        Naspäť
      </Link>
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Doručenie</h1>
        <h2>Doručovacia adresa:</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>
              Meno a priezvisko<sup>*</sup>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Meno a priezvisko"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>
              Adresa<sup>*</sup>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ulica a číslo"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>
              Mesto<sup>*</sup>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Mesto"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="postalCode">
            <Form.Label>
              PSČ<sup>*</sup>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="PSČ"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="country">
            <Form.Label>
              Štát<sup>*</sup>
            </Form.Label>

            {/* Slovensko Radio */}
            <Form.Check
              type="radio"
              label="Slovensko"
              name="countryOption"
              value="Slovensko"
              checked={country === 'Slovensko'}
              onChange={handleRadioChange}
            />

            {/* Other Country Radio + Input */}
            <Form.Check
              type="radio"
              label="Iné"
              name="countryOption"
              value="Uveďte štát"
              checked={country !== 'Slovensko' && country !== ''}
              onChange={handleRadioChange}
            />

            {/* Text input for custom country */}
            {country !== 'Slovensko' && (
              <Form.Control
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                style={{ marginTop: '15px' }}
              ></Form.Control>
            )}
          </Form.Group>

          <Form.Group controlId="phone">
            <Form.Label>Telefón</Form.Label>
            <Form.Control
              type="text"
              placeholder="Telefón"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="note">
            <Form.Label>Poznámka</Form.Label>
            <Form.Control
              type="text"
              placeholder="Poznámka"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-5 billing-flex">
            <Form.Check
              type="checkbox"
              // aria-label='radio 1'
              name="billingCheck"
              onChange={handleChange}
            />
            <h2 className="billing-address-title-check">
              Fakturačná adresa je iná ako doručovacia
            </h2>
          </Form.Group>
          {checked ? (
            <div>
              <Form.Group controlId="billingName">
                <Form.Label>Meno a priezvisko / Firma</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Meno a priezvisko / Firma"
                  value={billingName}
                  onChange={(e) => setBillingName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="billingAddress">
                <Form.Label>Fakturačná adresa</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ulica a číslo"
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="billingCity">
                <Form.Label>Mesto</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Mesto"
                  value={billingCity}
                  onChange={(e) => setBillingCity(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="billingPostalCode">
                <Form.Label>PSČ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="PSČ"
                  value={billingPostalCode}
                  onChange={(e) => setBillingPostalCode(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="billingCountry">
                <Form.Label>Štát</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Štát"
                  value={billingCountry}
                  onChange={(e) => setBillingCountry(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="billing-flex">
                <Form.Check type="checkbox" name="billingCheck" onChange={handleChangeICO} />
                <h2 className="my-5 billing-icodic-title-check">IČO a DIČ</h2>
              </Form.Group>
              {checkedICO ? (
                <div>
                  <Form.Group controlId="billingICO">
                    <Form.Label>IČO</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="IČO"
                      value={billingICO}
                      onChange={(e) => setBillingICO(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="billingDIC">
                    <Form.Label>DIČ</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="DIČ"
                      value={billingDIC}
                      onChange={(e) => setBillingDIC(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </div>
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )}

          <Button type="submit" className="my-3 btn-blue rounded">
            Pokračovať
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default ShippingScreen
