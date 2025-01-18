import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import { htmlToText } from 'html-to-text'
import pug from 'pug'
import path from 'path'

class Email {
  constructor(user, url, file) {
    //console.log('Email:', user, url)
    this.user = user.user
    this.to = user.email
    this.firstName = user.name
    this.url = url
    this.from = `Prúd Eshop <${process.env.EMAIL_FROM}>`
    // order
    this.products = []
    this.productsCount = user.productsCount
    for (let i = 0; i < user.productsCount; i++) {
      this.products.push(user[i])
    }
    this.addressinfo = user.addressinfo
    this.billinginfo = user.billinginfo
    this.paidByWhom = user.paidByWhom

    let paymentMethod
    if (user.paymentMethod === 'Hotovosť') {
      paymentMethod = 'Zaplatíte pri prevzatí'
    } else if (user.paymentMethod === 'PayPal alebo karta') {
      paymentMethod = 'PayPal alebo platba kartou'
    } else if (user.paymentMethod === 'Prevodom vopred') {
      paymentMethod = 'Bankovým prevodom vopred'
    } else {
      paymentMethod = 'Stripe'
    }
    this.paymentMethod = paymentMethod
    this.isPaid = user.isPaid ? 'Zaplatené' : 'Nezaplatené'
    this.shippingPrice = user.shippingPrice
    this.taxPrice = user.taxPrice
    this.totalPrice = user.totalPrice
    this.orderNumber = user.orderNumber
    this.file = file
    //this.subject = user.subject
    this.message = user.message
    this.note = user.note
    // review
    this.comment = user.comment
    this.orderId = user._id
    this.countInStock = user.countInStock
    this.error = user.error
    this.productsOnlyPrice = user.productsOnlyPrice
  }

  // // 1. Create OAuth2 client
  async createTransporter() {
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.REDIRECT_URI,
    )

    oAuth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    })

    const accessToken = await oAuth2Client.getAccessToken()

    // 2. Return the transporter object using OAuth2
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.ADMIN_USERNAME,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken.token, // Ensure it's token here, not the full object
      },
    })
  }

  // // 3. Create transport method
  async newTransport() {
    return await this.createTransporter()
  }

  // send the actual email
  async send(template, subject, adminOnly, accounting) {
    const __dirname = path.resolve()
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/utils/mailTemplates/${template}.pug`, {
      user: this.user,
      firstName: this.firstName,
      email: this.to,
      url: this.url,
      subject,
      // order
      products: this.products,
      address: this.addressinfo,
      billing: this.billinginfo,
      paidByWhom: this.paidByWhom,
      paymentMethod: this.paymentMethod,
      paid: this.isPaid,
      shippingPrice: this.shippingPrice,
      taxPrice: this.taxPrice,
      totalPrice: this.totalPrice,
      productsOnlyPrice: this.productsOnlyPrice,
      orderNumber: this.orderNumber,
      variableSymbol: this.orderNumber.replace('W', ''),
      file: this.file,
      // contactForm
      emailSubject: this.subject,
      message: this.message,
      note: this.note,
      // review
      comment: this.comment,
      orderId: this.orderId,
      countInStock: this.countInStock,
      error: this.error,
    })

    const admin1 = process.env.ESHOP_BCC
    const admin2 = process.env.DEV_BCC
    const accountant = process.env.ACCOUNTANT_BCC
    const admin2andAcc = [admin2, accountant].join(', ')

    if (!this.file) {
      console.log('no file')
      let mailOptions = {
        from: this.from,
        to: !adminOnly && this.to,
        cc: admin1,
        bcc: accounting ? admin2andAcc : admin2,
        subject,
        html,
        text: htmlToText(html),
      }

      // 3) Create a transport and send email

      await this.newTransport().then((transporter) => transporter.sendMail(mailOptions))
    }
    if (this.file) {
      console.log('is file')
      // 2) Define email options
      let mailOptions = {
        from: this.from,
        to: !adminOnly && this.to,
        cc: admin1,
        bcc: accounting ? admin2andAcc : admin2,
        subject,
        html,
        text: htmlToText(html),
        // file attachment
        attachments: [
          {
            filename: this.file,
            path: __dirname + `/${this.file}`,
            cid: `uniq-${this.file}`,
          },
        ],
      }
      // 3) Create a transport and send email
      await this.newTransport().then((transporter) => transporter.sendMail(mailOptions))
    }
  }

  async sendOrderToEmail() {
    await this.send('orderToEmail', `Vaša objednávka ${this.orderNumber}`, false, true)
  }

  // bank transfer NOT SK -> no file, no postage in email
  async sendOrderNotSkToEmail() {
    await this.send('orderNotSkToEmail', `Vaša objednávka ${this.orderNumber}`, false, false)
  }

  // bank transfer NOT SK ->  file, admin only
  async sendOrderNotSkAdminOnlyToEmail() {
    await this.send('orderNotSkAdminToEmail', `URGENT objednávka ${this.orderNumber}`, true, false)
  }

  // bank transfer SK ->  file, info in template
  async sendOrderSkBankTransferToEmail() {
    await this.send(
      'orderSKbankTransferToEmail',
      `Vaša objednávka ${this.orderNumber}`,
      false,
      true,
    )
  }

  async sendLowStoragePiecesWarningEmail() {
    await this.send('lowStoragePieces', `Počet ${this.firstName} klesol pod 10`, true, false)
  }

  async sendFailedPaymentNotificationgEmail() {
    await this.send('failedPaymentNotification', `Platba ${this.orderNumber} zlyhala`, true, false)
  }

  async sendPaymentErrorEmail() {
    await this.send('paymentError', `Platba ${this.to} zlyhala`, true, false)
  }

  async sendDeliveredNotificationEmail() {
    await this.send(
      'deliveredOrderEmail',
      `Vaša objednávka ${this.orderNumber} bola odoslaná`,
      false,
      false,
    )
  }

  async sendPaymentSuccessfullToEmail() {
    await this.send('paymentSuccessfull', `Objednávka zaplatená`, false, false)
  }

  async sendPasswordReset() {
    await this.send('passwordReset', 'Zmeňte si Vaše heslo', false, false)
  }

  async sendWelcome() {
    await this.send('welcome', 'Vaša registrácia na prud.sk', false, false)
  }

  async sendWelcomeGoogle() {
    await this.send('welcomeGoogle', 'Vaša registrácia na prud.sk', false, false)
  }

  // contact Form
  async sendContactForm() {
    await this.send('emailForm', 'Kontakt Eshop', false, false)
  }

  // new review notification

  async sendReviewNotification() {
    await this.send('reviewForm', 'Nová recenzia na Eshope', true, false)
  }
}

export default Email
