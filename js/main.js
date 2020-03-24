// init
let width = '',
  height = '',
  depth = '',
  weight = '',
  quantity = '',
  type = '',
  item_name = ''
let from = '',
  to = '',
  trans_type = ''
let first_name = '',
  last_name = '',
  token = '',
  status = ''
//auth
$('#profile-nav').hide()
if (localStorage.getItem('token')) {
  $('#login-nav').hide()
  $('#profile-nav').show()
  first_name = localStorage.getItem('first_name')
  last_name = localStorage.getItem('last_name')
  token = localStorage.getItem('token')
  $('#profile-name').html(`Welcome, ${first_name}`)
}
$('#logout').on('click', function() {
  localStorage.clear()
  location.reload()
})
$('#login-submit').on('click', function(e) {
  e.preventDefault()
  let email = $('#login-email').val()
  let password = $('#login-password').val()
  console.log({ email, password })
  login(email, password)
})

$('#sentform').on('click', function() {
  let step = $('.step.is-active').attr('id')
  switch (step) {
    case 'package-step':
      $('#package-step').attr('class', 'is-complete step')
      $('#transport-step').attr('class', 'is-active step')
      $('#package-step').on('click', function() {
        $('#transport-step').attr('class', 'step')
        $('#package-step').attr('class', 'is-active step')
        $('.quote-form').addClass('hide')
        $('#packageform').removeClass('hide')
        $('#transport-step').on('click', function() {
          $('#package-step').attr('class', 'is-complete step')
          $('#transport-step').attr('class', 'is-active step')
          $('#packageform').addClass('hide')
          $('#transportform').removeClass('hide')
        })
      })

      width = $('#width').val()
      height = $('#height').val()
      depth = $('#depth').val()
      weight = $('#weight').val()
      quantity = $('#quantity').val()
      item_name = $('#item-name').val()
      type = $('.type.active').attr('id')
      $('#packageform').addClass('hide')
      $('#transportform').removeClass('hide')
      getDropdown('air')
      $('.type-card').on('click', function() {
        let transId = $(this).attr('id')
        switch (transId) {
          case 'air-type-card':
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
      $('#package-step').on('click', function() {
        $('#transport-step').attr('class', ' step')
        $('#quote-step').attr('class', ' step')
        $('#package-step').attr('class', 'is-active step')
        $('.quote-form').addClass('hide')
        $('#packageform').removeClass('hide')
        $('#sentformcontainer').removeClass('hide')
      })
      $('#transport-step').on('click', function() {
        $('#sentformcontainer').removeClass('hide')
        $('#quote-step').attr('class', 'step')
        $('#transport-step').attr('class', 'is-active step')
        $('.quote-form').addClass('hide')
        $('#transportform').removeClass('hide')
        $('#quote-step').on('click', function() {
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
clearTypeActive = () => {
  $('.type-btn').removeClass('active')
}

$('#type-box').on('click', function() {
  clearTypeActive()
  $(this).addClass('active')
})
$('#type-carton').on('click', function() {
  clearTypeActive()
  $(this).addClass('active')
})
$('#type-pallet').on('click', function() {
  clearTypeActive()
  $(this).addClass('active')
})
$('#type-wooden').on('click', function() {
  clearTypeActive()
  $(this).addClass('active')
})
clearBookingActive = () => {
  $('.booking-btn').removeClass('active')
}
$('#booking-box').on('click', function() {
  clearBookingActive()
  $(this).addClass('active')
})
$('#booking-carton').on('click', function() {
  clearBookingActive()
  $(this).addClass('active')
})
$('#booking-pallet').on('click', function() {
  clearBookingActive()
  $(this).addClass('active')
})
$('#booking-wooden').on('click', function() {
  clearBookingActive()
  $(this).addClass('active')
})
cleartTransportActive = () => {
  $('.transport-btn').removeClass('active')
}
$('#transport-air').on('click', function() {
  cleartTransportActive()
  $(this).addClass('active')
})
$('#transport-sea').on('click', function() {
  cleartTransportActive()
  $(this).addClass('active')
})
$('#transport-land').on('click', function() {
  cleartTransportActive()
  $(this).addClass('active')
})
// api
const baseapi = 'localhoost:8000/api'
getDropdown = type => {
  $.get(`${baseapi}/${type}`, function(data, status) {
    console.log(data, status)
  })
}
$('#status').on('click', function() {
  $.ajax({
    url: `${baseapi}/status`,
    type: 'Get',
    contentType: 'application/json;charset=utf-8',

    success: function(results) {
      console.log('Ticket ' + results.id + ' successfully created')
    },
    error: function(x, y, z) {
      console.log('Network error has occurred. Please try again!', { x, y, z })
      status = {
        status: 'newBooking',
        data: {
          newBooking: {
            width: '100',
            height: '100',
            depth: '100',
            weight: '100',
            type: '100',
            item_name: 'Atomic Bomb',
            from: 'Bankok, Thailand',
            to: 'Hiroshima,Japan',
            trans_type: 'Air'
          },
          booking: null,
          invoice: null,
          receipt: null
        }
      }
      if (status.status === 'newBooking') {
        getDropdown('air')
        $('.booking-card').on('click', function() {
          let transId = $(this).attr('id')
          switch (transId) {
            case 'air-booking-card':
              $('.booking-card').removeClass('active')
              $('#air-booking-card').addClass('active')
              $('.booking-trans').removeAttr('checked')
              $('#air_booking').attr('checked', 'checked')
              $('#input-trans').addClass('hide')
              $('#select-trans').removeClass('hide')
              break
            case 'sea-booking-card':
              $('.booking-card').removeClass('active')
              $('#sea-booking-card').addClass('active')
              $('.booking-trans').removeAttr('checked')
              $('#sea_booking').attr('checked', 'checked')
              $('#input-trans').addClass('hide')
              $('#select-trans').removeClass('hide')
              break
            case 'land-booking-card':
              $('.booking-card').removeClass('active')
              $('#land-booking-card').addClass('active')
              $('.booking-trans').removeAttr('checked')
              $('#land_booking').attr('checked', 'checked')
              $('#input-trans').removeClass('hide')
              $('#select-trans').addClass('hide')
              break
            default:
              break
          }
        })
      }
    }
  })
})
login = (email, password) => {
  $.ajax({
    url: `${baseapi}/login`,
    type: 'Get',
    contentType: 'application/json;charset=utf-8',
    data: {
      email,
      password
    },
    success: function(results) {
      console.log('Ticket ' + results.id + ' successfully created')
    },
    error: function(x, y, z) {
      localStorage.setItem('token', 'lbnbnige231a@')
      localStorage.setItem('first_name', 'Pranitarn')
      localStorage.setItem('last_name', 'Fuaengfuvongrat')
      location.reload()
      console.log('Network error has occurred. Please try again!', { x, y, z })
    }
  })
}
