var db = firebase.firestore()
var auth = firebase.auth()
var storage = firebase.storage()
var fn = firebase.functions()
let ui = new firebaseui.auth.AuthUI(auth)
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult) {
      if (authResult.additionalUserInfo.isNewUser) {
        db.collection('users')
          .doc(auth.currentUser.uid)
          .get()
          .then(function (doc) {
            $('#signup-company').val(doc.data().company_code)
            $('#signup-first_name').val(doc.data().first_name)
            $('#signup-last_name').val(doc.data().last_name)
            $('#signup-tel').val(doc.data().tel)
            storage.ref().child(`company/${doc.data().company_code}`)
          })
        $('#login-modal').modal('hide')
        $('#signup-modal').modal('show')
        $('#signup-title').html('Set Profile')
        $('.notProfile').remove()
        $('#signup-submit').html('Set Profile')
      }

      return true
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
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
}
ui.start('#firebaseui-auth-container', uiConfig)
// login
$('.hidden-link').hide()

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    db.collection('users')
      .doc(user.uid)
      .onSnapshot(function (doc) {
        $('#profile-name').html(
          `Welcome, <span class="text-primary">${doc.data().first_name}</span>`
        )
        $('#getQuoteNow').addClass('btn-secondary')
        $('#getQuoteNow').removeClass('btn-primary')
        $('#getBookingNow').removeClass('hide')
        $('#profile-nav').show()
        if (!doc.data().company_code) {
          user.delete()
        }
        localStorage.setItem('company_code', doc.data().company_code)
      })
  } else {
    console.log('no user')
    localStorage.clear()
    // No user is signed in.
    $('#login-nav').show()
  }
})

$('#logout').on('click', function () {
  firebase
    .auth()
    .signOut()
    .then(function () {
      localStorage.clear()
      location.reload()
    })
    .catch(function (error) {
      console.log(err)
    })
})
