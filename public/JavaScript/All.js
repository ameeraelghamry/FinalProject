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

        // delay navigation or further action until after animation completes
        setTimeout(() => {
            // Redirect or show success message
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
async function sendEmailCode(event) {
    event.preventDefault();
const email = document.getElementById('email').value.trim().toLowerCase();


    try {
        const response = await fetch('/api/v1/users/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Email: email })  

        });

        const data = await response.json();

        if (response.ok) {
            sessionStorage.setItem('resetEmail', email); // Store email for later
            alert(data.message || 'Verification code sent to your email.');
            window.location.href = '/verify'; // Route that renders verify page
        } else {
            alert(data.message || 'Failed to send code.');
        }
    } catch (err) {
        console.error(err);
        alert('Something went wrong. Please try again later.');
    }
}



// js of verify 
async function verifyEmailCode() {
    const code = document.getElementById('emailCode').value;
const email = sessionStorage.getItem('resetEmail')?.trim().toLowerCase();


    if (!email || !code) {
        alert('Missing email or code.');
        return;
    }

    try {
        const response = await fetch('/api/v1/users/verify-code', {  //make sure of this line 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Email: email , code })
        });

        const data = await response.json();

       if (response.ok) {
  alert(data.message || 'Code verified.');
  const email = sessionStorage.getItem('resetEmail') || '';
  window.location.href = `/resetpass?email=${encodeURIComponent(email)}`;
}
 else {
            document.getElementById('errorMessage').textContent = data.message || 'Invalid code.';
        }
    } catch (err) {
        console.error(err);
        alert('Server error.');
    }
}




 //reset password 

  async function validateresetpass(event) {
  event.preventDefault();
const email = document.getElementById('email').value.trim().toLowerCase();

  const newPassword    = document.getElementById('pass1').value.trim();
  const confirmPassword = document.getElementById('pass2').value.trim();

  // strength check: ≥8 chars, at least one lowercase + one uppercase
  const strong =  newPassword.length >= 8 &&
                  /[a-z]/.test(newPassword) &&
                  /[A-Z]/.test(newPassword) &&
                   /\d/.test(newPassword); // checks for at least one digit

  if (!strong) {
    alert("Password must be at least 8 characters and include both upper ,lower‑case letters and at least one digit .");
    return;
  }

  // confirm match
  if (newPassword !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const response = await fetch("/api/v1/users/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Email: email, newPassword, confirmPassword })
    });

    const result = await response.json();

    if (response.ok) {
      alert("Password reset successful!");
      window.location.href = "/login";
    } else {
      alert(" " + result.message);
    }
  } catch (err) {
    console.error("Reset password error:", err);
    alert("Server error occurred.");
  }
}


 
