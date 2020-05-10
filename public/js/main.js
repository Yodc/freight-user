alertMessage = (message, type) => {
  $('#alert_text').html(message)
  $('.alert').removeClass('alert-success alert-danger alert-warning hide')
  $('.alert').addClass(`alert-${type}`)
  $('.myAlert').show()
}
getPrice = (data, selector) => {
  return $.ajax({
    type: 'GET',
    url: 'https://us-central1-freight-f4226.cloudfunctions.net/getPrice',
    data: {
      width: parseFloat(data.width),
      height: parseFloat(data.height),
      length: parseFloat(data.length),
      quantity: parseFloat(data.quantity),
      weight: parseFloat(data.weight),
      quantity: parseFloat(data.quantity),
      type: data.type,
    },
    success: function (res) {
      $(selector.card).removeClass('hide')
      $(selector.swap).addClass('hide')
      $(selector.price).html(res.price)
    },
  })
}
capitalizeFirstLetter = (letter) => {
  return letter.charAt(0).toUpperCase() + letter.slice(1)
}
addCard = (icon, key, value, location) => {
  $(location).append(`
  <div class="myCard p-3 col-md-5 m-3">
  <div class="cardIcon"><i class="fas fa-${icon}"></i></div>
  <div class="cardKey font-weight-bold">${key}</div>
  <div class="cardValue text-primary">${value}</div>
</div>`)
}
getStatus = (option) => {
  $('#status-modal').modal('show')
  $('.status_loading').removeClass('hide')

  $('.statusContent').addClass('hide')
  $('#eprice').addClass('hide')
  $('#alertProfile').addClass('hide')
  $('.is-active').removeClass('is-active')
  $('.is-complete').removeClass('is-complete')
  let statusRef = db.collection('status')
  showStatus = () => {
    switch (doc.data().status) {
      case 'booking':
        db.collection('status')
          .doc(auth.currentUser.uid)
          .get()
          .then(function (doc) {
            $('.status_loading').addClass('hide')
            $('#status-card').removeClass('hide')
            let data = doc.data().booking
            $('#getBooking').addClass(`hide`)
            $('#nodata').addClass('is-active')
            $('#nodata').html('<span>Booking Detail</span>')
            $('#bookingDetail').removeClass('hide')
            $('.bookingContainer').empty()
            addCard(
              'cube',
              `Dimention`,
              `${data.width} x ${data.height} x ${data.length} cm`,
              '.bookingContainer'
            )
            addCard(
              'boxes',
              `Quantity`,
              `${data.quantity} ${capitalizeFirstLetter(data.package_type)}`,
              '.bookingContainer'
            )
            addCard('weight', `Weight`, `${data.weight} kgs`, '.bookingContainer')
            addCard(
              'road',
              `Transport Type`,
              `${capitalizeFirstLetter(data.package_type)}`,
              '.bookingContainer'
            )
            addCard(
              'paper-plane',
              `Origin - Destination`,
              `${data.origin} - ${data.destination}`,
              '.bookingContainer'
            )
            addCard('calendar-alt', `Estimate Time Departure`, `${data.etd}`, '.bookingContainer')
            storage
              .ref()
              .child(`users/${auth.currentUser.uid}/booking/packing_list.pdf`)
              .getDownloadURL()
              .then((url) => {
                addCard(
                  'file-archive',
                  `Packing List`,
                  `<a type="button" role="button" href="${url}" target="_blank" class="btn btn-primary btn-block">Download</a>`,
                  '.bookingContainer'
                )
              })
            storage
              .ref()
              .child(`users/${auth.currentUser.uid}/booking/invoice.pdf`)
              .getDownloadURL()
              .then((url) => {
                addCard(
                  'file-invoice',
                  `Invoice`,
                  `<a type="button" role="button" href="${url}" target="_blank" class="btn btn-primary btn-block">Download</a>`,
                  '.bookingContainer'
                )
              })
          })

        break
      case 'appointment':
        $('#nodata').addClass('is-complete')
        $('#appointment').addClass('is-active')
        $('#appointmentDetail').removeClass('hide')
        db.collection('status')
          .doc(auth.currentUser.uid)
          .get()
          .then(function (doc) {
            $('.status_loading').addClass('hide')
            $('#getBooking').addClass(`hide`)
            $('#status-card').removeClass('hide')
            let data = doc.data().appointment
            let booking = doc.data().booking
            $('#nodata').addClass('is-complete')
            $('#appointment').addClass('is-active')
            $('#confirmAppointment').removeClass('hide')
            switch (booking.transport_type) {
              case 'air':
                addCard('hashtag', `Booking Id`, `${data.booking_no}`, '.appointmentContainer')
                addCard('building', `Company Name`, `${data.company_name}`, '.appointmentContainer')
                addCard(
                  'paper-plane',
                  `Origin - Destination`,
                  `${booking.origin} - ${booking.destination}`,
                  '.appointmentContainer'
                )
                addCard(
                  'calendar-check',
                  `ETD - ETA`,
                  `${data.etd} - ${data.eta}`,
                  '.appointmentContainer'
                )
                addCard('plane', `Fleight No`, `${data.flight_no}`, '.appointmentContainer')
                addCard(
                  'cube',
                  `Volume`,
                  `${(booking.width * booking.height * booking.length) / 6000} CBM`,
                  '.appointmentContainer'
                )
                addCard(
                  'boxes',
                  `Quantity`,
                  `${booking.quantity} ${capitalizeFirstLetter(booking.package_type)}`,
                  '.appointmentContainer'
                )
                addCard('weight', `Weight`, `${booking.weight} kgs`, '.appointmentContainer')
                addCard(
                  'plane-departure',
                  `Loading At`,
                  `${data.loading_at}`,
                  '.appointmentContainer'
                )
                addCard(
                  'calendar-week',
                  `Loading date`,
                  `${data.loading_date}`,
                  '.appointmentContainer'
                )
                addCard(
                  'user-tie',
                  `Loading Contact`,
                  `${data.contact_name} - ${data.contact_tel}`,
                  '.appointmentContainer'
                )
                addCard(
                  'id-card',
                  `Transport Contact`,
                  `${data.transporter_name} - ${data.transporter_tel}`,
                  '.appointmentContainer'
                )
                break
              case 'sea':
                addCard('building', `Company Name`, `${data.company_name}`, '.appointmentContainer')
                addCard(
                  'paper-plane',
                  `Origin - Destination`,
                  `${booking.origin} - ${booking.destination}`,
                  '.appointmentContainer'
                )
                addCard(
                  'calendar-check',
                  `ETD - ETA`,
                  `${data.etd} - ${data.eta}`,
                  '.appointmentContainer'
                )
                addCard('ship', `Vessel Name`, `${data.vessel_name}`, '.appointmentContainer')
                addCard(
                  'cube',
                  `Volume`,
                  `${(booking.width * booking.height * booking.length) / 1000000} CBM`,
                  '.appointmentContainer'
                )
                addCard(
                  'boxes',
                  `Quantity`,
                  `${booking.quantity} ${capitalizeFirstLetter(booking.package_type)}`,
                  '.appointmentContainer'
                )
                addCard('weight', `Weight`, `${booking.weight} kgs`, '.appointmentContainer')
                addCard(
                  'plane-departure',
                  `Loading At`,
                  `${data.loading_at}`,
                  '.appointmentContainer'
                )
                addCard(
                  'calendar-week',
                  `Loading date`,
                  `${data.loading_date}`,
                  '.appointmentContainer'
                )
                addCard(
                  'user-tie',
                  `Loading Contact`,
                  `${data.contact_name} - ${data.contact_tel}`,
                  '.appointmentContainer'
                )
                addCard(
                  'id-card',
                  `Transport Contact`,
                  `${data.transporter_name} - ${data.transporter_tel}`,
                  '.appointmentContainer'
                )
                break
              case 'land':
                addCard(
                  'paper-plane',
                  `Origin - Destination`,
                  `${booking.origin} - ${booking.destination}`,
                  '.appointmentContainer'
                )
                addCard(
                  'calendar-check',
                  `ETD - ETA`,
                  `${data.etd} - ${data.eta}`,
                  '.appointmentContainer'
                )
                addCard('car', `Car Register`, `${data.car_register}`, '.appointmentContainer')
                addCard('hashtag', `Car Cassis`, `${data.car_cassis}`, '.appointmentContainer')
                addCard('cogs', `Car Engine`, `${data.car_engine}`, '.appointmentContainer')
                addCard('truck', `Car Type`, `${data.car_type}`, '.appointmentContainer')
                addCard(
                  'car-crash',
                  `Car Insurance`,
                  `${data.car_insurance}`,
                  '.appointmentContainer'
                )
                addCard(
                  'cube',
                  `Volume`,
                  `${(booking.width * booking.height * booking.length) / 1000000} CBM`,
                  '.appointmentContainer'
                )
                addCard(
                  'boxes',
                  `Quantity`,
                  `${booking.quantity} ${capitalizeFirstLetter(booking.package_type)}`,
                  '.appointmentContainer'
                )
                addCard('weight', `Weight`, `${booking.weight} kgs`, '.appointmentContainer')
                addCard(
                  'user',
                  `Driver`,
                  `${data.car_driver} - ${data.car_tel}`,
                  '.appointmentContainer'
                )

                break
              default:
                break
            }
          })
        break
      case 'invoice':
        storage
          .ref()
          .child(`users/${auth.currentUser.uid}/booking/invoice.pdf`)
          .getDownloadURL()
          .then((url) => {
            $('.status_loading').addClass('hide')
            $('#status-card').removeClass('hide')
            $('#nodata').addClass('is-complete')
            $('#getBooking').addClass(`hide`)
            $('#appointment').addClass('is-complete')
            $('#invoice').addClass('is-active')
            $('#invoiceData').removeClass('hide')
            console.log(url)
            $('#invoiceContainer').append(
              `<div class="col-12 d-flex justify-content-center"><a type="button" role="button" href="${url}" target="_blank" class="btn btn-primary">get Invoice</a></div>`
            )
          })
        break
      case 'receipt':
        storage
          .ref()
          .child(`users/${auth.currentUser.uid}/booking/invoice.pdf`)
          .getDownloadURL()
          .then((url) => {
            $('.status_loading').addClass('hide')
            $('#status-card').removeClass('hide')
            $('#nodata').addClass('is-complete')
            $('#appointment').addClass('is-complete')
            $('#invoice').addClass('is-complete')
            $('#receipt').addClass('is-active')
            $('#receiptData').removeClass('hide')
            $('#receiptContainer').append(
              `<div class="col-12 d-flex justify-content-center"><a type="button" role="button" href="${url}" target="_blank" class="btn btn-primary">Get Receipt</a></div>`
            )
          })
        break
      default:
        break
    }
  }

  if (option.type === 'tracking') {
    statusRef
      .doc(option.trackingID)
      .get()
      .then((doc) => {
        showStatus()
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    statusRef
      .where('company', '==', localStorage.getItem('company_code'))
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs[0].get().then((doc) => {
          if (option.type === 'user' && doc.exist) {
            let date = new Date()
            $('#booking_etd').attr(
              'min',
              `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
            )
            if (fillData) {
              $('#booking_width').val($('#width').val())
              $('#booking_height').val($('#height').val())
              $('#booking_length').val($('#length').val())
              $('#booking_quantity').val($('#quantity').val())
              $('#booking_weight').val($('#weight').val())
              $('.booking-card').removeClass('active')
              $(`#${$('type-card.active').attr('id').split('-')[0]}-booking-card`).addClass(
                'active'
              )
            }
            $('#booking_eta').attr('min', new Date())
            $('#getBooking').removeClass(`hide`)
            $('.status_loading').addClass('hide')
            $('#status-card').removeClass('hide')
            $('#nodata').addClass('is-active')
            $('#newbooking').removeClass('hide')
            $('#air-swap').click(() => {
              $('.thai-air').empty()
              $('.inter-air').empty()
              $('.air-from').toggleClass('thai-air')
              $('.air-from').toggleClass('inter-air')
              $('.air-to').toggleClass('thai-air')
              $('.air-to').toggleClass('inter-air')
              db.collection('air')
                .orderBy('air_name')
                .get()
                .then(function (querySnapshot) {
                  querySnapshot.forEach(function (document) {
                    $('.inter-air').append(
                      `<option value="${document.id}">${document.data().air_name}</option>`
                    )
                  })
                  $('.thai-air').append(`<option value="thai">Bangkok,Thailand</option>`)
                })
            })
            $('#sea-swap').click(() => {
              $('.thai-sea').empty()
              $('.inter-sea').empty()
              $('.sea-from').toggleClass('thai-sea')
              $('.sea-from').toggleClass('inter-sea')
              $('.sea-to').toggleClass('thai-sea')
              $('.sea-to').toggleClass('inter-sea')
              db.collection('sea')
                .orderBy('sea_name')
                .get()
                .then(function (querySnapshot) {
                  querySnapshot.forEach(function (document) {
                    $('.inter-sea').append(
                      `<option value="${document.id}">${document.data().sea_name}</option>`
                    )
                  })
                  $('.thai-sea').append(`<option value="thai">Khlong Toei Pier,Thailand</option>`)
                  $('.thai-sea').append(`<option value="thai">Laemchabang Port,Thailand</option>`)
                })
            })
            $('#booking-submit').on('click', function () {
              let transport_type = $('.booking-card.active').attr('id').split('-')[0]
              let origin, destination
              switch (transport_type) {
                case 'air':
                  origin = $('.air-from option').filter(':selected').text()
                  destination = $('.air-to option').filter(':selected').text()
                  break
                case 'sea':
                  origin = $('.sea-from option').filter(':selected').text()
                  destination = $('.sea-to option').filter(':selected').text()
                  break
                case 'land':
                  origin = $('#ip-from').val()
                  destination = $('#ip-to').val()
                  break
                default:
                  break
              }
              randID = () => {
                return `JN-${(Math.floor(Math.random() * 10000) + 10000).toString().substring(1)}`
              }
              getID = (num) => {
                let temp = num
                return db
                  .collection('status')
                  .get()
                  .then((querySnapshot) => {
                    querySnapshot.forEach((document) => {
                      temp = document.id !== temp ? temp : getID(randID())
                    })
                    return temp
                  })
              }
              let id = getID(randID())
              db.collection('status')
                .doc(id)
                .update({
                  status: 'booking',
                  company: doc.data().company_code,
                  booking: {
                    width: parseFloat($('#booking_width').val()),
                    height: parseFloat($('#booking_height').val()),
                    length: parseFloat($('#booking_length').val()),
                    quantity: parseFloat($('#booking_quantity').val()),
                    weight: parseFloat($('#booking_weight').val()),
                    package_type: $('.booking-type.active').attr('value'),
                    transport_type,
                    origin,
                    destination,
                    etd: $('#booking_etd').val(),
                  },
                })
                .then(() => {
                  alertMessage('Booking Complete', 'success')
                })
                .catch(function (error) {
                  alertMessage(error, 'danger')
                })
              storage
                .ref()
                .child(`company/${id}/booking/packing_list.pdf`)
                .put($('#booking_packing_list').get(0).files[0])
              storage
                .ref()
                .child(`company/${id}/booking/invoice.pdf`)
                .put($('#booking_invoice').get(0).files[0])
              $('#status-modal').modal('hide')
            })
            return
          }
          showStatus()
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
getProfile = () => {
  $('#signup-modal').modal('show')
  $('#signup-title').html('Update Profile')
  $('.notProfile').remove()
  $('#signup-submit').html('Update Profile')

  db.collection('users')
    .doc(auth.currentUser.uid)
    .get()
    .then(function (doc) {
      $('#signup-company').val(doc.data().company_code)
      $('#signup-first_name').val(doc.data().first_name)
      $('#signup-last_name').val(doc.data().last_name)
      $('#signup-tel').val(doc.data().tel)
    })
}
$('.myAlert').hide()
$('#alert-close').on('click', function () {
  $('.myAlert').hide()
})
$('#signup-company').keyup(function () {
  if ($(this).val().length === 6) {
    db.collection('otp')
      .doc($('#signup-company').val())
      .get()
      .then((doc) => {
        if (doc.exist) {
          $('#found_company').class('text-success')
          $('#found_company').html(doc.data().to)
        } else {
          $('#found_company').class('text-muted')
          $('#found_company').html('None')
        }
      })
  }
})

$('#getBooking').on('click', function () {
  let condition =
    $('#booking_width').val().length !== 0 &&
    $('#booking_height').val().length !== 0 &&
    $('#booking_length').val().length !== 0 &&
    $('#booking_quantity').val().length !== 0 &&
    $('#booking_weight').val().length !== 0
  if (condition) {
    $('#newbooking').addClass('hide')
    $('#getBooking').addClass('hide')
  } else {
    $('.bookingHelp').removeClass('text-muted')
    $('.bookingHelp').addClass('text-danger')
  }
})
$('.profileInput').keyup(function () {
  if ($(this).val().length === 0) {
    $('.profileHelp').removeClass('text-muted')
    $('.profileHelp').addClass('text-danger')
  } else {
    $('.profileHelp').removeClass('text-danger')
    $('.profileHelp').addClass('text-muted')
  }
})
$('.bookingInput').keyup(function () {
  if ($(this).val().length === 0) {
    $('.bookingHelp').removeClass('text-muted')
    $('.bookingHelp').addClass('text-danger')
  } else {
    $('.bookingHelp').removeClass('text-danger')
    $('.bookingHelp').addClass('text-muted')
  }
})
$('.quoteInput').keyup(function () {
  if ($(this).val().length === 0) {
    $('.quoteHelp').removeClass('text-muted')
    $('.quoteHelp').addClass('text-danger')
  } else {
    $('.quoteHelp').removeClass('text-danger')
    $('.quoteHelp').addClass('text-muted')
  }
})
$('#signup-submit').on('click', function () {
  e.preventDefault()
  db.collection('users')
    .doc(auth.currentUser.uid)
    .update({
      first_name: $('#signup-first_name').val(),
      last_name: $('#signup-last_name').val(),
      company_code: $('#signup-company').val(),
      tel: $('#signup-tel').val(),
    })
    .then(function () {
      alertMessage('Update Profile Complete', 'success')
      $('#signup-modal').modal('hide')
    })
    .catch(function (error) {
      alertMessage(error, 'danger')
      $('#signup-modal').modal('hide')
    })
})
$('#sentform').on('click', function () {
  getPrice(
    {
      width: $('#width').val(),
      height: $('#height').val(),
      length: $('#length').val(),
      quantity: $('#quantity').val(),
      weight: $('#weight').val(),
      type: $('.type-card.active').attr('id').split('-')[0],
    },
    { price: '#quoteprice', card: 'quoteform', swap: 'packageform' }
  )
  var elem = document.getElementById('quote')
  elem.scrollIntoView()
})
$('#price-back').click(() => {
  $('#packageform').removeClass('hide')
  $('#quoteform').addClass('hide')
})
$('#getBookingNow').on('click', function () {
  getStatus({ type: 'user' })
})
$('#profiles').on('click', function (e) {
  getProfile()
})
$('#toProfile').on('click', function (e) {
  $('#status-modal').modal('hide')
  getProfile()
})
$('#status').on('click', function () {
  getStatus({ type: 'user' })
})
$('#tracking').on('click', function () {
  getStatus({ type: 'tracking', trackingID: $('#track-input').val() })
})
$('.booking-card').on('click', function () {
  $('.booking-card').removeClass('active')
  $(this).addClass('active')
  switch ($(this).attr('id')) {
    case 'air-booking-card':
      $('.input-tran').addClass('hide')
      $('#air-trans').removeClass('hide')
      break
    case 'sea-booking-card':
      $('.input-tran').addClass('hide')
      $('#sea-trans').removeClass('hide')
      break
    case 'land-booking-card':
      $('.input-tran').addClass('hide')
      $('#land-trans').removeClass('hide')
      break
    default:
      break
  }
})
$('.contact-card').on('click', function () {
  $('.contact-card').removeClass('active')
  $(this).addClass('active')
  switch ($(this).attr('id')) {
    case 'air-contact-card':
      $('.cinput-tran').addClass('hide')
      $('#cair-trans').removeClass('hide')
      break
    case 'sea-contact-card':
      $('.cinput-tran').addClass('hide')
      $('#csea-trans').removeClass('hide')
      break
    case 'land-contact-card':
      $('.cinput-tran').addClass('hide')
      $('#cland-trans').removeClass('hide')
      break
    default:
      break
  }
})
$('.type-btn').on('click', function () {
  $('.type-btn').removeClass('active')
  $(this).addClass('active')
})
$('.type-card').on('click', function () {
  $('.type-card').removeClass('active')
  $(this).addClass('active')
})
$('.booking-type').on('click', function () {
  $('.booking-type').removeClass('active')
  $(this).addClass('active')
})
$('.contact-type').on('click', function () {
  $('.contact-type').removeClass('active')
  $(this).addClass('active')
})
$('.booking-btn').on('click', function () {
  $('.booking-btn').removeClass('active')
  $(this).addClass('active')
})
$('.transport-btn').on('click', function () {
  $('.transport-btn').removeClass('active')
  $(this).addClass('active')
})
$('#cair-swap').click(() => {
  $('.thai-air').empty()
  $('.inter-air').empty()
  $('.cair-from').toggleClass('thai-air')
  $('.cair-from').toggleClass('inter-air')
  $('.cair-to').toggleClass('thai-air')
  $('.cair-to').toggleClass('inter-air')
  db.collection('air')
    .orderBy('air_name')
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        $('.inter-air').append(`<option value="${doc.id}">${doc.data().air_name}</option>`)
      })
      $('.thai-air').append(`<option value="thai">Bangkok,Thailand</option>`)
    })
})
$('#csea-swap').click(() => {
  $('.thai-sea').empty()
  $('.inter-sea').empty()
  $('.csea-from').toggleClass('thai-sea')
  $('.csea-from').toggleClass('inter-sea')
  $('.csea-to').toggleClass('thai-sea')
  $('.csea-to').toggleClass('inter-sea')
  db.collection('sea')
    .orderBy('sea_name')
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        $('.inter-sea').append(`<option value="${doc.id}">${doc.data().sea_name}</option>`)
      })
      $('.thai-sea').append(`<option value="thai">Khlong Toei Pier,Thailand</option>`)
      $('.thai-sea').append(`<option value="thai">Laemchabang Port,Thailand</option>`)
    })
})
