$(document).ready(function() {
    $('#loginForm').submit(function(event) {
      event.preventDefault();
      const username = $('#username').val();
      const password = $('#password').val();
      const role = $('input[name="role"]:checked').val(); // Get the selected role (employee or employer)

       // Validate email format
    if (!isValidEmail(username)) {
        alert('Please enter a valid email address.');
        return;
      }
  
      // Validate ID format (custom pattern here, modify according to your requirements)
      if (!isValidID(password)) {
        alert('Please enter a valid ID.');
        return;
      }
      const data = {
        email: username,
        id: password
      };
      var settings = {
        "url": "http://localhost:3000/login",
        "method": "POST",
        "timeout": 0,
        "headers": {
         
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          "email": username,
          "id": password
        }),
      };
      
      $.ajax({
        url: 'http://localhost:3000/login',
        method: 'POST',
        timeout: 0,
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(data),
      }).done(function(response) {
        // Handle successful login
        localStorage.setItem('token', response.token);
        console.log(localStorage.getItem('token'));
        if (role === 'employee') {
          window.location.href = './worker_personal_area.html'; // Redirect to employee registration page
        } else if (role === 'employer') {
          window.location.href = './employer_personal_area.html'; // Redirect to employer registration page
        }
      }).fail(function(jqXHR, textStatus, errorThrown) {
        // Handle login error (Bad Request)
        if (jqXHR.status === 400) {
          console.log(jqXHR.responseText); // Log the server's error message
          alert('You are not a subscriber to the registration site, click register');
        } else {
          // Handle other errors, such as server not reachable, etc.
          alert('An error occurred. Please try again later.');
        }
      });
    });
    
    // Handle the "Register here" link click event
    $('a[href="registration.html"]').click(function(event) {
      event.preventDefault();
      const role = $('input[name="role"]:checked').val(); // Get the selected role (employee or employer)
        //var x=document.getElementById("a");
      if (role === 'employee') {
        window.location.href = './worker_register.html'; // Redirect to employee registration page
      } else if (role === 'employer') {
        window.location.href = './employer_register.html'; // Redirect to employer registration page
      }
    });

      // Helper function to validate email format using regular expression
   function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidID(id) {
    if (typeof id !== 'string' || id.length !== 9 || isNaN(id)) {
      return false; // The ID should be a string of 9 digits
    }
  
    const idDigits = id.split('').map(Number);
    const sum = idDigits.reduce((acc, digit, index) => {
      const weight = index % 2 === 0 ? 1 : 2;
      const weightedDigit = digit * weight;
      return acc + (weightedDigit > 9 ? weightedDigit - 9 : weightedDigit);
    }, 0);
  
    return sum % 10 === 0;
  }
  

  
  });

 
  