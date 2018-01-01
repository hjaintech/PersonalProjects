// listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    //Get form values
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteURL').value;

   if(!validateForm(siteName, siteURL)){
       return false;
   }

    var bookmark = {
        name: siteName,
        url: siteURL
    };

    // Test if bookmarks is null
    if (localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        bookmarks.push(bookmark);

        // set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from localstorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        // add bookmark to array
        bookmarks.push(bookmark);

        // reset back to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    // clear form
    document.getElementById('myForm').reset();

    // refetch bookmarks
    fetchBookmarks();
    // To stop the form from reloading
    e.preventDefault();
}

// delete bookmarks
function deleteBookmark(url) {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // loop through bookmarks
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url === url) {
            // remove from array
            bookmarks.splice(i, 1);
        }
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //re-fetch bookmarks
    fetchBookmarks();

}

function fetchBookmarks() {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    // build output
    bookmarksResults.innerHTML = '';

    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="list-group-item">' +
            '<h3>' + name +
            ' <a class="btn btn-default" target="_blank" href="' + url + '">Visit</a>' +
            ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a>' +
            '</h3>' +
            '</div>';
    }

}
function validateForm(siteName, siteURL){
    if (!siteName || !siteURL) {
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteURL.match(regex)){
        alert('Please use a valid URL');
        return false;
    }

    return true;
}