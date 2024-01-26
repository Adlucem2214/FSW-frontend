const token = localStorage.getItem('token');  

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
      const updateLink = document.createElement('a');
      updateLink.href = `/update-supplier/${supplier.code}`; // Replace with the appropriate URL for update
      updateLink.textContent = 'Update';
      actionsCell.appendChild(updateLink);

      const deleteLink = document.createElement('a');
      deleteLink.href = `/delete-supplier/${supplier.code}`; // Replace with the appropriate URL for delete
      deleteLink.textContent = 'Delete';
      actionsCell.appendChild(deleteLink);

      row.appendChild(actionsCell);
    
      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Error fetching supplier data:', error);
  });