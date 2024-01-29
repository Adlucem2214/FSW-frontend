const token = localStorage.getItem('token');  
const nameValue = document.getElementById('name')
const detailValue = document.getElementById('c')


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