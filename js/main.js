/**
 * Created by Tridev on 29-01-2017.
 */
'use strict';
//Listen for form submit
document.getElementById('myForm').addEventListener('submit',saveBookMark);

//ES6 Classes, works on Chrome 42+ (Rest you can figure out! :p)
class Bookmark{
    constructor(siteName, siteURL){
        this.siteName = siteName;
        this.siteURL = siteURL;
    }
}



//Save bookmark function
function saveBookMark(e) {

    let siteName = document.getElementById('siteName').value;
    let siteURL = document.getElementById('siteURL').value;
    if(!validateForm(siteName,siteURL)){
        return false;
    }
    console.log(siteName);
    console.log(siteURL);
    let bookmarkNew = new Bookmark(`Tridev's Portfolio`,'http://www.tridev.me');
    console.log(bookmarkNew);
    console.log(typeof bookmarkNew);
    // DO NOT delete this line. this will prevent form submission
    e.preventDefault();


     //Save data locally
     // localStorage.setItem('test','HelloWorld');
     //To delete a locally stored item
     //localStorage.removeItem('xyz');
      //console.log(localStorage.getItem('test'));


    //Test if bookmarks is null
    if(localStorage.getItem('bookmarksBubble') ===null){
        let bookmarksBubble = [];
        bookmarksBubble.push(new Bookmark(siteName,siteURL));
        localStorage.setItem('bookmarksBubble',JSON.stringify(bookmarksBubble));
       // document.getElementById('myForm').reset();
        fetchBookmarks();
    }else {
        let storedBookmarks = JSON.parse(localStorage.getItem('bookmarksBubble'));
        storedBookmarks.push(new Bookmark(siteName,siteURL));
        localStorage.setItem('bookmarksBubble',JSON.stringify(storedBookmarks));
      //  document.getElementById('myForm').reset();
        fetchBookmarks();
    }


}

function validateForm(siteName,siteURL) {
    if(!siteURL || !siteName){
        alert('Please Complete the form');
        return false;
    }

    let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);

    if(!siteURL.match(regex)){
        alert('Please use a valid URL');
        return false;
    }
    return true;
}


function fetchBookmarks() {
    let storedBookmarks = JSON.parse(localStorage.getItem('bookmarksBubble'));

    let bookmarksResults = document.getElementById('bookmarksResults');
    for(let i=0;i<storedBookmarks.length;i++){
        let name = storedBookmarks[i].siteName;
        let url = storedBookmarks[i].siteURL;
        bookmarksResults.innerHTML += '<div class="well"' +
            '<h3>'+name +
            '<a class="btn btn-default" target="_blank" href="'+url+'"> Visit </a>'+
            '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#"> Delete</a>'+
            '</h3>' +
            '</div>';

    }

}


function deleteBookmark(url) {
    console.log(url);
     let storedBookmarks = JSON.parse(localStorage.getItem('bookmarksBubble'));
    for(let i=0;i<storedBookmarks.length;i++){
        if(storedBookmarks[i].siteURL == url){
            storedBookmarks.splice(i,1);
        }
    }
    localStorage.setItem('bookmarksBubble',JSON.stringify(storedBookmarks));
    fetchBookmarks();
}

