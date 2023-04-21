import express from 'express'
import stripe from 'stripe'

const router = express.Router()

const createStripe = async (req, res) => {
  const { products, email, url, shippingPrice } = req.body.requestBody
  const lineItems = products.map((product) => {
    const item = {
      price: product.price,
      name: product.name,
      quantity: product.qty,
    }
    return {
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },

      quantity: item.quantity,
    }
  })

  const session = await stripe(
    process.env.STRIPE_SECRET_KEY
  ).checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: email,
    mode: 'payment',
    success_url: `http://localhost:3000${url.pathname}/stripe-success`,
    cancel_url: `http://localhost:3000${url.pathname}/stripe-fail`,
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: shippingPrice * 100, currency: 'eur' },
          display_name: 'Poštovné',
        },
      },
    ],
    line_items: lineItems,
  })

  //res.redirect(303, session.url)
  res.send(session)
}

router.post('/', createStripe)

export default router
