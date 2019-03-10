function includeRouter(cb) {
  var content, file, xhttp, i;
  document.body.addEventListener('click', function (e) {
    file = e.target.getAttribute('route-link');
    if (file) {
      content = document.getElementById('content');
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            content.innerHTML = this.responseText; 
            var scripts = content.getElementsByTagName('script');
            for (var i = 0; i < scripts.length; i++) {
              eval(scripts[i].text); 
            }
            setTimeout(function() {
              cb(e);
            }, 0)
          }
          if (this.status == 404) {
            content.innerHTML = 'Page not found.';
          }
        }
      }      
      xhttp.open('GET', file, true);
      xhttp.send();
    }
  });
}