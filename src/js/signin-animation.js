const loginDisplayController =  {
  init: function() {

    // DOM
    this.$ = {
      signInBtn: $('#sign-in'),
      signUpBtn: $('#sign-up'),

      // base
      slider: $('.slider'),
      base: $('.base'),

      // SignIn
      signinSwitch: $('.signin-switch'),
      signinForm: $('.signin-form'),

      // SignUp
      signupSwitch: $('.signup-switch'),
      signupForm: $('.signup-form')
    }

    // CSS
    this.css = {
      base: {
        width: this.$.base.css('width')
      },
      slider: {
        width: this.$.slider.css('width'),
        height: this.$.slider.css('height'),
        left: this.$.slider.css('left'),
        top: this.$.slider.css('top')
      }
    }

    this.addListeners()
  },

  addListeners: function() {
    this.$.signInBtn.on('click', function (e) {
      e.preventDefault()
      let l = loginDisplayController
      let css = l.css
      let left = parseFloat(css.slider.left)
      l.startAnimation(left, l.$.signinSwitch, l.$.signupForm, l.$.signupSwitch, l.$.signinForm)
    })

    this.$.signUpBtn.on('click', function (e) {
      e.preventDefault()
      let l = loginDisplayController
      let css = l.css
      let left = 0 - parseFloat(css.base.width) * 4 / 100;
      l.startAnimation(left, l.$.signupSwitch, l.$.signinForm, l.$.signinSwitch, l.$.signupForm)
    })
  },

  startAnimation: function(left, $switch1, $form1, $switch2, $form2) {
    $form1.fadeOut(400)
    $switch1
      .fadeOut(400)
      .queue(function(next) {
        loginDisplayController.$.slider
          .animate({
            left
          }, 200, function() {
            next()
          })
          // .animate({
          //   marginLeft: 20
          // }, 100, function() {
          //   next()
          // })
      })
      .queue(function(next) {
        $switch2
          .fadeIn(400)
          .dequeue()
        if (left < 0) {
          loginDisplayController.$.slider.css('height', "180%")
          loginDisplayController.$.slider.css('top', "-40%")
        } else {
          loginDisplayController.$.slider.css('height', loginDisplayController.css.slider.height)
          loginDisplayController.$.slider.css('top', loginDisplayController.css.slider.top)
        }
        next()
      })
      .delay(300)
      .queue(function() {
        $form2
          .fadeIn(400)
          .dequeue()
      })


  }
}

loginDisplayController.init()
