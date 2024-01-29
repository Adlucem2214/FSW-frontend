document.getElementById('logoutBtn').addEventListener('click', function() {

    localStorage.removeItem('token');
    // Perform the logout logic
    console.log('User has clicked the logout button. Logging out...');

    // Redirect the user to the login page after logout
    window.location.href = '../src/login.html'; // Replace '/login' with the actual login page URL
});