$('#sentform').on('click', function () {
  let step = $('.step.is-active').attr('id')
  switch (step) {
    case 'package-step':
      $('#package-step').attr('class', 'is-complete step')
      $('#transport-step').attr('class', 'is-active step')
      $('#package-step').on('click', function () {
        $('#transport-step').attr('class', 'step')
        $('#package-step').attr('class', 'is-active step')
        $('.quote-form').addClass('hide')
        $('#packageform').removeClass('hide')
        $('#transport-step').on('click', function () {
          $('#package-step').attr('class', 'is-complete step')
          $('#transport-step').attr('class', 'is-active step')
          $('#packageform').addClass('hide')
          $('#transportform').removeClass('hide')
        })
      })
      let package_item = {
        width: '',
        height: '',
        depth: '',
        weight: '',
        quantity: '',
        type: '',
        item_name: '',
      }
      package_item.width = $('#width').val()
      package_item.height = $('#height').val()
      package_item.depth = $('#depth').val()
      package_item.weight = $('#weight').val()
      package_item.quantity = $('#quantity').val()
      package_item.item_name = $('#item-name').val()
      package_item.type = $('.type.active').attr('id')
      $('#packageform').addClass('hide')
      $('#transportform').removeClass('hide')
      getDropdown('air')
      $('.type-card').on('click', function () {
        let transId = $(this).attr('id')
        switch (transId) {
          case 'air-type -card':
            $('.type-card').removeClass('active')
            $('#air-type-card').addClass('active')
            $('.form-trans').removeAttr('checked')
            $('#air_type').attr('checked', 'checked')
            $('#land-fixed').addClass('hide')
            break
          case 'sea-type-card':
            $('.type-card').removeClass('active')
            $('#sea-type-card').addClass('active')
            $('.form-trans').removeAttr('checked')
            $('#sea_type').attr('checked', 'checked')
            $('#land-fixed').addClass('hide')
            break
          case 'land-type-card':
            $('.type-card').removeClass('active')
            $('#land-type-card').addClass('active')
            $('.form-trans').removeAttr('checked')
            $('#land_type').attr('checked', 'checked')
            $('#land-fixed').removeClass('hide')
            break
          default:
            break
        }
      })
      break
    case 'transport-step':
      $('#transport-step').attr('class', 'is-complete step')
      $('#quote-step').attr('class', 'is-active step')
      $('#package-step').on('click', function () {
        $('#transport-step').attr('class', ' step')
        $('#quote-step').attr('class', ' step')
        $('#package-step').attr('class', 'is-active step')
        $('.quote-form').addClass('hide')
        $('#packageform').removeClass('hide')
        $('#sentformcontainer').removeClass('hide')
      })
      $('#transport-step').on('click', function () {
        $('#sentformcontainer').removeClass('hide')
        $('#quote-step').attr('class', 'step')
        $('#transport-step').attr('class', 'is-active step')
        $('.quote-form').addClass('hide')
        $('#transportform').removeClass('hide')
        $('#quote-step').on('click', function () {
          $('#transport-step').attr('class', 'is-complete step')
          $('#quote-step').attr('class', 'is-active step')
          $('#sentformcontainer').addClass('hide')
          $('#transportform').addClass('hide')
          $('#quoteform').removeClass('hide')
        })
      })
      $('#sentformcontainer').addClass('hide')
      $('#transportform').addClass('hide')
      $('#quoteform').removeClass('hide')
    default:
      break
  }
})
alertMessage = (message, type) => {
  $('#alert_text').html(message)
  $('.alert').removeClass('alert-success alert-danger alert-warning hide')
  $('.alert').addClass(`alert-${type}`)
  $('.alert').addClass('show fade')
}
$('#profiles').on('click', function (e) {
  $('#signup-modal').modal('show')
  $('#changePass').html('New Password')
  $('#signup-title').html('Update Profile')
  $('.notProfile').remove()
  $('#signup-submit').html('Update Profile')
  $('#signup-submit').on('click', function () {
    e.preventDefault()
    db.collection('users')
      .doc(auth.currentUser.uid)
      .update({
        first_name: $('#signup-first_name').val(),
        last_name: $('#signup-last_name').val(),
        company_name: $('#signup-company').val(),
        tel: $('#signup-tel').val(),
        address: $('#signup-address').val(),
      })
      .then(function () {
        alertMessage('Update Profile Complete', 'success')
      })
      .catch(function (error) {
        alertMessage(error, 'danger')
      })
    $('#signup-modal').modal('hide')
  })
  db.collection('users')
    .doc(auth.currentUser.uid)
    .get()
    .then(function (doc) {
      $('#signup-company').val(doc.data().company_name)
      $('#signup-first_name').val(doc.data().first_name)
      $('#signup-last_name').val(doc.data().last_name)
      $('#signup-tel').val(doc.data().tel)
      $('#signup-address').val(doc.data().address)
    })
})
$('#status').on('click', function () {
  $('booking-submit').on('click', function () {
    let transport_type = $('.booking-card active').attr(id).split('-')[0]
    let origin, destination
    switch (transport_type) {
      case 'air':
        origin = $('air-from option').filter(':selected').val()
        destination = $('air-to option').filter(':selected').val()
        break
      case 'sea':
        origin = $('sea-from option').filter(':selected').val()
        destination = $('sea-to option').filter(':selected').val()
        break
      case 'land':
        origin = $('land-from option').filter(':selected').val()
        destination = $('land-to option').filter(':selected').val()
        break
      default:
        break
    }
    //to do upload file
    db.collection('status')
      .doc(auth.currentUser.uid)
      .update({
        width: $('#booking_width').val(),
        height: $('#booking_height').val(),
        depth: $('#booking_depth').val(),
        quantity: $('#booking_quantity').val(),
        weight: $('#booking_weight').val(),
        package_type: $('.booking-type active').html(),
        transport_type,
        origin,
        destination,
        eta: $('#booking_eta').val(),
        package_list: $('#booking_package_list').prop('files'),
        invoice: $('#booking_invoice').prop('files'),
      })
  })
  db.collection('users')
    .doc(auth.currentUser.uid)
    .get()
    .then(function (doc) {
      console.log(doc.data().status)
      switch (doc.data().status) {
        case 'nodata':
          $('#nodata').addClass('is-active')
          break
        case 'booking':
          $('#nodata').addClass('is-complete')
          $('#nodata').html('<span>Booking Detail</span>')
          break
        case 'confirm_appointment':
          $('#nodata').addClass('is-complete')
          break
        case 'appointment':
          $('#nodata').addClass('is-complete')
          $('#appointment').addClass('is-active')
          $('#appointment').html('<span>Appointment</span>')
          break
        case 'invoice':
          $('#nodata').addClass('is-complete')
          $('#appointment').addClass('is-complete')
          $('#invoice').addClass('is-active')
          break
        case 'receipt':
          $('#nodata').addClass('is-complete')
          $('#appointment').addClass('is-complete')
          $('#invoice').addClass('is-complete')
          $('#receipt').addClass('is-active')
          break
        default:
          break
      }
      $('#status-modal').modal('show')
    })
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
$('.type-btn').on('click', function () {
  $('.type-btn').removeClass('active')
  $(this).addClass('active')
})
$('.booking-type').on('click', function () {
  $('.booking-type').removeClass('active')
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
