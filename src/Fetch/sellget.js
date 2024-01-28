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
      console.log(sale);
      const row = document.createElement('tr');

      const codeCell = document.createElement('td');
      codeCell.textContent = sale.id;
      row.appendChild(codeCell);
      console.log(codeCell);


      const productCell = document.createElement('td');
      productCell.textContent = sale.product_str;
      row.appendChild(productCell);
      console.log(productCell);


      const quantityCell = document.createElement('td');
      quantityCell.textContent = sale.quantity;
      row.appendChild(quantityCell);
      console.log(quantityCell);


      const priceCell = document.createElement('td');
      priceCell.textContent = sale.total_price;
      row.appendChild(priceCell);
      console.log(priceCell);


      const dateCell = document.createElement('td');
      dateCell.textContent = sale.date;
      row.appendChild(dateCell);
      console.log(dateCell);
      

    
      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Error fetching sell data:', error);
  });