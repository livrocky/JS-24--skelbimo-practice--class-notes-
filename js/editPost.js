"use strict";

const formEl = document.forms[0];
// 1 pasiimti postId is query params

const postId = getQueryParam("posdId");

console.log("postId ===", postId);
// 2 parissiusti posta su id is query params
async function getSinglePost() {
  // getSinglePost funkcijoje isiusti uzklausa i baseUrl/postId ir paziureti ka gaunam atgal
  const resp = await fetch(baseUrl + "/" + postId);
  const dataInJs = await resp.json();
  console.log("getSinglePost ===", dataInJs);
  if (dataInJs.success === true) {
    // surasti ir atspausdinti posta kurio id yra postId tarp
    // dataInJs.data masyvo
    // const foundPost = dataInJs.data.find((postObj) => postObj._id === postId);
    // console.log("foundPost===", foundPost);
    const foundPost = dataInJs.data;
    foundObjToFormValues(foundPost);
  }
}
async function init() {
  const foundPost = await getSinglePost(postId);
  getSinglePost(postId);
}

// 3 parsiusto posto duomeni supildyti i forma

function foundObjToFormValues(postObj) {
  console.log("postObj===", postObj);
  //i formEl formos input el irasyti postObj title reiksme
  formEl.elements.title.value = postObj.title;
  formEl.elements.author.value = postObj.author;
  formEl.elements.year.value = postObj.year;
  formEl.elements.body.value = postObj.body;
}

//  4 po to kai forma paeditinama ir submitinama mes siunciam ta forma

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const editedPostObj = {};
  const members = ["title", "year", "author", "body"];
  members.forEach((memb) => {
    editedPostObj[memb] = formEl.elements[memb].value;
  });
  console.log("editedPostObj===", editedPostObj);
  updatePost(editedPostObj, postId);
});

async function updatePost(postObj) {
  const resp = await fetch(`${baseUrl}/${postId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postObj),
  });
  const dataInJs = await resp.json();
  console.log("dataInJs===", dataInJs);
  if (dataInJs.success === true) {
    window.location.href = "posts.html";
  }
}

// su PUT metodu
// PUT http://localhost:3003/api/posts/62416561f0048a09af8b471b
// {
//   "title": "Post 1 Edited",
//   "author": "Jills",
//   "body": "Body of post 1",
//   "year": 1990
// }
