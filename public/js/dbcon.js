var db = firebase.firestore()
var auth = firebase.auth()
var storage = firebase.storage()
let ui = new firebaseui.auth.AuthUI(auth)
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult) {
      if (authResult.additionalUserInfo.isNewUser) {
        db.collection('users')
          .doc(authResult.user.uid)
          .set({
            first_name: authResult.user.displayName.split(' ')[0],
            last_name: authResult.user.displayName.split(' ')[1],
            tel: authResult.user.phoneNumber,
            role: 'customer',
            status: 'nodata',
          })
        storage.ref().child(`users/${auth.currentUser.uid}`)
        db.collection('status').doc(authResult.user.uid).set({
          booking: null,
        })
      }
      $('#login-modal').modal('hide')
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
$('#profile-nav').hide()
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
        $('#login-nav').hide()
      })
  } else {
    // No user is signed in.
    $('#profile-nav').hide()
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
