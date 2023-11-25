import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import colors from 'colors'
import morgan from 'morgan'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import authRoutes from './routes/authRoutes.js'
import audioRoutes from './routes/audioRoutes.js'
import videoRoutes from './routes/videoRoutes.js'
import bannerRoutes from './routes/bannerRoutes.js'
import stripeRoutes from './routes/stripeRoutes.js'
import stripe from 'stripe'

dotenv.config()
connectDB()
const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5000',
      'http://localhost:6000',
      'http://localhost:5173',
      'https://pictusweb.com',
      'https://prud.onrender.com',
      'https://prud-vite-front.onrender.com',
    ],
  })
)

// const users = []

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/audio', audioRoutes)
app.use('/api/video', videoRoutes)
app.use('/api/banner', bannerRoutes)
app.use('/api/create-stripe-checkout-session', stripeRoutes)

const __dirname = path.resolve()
app.use(
  '/uploads',
  express.static(path.join(__dirname, './../backend/uploads'))
)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './../frontend/dist/')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, './../frontend', 'dist', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const Stripe = stripe(process.env.STRIPE_SECRET_KEY)

const YOUR_DOMAIN = 'http://localhost:3000'

// app.post('/create-stripe-checkout-session', async (req, res) => {

//   const session = await Stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         currency: 'eur',
//         price: '123',
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${YOUR_DOMAIN}?success=true`,
//     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//   })

//   res.redirect(303, session.url)
// })

// RENDER

const PORT = process.env.PORT || 6000
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
