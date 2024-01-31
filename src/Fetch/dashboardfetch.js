fetch('http://localhost:8000/stock/products/')
    .then(response => response.json())
    .then(data => {
      // Update the product count in the card
      document.getElementById('productCount').textContent = data.length;
    })
    .catch(error => {
      console.error('Error:', error);
    });

    fetch('http://localhost:8000/stock/sales/')
    .then(response => response.json())
    .then(data => {
      // Extract the total_price from each sale and calculate the total sales amount
      let totalSales = data.reduce((acc, sale) => acc + parseFloat(sale.total_price), 0);

      // Update the sales amount in the card
      document.getElementById('salesAmount').textContent = `$${totalSales.toFixed(2)}`;
    })
    .catch(error => {
      console.error('Error:', error);
    });
    fetch('http://localhost:8000/stock/producttypes/')
    .then(response => response.json())
    .then(data => {
      // Get the number of categories
      const categoryCount = data.length;

      // Update the category count in the card
      document.getElementById('categoryCount').textContent = categoryCount;
    })
    .catch(error => {
      console.error('Error:', error);
    });