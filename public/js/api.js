db.collection('air')
  .orderBy('air_name')
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      $('.inter-air').append(`<option value="${doc.id}">${doc.data().air_name}</option>`)
    })
    $('.thai-air').append(`<option value="thai">Bangkok,Thailand</option>`)
  })

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

$('#status').on('click', function () {
  if (status.status === 'newBooking') {
    $('.booking-card').on('click', function () {
      $('.booking-card').removeClass('active')
      $(this).addClass('active')
      $('.booking-trans').removeAttr('checked')
    })
  }
})
