const baseUrl = "https://one-more-mca.herokuapp.com/api/posts";
const cardsContEl = document.querySelector(".cards-container");
console.log("cardsContEl===", cardsContEl);

// parsisiunciam visus posts ir isconsolinam

//generuojam korteles kaip ir su properties

async function getPosts() {
  const resp = await fetch(baseUrl);
  const posts = await resp.json();
  console.log("posts ===", posts);
  if (posts.success === true) {
    renderCards(posts.data, cardsContEl);
  }
}
getPosts();

function renderCards(cardsArr, dest) {
  dest.innerHTML = "";
  cardsArr.forEach((cObj) => {
    dest.append(renderCard(cObj));
  });
}

function renderCard(cardObj) {
  const divEl = document.createElement("div");
  divEl.className = "card";
  divEl.innerHTML = `
    <div class="c-desc">
    <h3>${cardObj.title}</h3>
    <p>${cardObj.author}</p>
    <p>${cardObj.body}</por>
    <p>${cardObj.year}</p>
    <a href="edit-posts.html?postId=${cardObj._id}">Edit Me </a>
    </div>
  `;
  const btnEl = document.createElement("button");
  btnEl.textContent = "delete me";
  btnEl.addEventListener("click", () => deletePost(cardObj._id));
  divEl.append(btnEl);
  return divEl;
}

async function deletePost(postId) {
  console.log("delete", postId);
  const patvirtinimas = confirm("Ar tikrai norite istrinti?");
  if (patvirtinimas === false) return;
  const resp = await fetch(`${baseUrl}/${postId}`, {
    method: "DELETE",
  });

  const post = await resp.json();
  console.log("post===", post);
  if (post.data.deletedCount === 1) {
    //istrinta sekmingai
    getPosts();
  }
}
