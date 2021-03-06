console.log("addPosts");
const baseUrl = "https://one-more-mca.herokuapp.com/api/posts";

// formos el
const formEl = document.forms[0];

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  console.log("js is in control");

  // const newPostObj = {
  //   title: formEl.elements.title.value,
  //   year: formEl.elements.year.value,
  //   author: formEl.elements.author.value,
  //   body: formEl.elements.body.value,
  // };
  const newPostObj = {};
  const members = ["title", "year", "author", "body"];
  members.forEach((memb) => {
    newPostObj[memb] = formEl.elements[memb].value.trim();
  });

  //ar ivesta kazkas i title?
  if (newPostObj.title === "") {
    console.log("Ivskite title");
    formEl.elements.title.style.backgroundColor = "tomato";
    formEl.elements.title.insertAdjacentHTML("afterend", `<span>Privalomas laukas</span>`);
    return;
  }
  if (newPostObj.title.length < 5) {
    console.log("Per trumpas title");
    formEl.elements.title.style.backgroundColor = "tomato";
    formEl.elements.title.insertAdjacentHTML("afterend", `<span>Per trumpas Title </span>`);
    return;
  }

  console.log("newPostObj ===", newPostObj);

  createPost(newPostObj);
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
  formEl.before(divEl);
}
