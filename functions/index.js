const functions = require('firebase-functions')
const admin = require('firebase-admin')
const PdfPrinter = require('pdfmake')
admin.initializeApp()
const firestore = admin.firestore()
const axios = require('axios')
const cors = require('cors')({
  origin: true,
})
exports.deleteOldItems = functions.firestore
  .document('/company/{companyId}')
  .onWrite((change, context) => {
    var document = change.after.ref.parent // doc to the items
    var now = Date.now() - 10 * 60 * 1000
    var oldItemsQuery = document.where('timestamp', '<', now).orderBy('timestamp')
    console.log(oldItemsQuery)

    return oldItemsQuery.get().then((snapshot) => {
      return snapshot.forEach((child) => {
        child.ref.update({ otp: null, timestamp: null })
      })
    })
  })
exports.otpCompany = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== 'POST')
      return res.status(401).json({
        message: 'Not allowed',
      })
    console.log(req.query.company)
    return firestore
      .collection('company')
      .get()
      .then((querySnapshot) => {
        randNum = () => {
          return (Math.floor(Math.random() * 1000000) + 1000000).toString().substring(1)
        }
        getNum = (num) => {
          let temp = num
          querySnapshot.forEach((doc) => {
            temp = doc.data().otp !== temp ? temp : getNum(randNum())
          })
          return temp
        }
        firestore
          .collection('company')
          .doc(req.query.company)
          .update({
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            otp: getNum(randNum()),
          })
        return res.status(201).json({
          success: 'success',
        })
      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
        })
      })
  })
})
exports.getPrice = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== 'GET') {
      return res.status(401).json({
        message: 'Not allowed',
      })
    }
    return axios
      .get('https://api.exchangeratesapi.io/latest?base=USD')
      .then((response) => {
        let { query } = req
        let { THB } = response.data.rates
        let price
        let vol =
          parseFloat(query.width) *
          parseFloat(query.height) *
          parseFloat(query.length) *
          parseFloat(query.quantity)
        switch (query.type) {
          case 'air':
            vol = vol / 6000
            price = Math.round(
              (vol > parseFloat(query.weight) ? vol : parseFloat(query.weight) * 2.5) * THB
            )
            break
          case 'sea':
            vol = vol / 1000000
            price = Math.round(vol * 25 * THB)
            break
          case 'land':
            if (vol < 1 || query.weight < 1000) {
              price = 3500
            } else if (vol < 25 || query.weight < 6000) {
              price = 7000
            } else if (vol < 25 || query.weight < 6000) {
              price = 8000
            } else {
              price = 9000
            }
            break

          default:
            price = -1
            break
        }
        return res.status(200).json({
          price,
        })
      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
        })
      })
  })
})
