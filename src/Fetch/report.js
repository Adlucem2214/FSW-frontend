// function downloadTable(version) {
//     const apiUrl = 'http://localhost:8000/stock/products/'; // Replace with the actual API endpoint that provides the table data
//     const filename = `table_version_${version}.csv`;
  
//     fetch(apiUrl)
//       .then(response => response.json())
//       .then(data => {
//         console.log(data)
//         // Convert table data into CSV format
//         let csvContent = '';
//         data.forEach(row => {
//           const rowData = Object.values(row).map(value => {
//             if (typeof value === 'string') {
//               return value.replace(/,/g, '');
//             }
//             return String(value);
//           });
//           csvContent += rowData.join(',') + '\n';
//         });
  
//         // Create and download CSV file
//         const element = document.createElement('a');
//         element.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
//         element.download = filename;
//         element.style.display = 'none';
//         document.body.appendChild(element);
//         element.click();
//         document.body.removeChild(element);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   }


function downloadTable(version) {
    const apiUrl = 'http://localhost:8000/stock/products/'; // Replace with the actual API endpoint that provides the table data
    const filename = `table_version_${version}.csv`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Extract table headers
        const headers = Object.keys(data[0]);
  
        // Convert table data into CSV format
        let csvContent = headers.join(',') + '\n';
        data.forEach(row => {
          const rowData = headers.map(header => {
            const value = row[header];
            if (typeof value === 'string') {
              return value.replace(/,/g, '');
            }
            return String(value);
          });
          csvContent += rowData.join(',') + '\n';
        });
  
        // Create and download CSV file
        const csvDataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
        const csvLink = document.createElement('a');
        csvLink.href = csvDataUri;
        csvLink.download = filename;
        csvLink.style.display = 'none';
        document.body.appendChild(csvLink);
        csvLink.click();
        document.body.removeChild(csvLink);
  
        // Create and download HTML file
        const htmlContent = `<table><thead><tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr></thead><tbody>${data.map(row => `<tr>${headers.map(header => `<td>${row[header]}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
        const htmlDataUri = 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent);
        const htmlLink = document.createElement('a');
        htmlLink.href = htmlDataUri;
        htmlLink.download = `table_version_${version}.html`;
        htmlLink.style.display = 'none';
        document.body.appendChild(htmlLink);
        htmlLink.click();
        document.body.removeChild(htmlLink);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

