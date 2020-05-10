const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
const firestore = admin.firestore()
const axios = require('axios')
const cors = require('cors')({
  origin: true,
})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.deleteOldItems = functions.firestore.document('/otp/{otpId}').onWrite((change, context) => {
  var document = change.after.ref.parent // doc to the items
  var now = Date.now() - 10 * 60 * 1000
  var oldItemsQuery = document.orderByChild('timestamp').endAt(now)
  return oldItemsQuery.once('value', (snapshot) => {
    var updates = {}
    snapshot.forEach((child) => {
      updates[child.key] = null
    })
    return ref.update(updates)
  })
})

exports.otpCompany = functions.https.onRequest(async (req, res) => {
  cors(req, res, () => {
    if (req.method !== 'POST')
      return res.status(401).json({
        message: 'Not allowed',
      })
    return firestore
      .collection('otp')
      .where('type', '==', 'company')
      .get()
      .then((querySnapshot) => {
        randNum = () => {
          return (Math.floor(Math.random() * 10000) + 10000).toString().substring(1)
        }
        getNum = (num) => {
          let temp = num
          querySnapshot.forEach((doc) => {
            temp = doc.data().otp !== temp ? temp : getNum(randNum())
          })
          return temp
        }

        firestore.collection('otp').add({
          timestamp: new Date(),
          otp: getNum(randNum()),
          to: req.query.company,
          type: 'company',
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
