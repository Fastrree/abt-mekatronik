// Google Analytics Initialization
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-6VF25T2SF3', {
  'anonymize_ip': true,
  'cookie_flags': 'SameSite=None;Secure'
});

// Splash Screen Hide
window.addEventListener('load', function() {
  setTimeout(function() {
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
      splashScreen.classList.add('hidden');
    }
  }, 400);
});
