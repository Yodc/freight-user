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
$('#profiles').on('click', function () {
  $('#signup-modal').modal('show')
  $('#changePass').html('New Password')
  $('#signup-title').html('Update Profile')
  $('#signup-email').remove()
  if (firebase.auth().currentUser) {
  }
})
$('.booking-card').on('click', function () {
  $('.booking-card').removeClass('active')
  $(this).addClass('active')
  switch ($(this).attr('id')) {
    case 'air-booking-card':
      $('#air_booking').attr('checked', 'checked')
      $('.input-tran').addClass('hide')
      $('#air-trans').removeClass('hide')
      break
    case 'sea-booking-card':
      $('#sea_booking').attr('checked', 'checked')
      $('.input-tran').addClass('hide')
      $('#sea-trans').removeClass('hide')
      break
    case 'land-booking-card':
      $('#land_booking').attr('checked', 'checked')
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
$('.booking-btn').on('click', function () {
  $('.booking-btn').removeClass('active')
  $(this).addClass('active')
})
$('.transport-btn').on('click', function () {
  $('.transport-btn').removeClass('active')
  $(this).addClass('active')
})
