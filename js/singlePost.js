"use strict";

//nusitaikom el

const h1El = document.querySelector("h1");
const contEl = document.querySelector(".single-post-content");
const btnLinkEl = document.querySelector(".btn-link");

//1. Pasiimti postId is query params

const postId = getQueryParam("postId");
console.log("postId ===", postId);
//2. parsisiusti singlePost duomenis

// const params = new URLSearchParams(window.location.search);
// const postId = params.get("postId");

async function init() {
  const singlePostObj = await getSinglePost(postId);
  console.log("singlePostObj===", singlePostObj);
  foundObjObjToHtml(singlePostObj);
}
init();

//2.1 iskelti async function getSinglePost() i helper.js

//3. surasyti duomenis i html
function foundObjObjToHtml(postObj) {
  //nusitaikom i html elementus
  console.log("postObj===", postObj);
  h1El.textContent = postObj.title;
  contEl.querySelector("h2").textContent = postObj.year;
  contEl.querySelector("p i").textContent = postObj.author;
  contEl.querySelector(".text").textContent = postObj.body;
  //supildyti ju reiksmes su postObj reiksmem
}

//4. prideti edit mygtuka ir isimti ji is post html
const editLink = `<a class='f__btn' href='edit-post.html?postId=${postId}'>Edit me</a>`;
btnLinkEl.insertAdjacentHTML("afterend", editLink);
