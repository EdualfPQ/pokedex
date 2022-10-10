const urlId = window.location.search;
const urlParams = new URLSearchParams(urlId);
var id = urlParams.get('id');
console.log(id);