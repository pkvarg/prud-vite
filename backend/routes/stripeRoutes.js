import express from 'express'
import stripe from 'stripe'

const router = express.Router()

const createStripe = async (req, res) => {
  const { products, email, url, totalPrice } = req.body.requestBody
  const prices = products.map((price) => price.price)
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
    success_url: `http://localhost:3000${url.pathname}`,
    cancel_url: 'http://localhost:3000/cancell',
    line_items: lineItems,
  })

  //res.redirect(303, session.url)
  res.send(session.url)
}

router.post('/', createStripe)

export default router
