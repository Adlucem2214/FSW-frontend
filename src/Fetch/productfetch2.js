const producttype = document.querySelector('.producttype')
let output = ''


const renderPosts = (posts) =>{
    posts.forEach(post => {
        output += `
        <div class="form-group" id="producttype">
        <label for="sell-code">Product Type:</label>
        <select id="sell-code" name="sell-code" required>
          <option value="option3">${post.name}</option>
        </select>
      </div>;`
    })
    producttype.innerHTML = output;
}
fetch('http://localhost:8000/stock/producttypes/', {
    method: 'GET',
    headers:{
      'Content-type': 'application/json'
    },
  })
    .then(res => res.json())
    .then(data => {renderPosts(data);
    })
    .catch(error => {
      // Handle any errors
      console.error('Error:', error);
    });
  