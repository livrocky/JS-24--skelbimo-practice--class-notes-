const baseUrl = "https://one-more-mca.herokuapp.com/api/posts";

const formEl1 = document.getElementById("form1");
console.log("formEl1===", formEl1);

formEl1.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("js is in control");
  // const newPost = {
  //   title: formEl1.elements.title.value,
  //   author: formEl1.elements.author.value,
  //   year: formEl1.elements.year.value,
  //   body: formEl1.elements.body.value,
  // };
  const newPost = {};
  const members = ["title", "author", "year", "body"];
  members.forEach((memb) => {
    newPost[memb] = formEl1.elements[memb].value;
  });

  // console.log("newPost===", newPost);
  createPost(newPost);
});

async function createPost(newPostData) {
  const resp = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPostData),
  });
  const atsInJs = await resp.json();
  if (atsInJs.success === false) {
    // turim klaidu masyva atsInJs.error
    handleErrors(atsInJs.error);
  }
  if (atsInJs.success === true) {
    // post sukurtas
    window.location.href = "posts.html";
  }
  console.log("atsInJs ===", atsInJs);
}

function handleErrors(errorArr) {
  const errString = errorArr.map((errObj) => `<p>${errObj.message}</p>`).join("");
  const divEl = document.createElement("div");
  divEl.innerHTML = errString;
  formEl1.before(divEl);
}
