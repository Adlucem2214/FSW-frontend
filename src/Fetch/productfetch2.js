const token = localStorage.getItem('token');


fetch('http://localhost:8000/stock/products/', {
  method: 'GET',
  headers:{
    'Content-type': 'application/json',
    'Authorization': `Token ${token}`,
  }
})
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector('#productTable tbody');

    data.forEach(product => {
      const row = document.createElement('tr');

      const codeCell = document.createElement('td');
      codeCell.textContent = product.id;
      row.appendChild(codeCell);

      const nameCell = document.createElement('td');
      nameCell.textContent = product.productname;
      row.appendChild(nameCell);

      const supplierCell = document.createElement('td');
      supplierCell.textContent = product.supplier_str;
      row.appendChild(supplierCell);

      
      const ProductTypeCell = document.createElement('td');
      ProductTypeCell.textContent = product.product_type_str;
      row.appendChild(ProductTypeCell);

      
      const quantityCell = document.createElement('td');
      quantityCell.textContent = product.quantity;
      row.appendChild(quantityCell);

      
      const priceCell = document.createElement('td');
      priceCell.textContent = product.price;
      row.appendChild(priceCell);

      
      const propertyCell = document.createElement('td');
      propertyCell.textContent = product.property_str;
      row.appendChild(propertyCell);

      const actionsCell = document.createElement('td');
      const updateLink = document.createElement('button');// Replace with the appropriate URL for update
      updateLink.textContent = 'Update';
      actionsCell.appendChild(updateLink);


      updateLink.addEventListener('click', (event) => {
        event.preventDefault();
        populate(product.id, product.productname, product.supplier, product.product_type, product.quantity, product.price, product.property, threshold, row); // Call the deleteSupplier function passing the supplier ID and row element
       });

      const deleteLink = document.createElement('button');
      // deleteLink.href = `http://localhost:8000/stock/products/${product.id}`; // Replace with the appropriate URL for delete
      deleteLink.textContent = 'Delete';
      actionsCell.appendChild(deleteLink);

      deleteLink.addEventListener('click', (event) => {
        event.preventDefault();
        deleteProduct(product.id, row); // Call the deleteSupplier function passing the supplier ID and row element
      });
      actionsCell.appendChild(deleteLink);

      row.appendChild(actionsCell);
    
      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Error fetching product data:', error);
  });

  function deleteProduct(productId, row) {
    const token = localStorage.getItem('token');
  
    fetch(`http://localhost:8000/stock/products/${productId}`, {
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
          alert('You can not delete this product, Product is related to Sale')
          throw new Error('Failed to delete the supplier.');
        }
      })
      .catch(error => {
        console.error('Error deleting supplier:', error);
      });
  }

  
// const productId = document.getElementById('product-id');
const productName = document.getElementById('product-name');
console.log(productName.value)  
// const supplier = document.getElementById('supplier');
// console.log(supplier.value)
// const productType = document.getElementById('product-type');
// console.log(productType.value)
const quantity = document.getElementById('quantity');
console.log(quantity.value)
const price = document.getElementById('price');
console.log(price.value)
// const property = document.getElementById('property');
// console.log(property.value)
const threshold = document.getElementById('threshold');
console.log(threshold.value)

function populate(id, productname, supplier, product_type, quantity, price, property, threshold, row) {
  // productId.value = id;
  productName.value = productname;
  // supplier.value = supplier;
  // productType.value = product_type;
  quantity.value = quantity;
  price.value = price;
  // property.value = property;
  threshold.value = threshold;
  
}

  