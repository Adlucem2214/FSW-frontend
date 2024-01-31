const token = localStorage.getItem('token');
fetch('http://localhost:8000/stock/products/',
{
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token},`,
  },
}
)
    .then(response => response.json())
    .then(data => {
      // Update the product count in the card
      document.getElementById('productCount').textContent = data.length;
    })
    .catch(error => {
      console.error('Error:', error);
    });

fetch('http://localhost:8000/stock/sales/',
{
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token},`,
  },
}
)
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
fetch('http://localhost:8000/stock/producttypes/',
{
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token},`,
  },
}
)
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

    fetchTableData();

        async function fetchTableData() {
            try {
              const response = await fetch('http://localhost:8000/stock/sales/',
                {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token},`,
                  },
              });
              let data = await response.json();
              
              data.sort((a, b) => new Date(b.date) - new Date(a.date));
              
              data = data.slice(0, 5);

                // Access the table element
                const salesTable = document.getElementById('sales-table');

                // Iterate over the data and populate the table
                data.forEach((row, index) => {
                    console.log(data)
                    // Create a new row
                    const newRow = document.createElement('tr');

                    // Create and populate the cells
                    const indexCell = document.createElement('td');
                    indexCell.textContent = index + 1;
                    newRow.appendChild(indexCell);
                    indexCell.id = 'indexid'

                    const productNameCell = document.createElement('td');
                    productNameCell.textContent = row.product;
                    newRow.appendChild(productNameCell);
                    productNameCell.id = 'productid'

                    const dateCell = document.createElement('td');
                    dateCell.textContent = row.date;
                    newRow.appendChild(dateCell);
                    dateCell.id = 'dateid'


                    const totalSalesCell = document.createElement('td');
                    totalSalesCell.textContent = row.total_price;
                    newRow.appendChild(totalSalesCell);
                    totalSalesCell.id= 'salesid'


                    // Append the new row to the table
                    salesTable.appendChild(newRow);
                });
            } catch (error) {
                console.log('Error fetching table data:', error);
            }
        }