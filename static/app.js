document.addEventListener("DOMContentLoaded", () => {
	const searchForm = document.querySelector(".search-form");
	if (searchForm) {
		searchForm.addEventListener("submit", () => {
			searchForm.classList.add("loading");
		});
	}
});
