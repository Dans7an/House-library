var checkedOut = document.getElementsByClassName("fa-check-square");
var returned = document.getElementsByClassName("fa-undo");
var trash = document.getElementsByClassName("fa-trash");

Array.from(checkedOut).forEach(function(element) {
      element.addEventListener('click', function(){
        const title = this.parentNode.parentNode.childNodes[1].innerText
        const author = this.parentNode.parentNode.childNodes[3].innerText
        // this.parentNode.parentNode.childNodes[3].classList.toggle('cross')
        // const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('library', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'title': title,
            'author': author,
            // 'checkedOut':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(returned).forEach(function(element) {
      element.addEventListener('click', function(){
        const title = this.parentNode.parentNode.childNodes[1].innerText
        const author = this.parentNode.parentNode.childNodes[3].innerText
        // this.parentNode.parentNode.childNodes[3].classList.toggle('cross')
        // const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('libraryOut', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'title': title,
            'author': author,
            // 'checkedOut':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const title = this.parentNode.parentNode.childNodes[1].innerText
        const author = this.parentNode.parentNode.childNodes[3].innerText
        fetch('library', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'title': title,
            'author': author
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
//
// Array.from(thumbDown).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const title = this.parentNode.parentNode.childNodes[1].innerText
//         const author = this.parentNode.parentNode.childNodes[3].innerText
//         // const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         fetch('library', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'title': title,
//             'author': author,
//             'thumbUp':thumbUp
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });
