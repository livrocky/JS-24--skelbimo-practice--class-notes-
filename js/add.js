const baseUrl = "https://radial-reinvented-shoe.glitch.me";
const formEl = document.querySelector("form");
const addPropertyEl = document.querySelector(".add-property");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const newProperty = {
    image: formEl.elements.image.value,
    price: formEl.elements.price.value,
    description: formEl.elements.description.value,
    city: formEl.elements.city.value,
  };
  console.log("newProperty===", newProperty);
});

async function createProperty() {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      city: "formEl.elements.city.value",
      price: "formEl.elements.price.value",
      image: "formEl.elements.image.value",
      description: "formEl.elements.description.value",
    }),
  });
  const ats = await res.json();
  console.log("ats ===", ats);
  if (ats.error) {
    // pranesti apie klaida
    console.log("prasome patitrinti duomenis");
  }
  if (ats.msg) {
    console.log("irasyta sekmingai");
  }
}
createProperty();
