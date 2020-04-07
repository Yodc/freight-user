var db = firebase.firestore()
db.collection('air')
  .orderBy('air_name')
  .onSnapshot(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      $('.inter-air').append(`<option value="${doc.id}">${doc.data().air_name}</option>`)
    })
  })
$('.thai-air').append(`<option value="thai">Bankok,thailand</option>`)

db.collection('sea')
  .orderBy('sea_name')
  .onSnapshot(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      $('.inter-sea').append(`<option value="${doc.id}">${doc.data().sea_name}</option>`)
    })
  })
$('.thai-sea').append(`<option value="thai">Bankok,thailand</option>`)

$('#status').on('click', function () {
  if (status.status === 'newBooking') {
    $('.booking-card').on('click', function () {
      $('.booking-card').removeClass('active')
      $(this).addClass('active')
      $('.booking-trans').removeAttr('checked')
    })
  }
})
