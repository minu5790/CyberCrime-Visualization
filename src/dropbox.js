const dropdownToogle = document.querySelector(".dropdown-toggle");
const dropdownMenu = document.querySelector(".dropdown-menu");
const dropdownOption = document.querySelectorAll(".dropdown-option");

const updatePlot = (place) => {
  if (place === "연도별 총 합계") {
    yearlytotal();
  } else if (place === "연도별 범죄 비율(발생건수)") {
    yearlytype();
  } else if (place === "월별 범죄 발생건수") {
    montly();
  }
};

dropdownToogle.addEventListener("click", () => {
  dropdownMenu.classList.toggle("show");
});
dropdownToogle.addEventListener("blur", () => {
  dropdownMenu.classList.remove("show");
});
dropdownOption.forEach((e) =>
  e.addEventListener("click", () => {
    const place = e.textContent.trim();
    dropdownToogle.innerHTML = place;
    dropdownToogle.classList.add("selected");
    dropdownMenu.classList.remove("show");

    updatePlot(place);
  })
);
