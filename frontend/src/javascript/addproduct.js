$(document).ready(function() {
    $('.dropdown .submenu').hide();
      $('.dropdown').click(function() {
        $(this).find('.submenu').toggle();
      });
    });
  
    document.addEventListener('touchstart', function(event) {
      event.preventDefault(); 
      event.stopPropagation(); 
    }, { passive: false });


    const addButton = document.getElementById('add-button');
    const popup = document.getElementById('popup');
    const submitButton = document.getElementById('submit-button');
    
    addButton.addEventListener('click', () => {
      popup.style.display = 'block';
    });
    
    submitButton.addEventListener('click', () => {
      // Handle form submission logic here
      // You can access the input values using document.getElementById()
      // For example: const input1Value = document.getElementById('input1').value;
    
      // After handling the form submission, hide the popup
      popup.style.display = 'none';
    });

    function showPopup() {
      var popup = document.getElementById("popup");
      popup.style.display = "block";
    }
    
    function closePopup() {
      var popup = document.getElementById("popup");
      popup.style.display = "none";
    }
    