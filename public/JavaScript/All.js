// this js folder contains  ( signup - verify - forgot pass - reset pass )


//sign up js
 function validatesignup (event) {
    event.preventDefault(); // Prevent form from submitting automatically

    const pass = document.getElementById("pass1").value;
    const confirmpassw = document.getElementById("pass2").value;

    const isValid = pass.length >= 8 &&
                    /[A-Z]/.test(pass) &&
                    /\d/.test(pass);

    if (pass === "") {
        alert("Password is Required!");
        return false; 
    }
    if (pass.length < 8) {
        alert("Password must be at least 8 characters long and contain uppercase letters and numbers.");
        return false;
    }
    if (!isValid) {
        alert("Password must contain at least one uppercase letter and one digit.");
        return false;
    }
    if (confirmpassw !== pass) {
        alert("Passwords do not match.");
        return false;
    }
      alert("Password saved successfully ");
      window.location.href = 'Home.html';
    return true;

}

function playVideoAndAnimate(event) {
    event.preventDefault();

    var video = document.getElementById('signupVideo');
    var leftContainer = document.getElementById('leftContainer');
    var rightContainer = document.querySelector('.right');

    video.play();

    leftContainer.classList.add('expandLeft');
    rightContainer.classList.add('shrinkRight');

    setTimeout(function () {
        window.location.href = event.target.href;
    }, 5000);
}

rightContainer.classList.add('shrinkRight');

    document.querySelector('.signup-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent actual form submission for testing

        // Trigger animations
        document.querySelector('.left').classList.add('expandLeft');
        document.querySelector('.right').classList.add('shrinkRight');

        // Optionally, delay navigation or further action until after animation completes
        setTimeout(() => {
            // Redirect or show success message, etc.
            // window.location.href = "nextPage.html";
            alert("Form submitted!");
        }, 5000); // Wait for animation to complete (5s)
    });

    window.addEventListener('load', function () {
    document.querySelector('.right').classList.add('fade-in-init');
});

 

//login 

/* function google ()
 {
    window.href = "https://myaccount.google.com/?pli=1&nlr=1";

 }*/

  // Validation function for the login form
  async function validateLogin(event) {
    event.preventDefault();  // Stop the default form submission

    // Get the form values
    var email = document.getElementById('email').value;
    var password = document.getElementById('pass').value;

    // Check if both fields are filled out
    if (!email || !password) {
        alert("Please fill out both the email/username and password fields.");
        return false; // Prevent form submission
    }

    try {
        // Send login data via POST to backend API
        const response = await fetch('/api/v1/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Email: email, Password: password })
        });

        const data = await response.json();

        if (data.success) {
            // If login successful, redirect user to the URL sent by backend
            window.location.href = data.redirectTo;
        } else {
            // If login failed, show an alert with the error message
            alert(data.message || 'Login failed. Please try again.');
        }
    } catch (error) {
        // Handle network or unexpected errors
        console.error('Error during login:', error);
        alert('An error occurred. Please try again later.');
    }

    return false; // Prevent default form submission no matter what
}


//forgot pass js 
function sendEmailCode(event)
{
   event.preventDefault();

   // Simulate generating and sending an email code
   let emailVerificationCode = Math.floor(100000 + Math.random() * 900000);
   console.log(`Email Verification Code: ${emailVerificationCode}`);

   // Store the verification code in sessionStorage
   sessionStorage.setItem('emailVerificationCode', emailVerificationCode);

   // Redirect to the verification page
   window.location.href = 'Verify.html';
}



// js of verify 
 // Get the verification code from sessionStorage
 let emailVerificationCode = sessionStorage.getItem('emailVerificationCode');

 // Verifying the email code
 function verifyEmailCode() {
     const enteredCode = document.getElementById('emailCode').value;
     
   // Redirect to the reset page 
   window.location.href = 'reset password.html';

   /*  if (enteredCode == emailVerificationCode) {
         document.getElementById('message').textContent = 'Email verified successfully!';
         document.getElementById('errorMessage').textContent = '';
         sessionStorage.removeItem('emailVerificationCode'); // Clear the code after successful verification
     } else {
         document.getElementById('errorMessage').textContent = 'Invalid verification code.';
     }*/
 }



 //reset password 
function validateresetpass (event) {
    event.preventDefault(); // Prevent form from submitting automatically

    const pass = document.getElementById("pass1").value;
    const confirmpassw = document.getElementById("pass2").value;

    const isValid = pass.length >= 8 &&
                    /[A-Z]/.test(pass) &&
                    /\d/.test(pass);

    if (pass === "") {
        alert("Password is Required!");
        return false; 
    }
    if (pass.length < 8) {
        alert("Password must be at least 8 characters long and contain uppercase letters and numbers.");
        return false;
    }
    if (!isValid) {
        alert("Password must contain at least one uppercase letter and one digit.");
        return false;
    }
    if (confirmpassw !== pass) {
        alert("Passwords do not match.");
        return false;
    }

      alert("Password saved successfully ");
      window.location.href = 'logIn.html';
    return true;
   
}
 
