var db = firebase.firestore()
var auth = firebase.auth()
var storage = firebase.storage()
var fn = firebase.functions()
let ui = new firebaseui.auth.AuthUI(auth)
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult) {
      $('#login-modal').modal('hide')
      return false
    },

    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none'
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
}
ui.start('#firebaseui-auth-container', uiConfig)
// login
$('.hidden-link').hide()

auth.onAuthStateChanged(function (user) {
  if (user) {
    db.collection('users')
      .doc(user.uid)
      .onSnapshot(function (doc) {
        if (!doc.exists) {
          return $('#profile-modal').modal('show')
        }
        $('#profile-name').html(
          `Welcome, <span class="text-primary">${doc.data().first_name}</span>`
        )
        $('#getQuoteNow').addClass('btn-secondary')
        $('#getQuoteNow').removeClass('btn-primary')
        $('#getBookingNow').removeClass('hide')
        $('#profile-nav').show()

        localStorage.setItem('company_code', doc.data().company_code)
      })
  } else {
    localStorage.clear()
    $('#login-nav').show()
  }
})

$('#logout').on('click', function () {
  auth
    .signOut()
    .then(function () {
      localStorage.clear()
      location.reload()
    })
    .catch(function (error) {
      console.log(err)
    })
})
