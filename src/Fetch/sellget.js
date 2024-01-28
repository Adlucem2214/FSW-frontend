const token = localStorage.getItem('token');  

fetch('http://localhost:8000/stock/sales/', {
  method: 'GET',
  headers:{
    'Content-type': 'application/json',
    'Authorization': `Token ${token}`,
  }
})
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector('#saleTable tbody');

    data.forEach(sale => {
      const row = document.createElement('tr');

      const codeCell = document.createElement('td');
      codeCell.textContent = sale.id;
      row.appendChild(codeCell);


      const productCell = document.createElement('td');
      productCell.textContent = sale.product_str;
      row.appendChild(productCell);
     


      const quantityCell = document.createElement('td');
      quantityCell.textContent = sale.quantity;
      row.appendChild(quantityCell);


      const priceCell = document.createElement('td');
      priceCell.textContent = sale.total_price;
      row.appendChild(priceCell);


      const dateCell = document.createElement('td');
      dateCell.textContent = sale.date;
      row.appendChild(dateCell);
      

    
      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Error fetching sell data:', error);
  });