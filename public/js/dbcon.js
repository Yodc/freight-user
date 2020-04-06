var ui = new firebaseui.auth.AuthUI(firebase.auth())
var uiConfig = {
  callbacks: {
    signInSuccess: function() {
      $('#login-modal').modal('hide')
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none'
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
}
ui.start('#firebaseui-auth-container', uiConfig)
// login
$('#profile-nav').hide()
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $('#login-nav').hide()
    $('#profile-nav').show()
    $('#profile-name').html(
      ` <img class="avatar" src="${user.photoURL}"avatar="${user.displayName}">`
    )
  } else {
    // No user is signed in.
    $('#profile-nav').hide()
    $('#login-nav').show()
  }
})

$('#logout').on('click', function() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      localStorage.clear()
      location.reload()
    })
    .catch(function(error) {
      console.log(err)
    })
})
