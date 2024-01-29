const token = localStorage.getItem('token');  
const nameValue = document.getElementById('name')
const detailValue = document.getElementById('c')
const formE1 = document.getElementById('form');


fetch('http://localhost:8000/stock/suppliers/', {
  method: 'GET',
  headers:{
    'Content-type': 'application/json',
    'Authorization': `Token ${token}`,
  }
})
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector('#supplierTable tbody');

    data.forEach(supplier => {
      const row = document.createElement('tr');

      const codeCell = document.createElement('td');
      codeCell.textContent = supplier.id;
      row.appendChild(codeCell);

      const nameCell = document.createElement('td');
      nameCell.textContent = supplier.name;
      row.appendChild(nameCell);

      const contactCell = document.createElement('td');
      contactCell.textContent = supplier.contact_info;
      row.appendChild(contactCell);

      const actionsCell = document.createElement('td');

      const updateLink = document.createElement('button');
      
      updateLink.textContent = 'Update';
      actionsCell.appendChild(updateLink);

      updateLink.addEventListener('click', (event) => {
        event.preventDefault();
        populate(supplier.id, supplier.name, supplier.contact_info, row); // Call the deleteSupplier function passing the supplier ID and row element
       });
        

      const deleteLink = document.createElement('button');
      // deleteLink.href = `http://localhost:8000/stock/suppliers/${supplier.id}`; // Replace with the appropriate URL for delete
      deleteLink.textContent = 'Delete';
      actionsCell.appendChild(deleteLink);

      deleteLink.addEventListener('click', (event) => {
        event.preventDefault();
        deleteSupplier(supplier.id, row); // Call the deleteSupplier function passing the supplier ID and row element
      });

      actionsCell.appendChild(deleteLink);

      row.appendChild(actionsCell);
    
      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Error fetching supplier data:', error);
  });

  function deleteSupplier(supplierId, row) {
    const token = localStorage.getItem('token');
  
    fetch(`http://localhost:8000/stock/suppliers/${supplierId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Token ${token}`,
      }
    })
      .then(response => {
        if (response.ok) {
          // Delete the row from the table
          row.remove();
        } else {
          alert ('You can not delete this supplier ,Supplier is related to product')
          throw new Error('Failed to delete the supplier.');
        }
      })
      .catch(error => {
        console.error('Error deleting supplier:', error);
      });
}

const suppliercode = document.getElementById('updatecode')
const suppliername = document.getElementById('updatename')
const suppliercontact = document.getElementById('updatecontact')


function populate(id, name, contact, row) {
  console.log(id, name, contact);

  suppliercode.value = id;
  console.log(suppliercode.value)
  suppliername.value = name;
  suppliercontact.value = contact;
}

  formE1.addEventListener('submit', (event) => {
    event.preventDefault();

    const id = suppliercode.value;
    const name = suppliername.value;
    const contact = suppliercontact.value;

    const data = {
      name: name,
      contact_info: contact
    };

    fetch(`http://localhost:8000/stock/suppliers/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        response.json();
        if (response.ok) {
          alert('Supplier updated successfully!');
        } else {
          alert('There was a problem updating Supplier');
        }
      })
      .then(data => {
        // Handle the response from the API
        console.log(data);
      })
      .catch(error => console.log(error));
  });

  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const tableBody = document.querySelector('#supplierTable tbody');
  
  // Function to fetch and render the filtered data
  function fetchAndRenderFilteredData(searchTerm) {
    const token = localStorage.getItem('token');
    const url = `http://localhost:8000/stock/suppliers/?search=${encodeURIComponent(searchTerm)}`;
  
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Token ${token}`,
      }
    })
      .then(response => response.json())
      .then(data => {
        renderData(data);
      })
      .catch(error => {
        console.error('Error fetching filtered supplier data:', error);
      });
  }
  
  // Function to handle search button click
  function handleSearch() {
    const searchTerm = searchInput.value.trim();
  
    if (searchTerm !== '') {
      // Fetch and render the filtered data
      fetchAndRenderFilteredData(searchTerm);
    } else {
      // If search term is empty, fetch and render all data
      fetchAndRenderFilteredData('');
    }
  }
  
  // Add event listener to search button click
  searchButton.addEventListener('click', handleSearch);
  
  // Add event listener to Enter key press in search input
  searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  });