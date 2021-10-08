// authenfication key
const AUTH = '563492ad6f9170000100000158f4b9049d304f028e53bb43379c09d7';
const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const moreBtn = document.querySelector('.more-btn');

let page = 1;
let searchValue;

//event listener
form.addEventListener('submit', (e) => {
	e.preventDefault();
	searchImages(searchInput.value);
	searchValue = searchInput.value;
});

moreBtn.addEventListener('click', loadMoreImages);
//functions

async function fetchApi(url) {
	const data = await fetch(url, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Authorization: AUTH,
		},
	});

	return await data.json();
}

function createAndPasteImages(data) {
	data.photos.forEach((item) => {
		const itemDiv = document.createElement('div');
		itemDiv.classList.add('image-item');

		itemDiv.innerHTML = `
		<div class="image-wrapper">
			<img src=${item.src.large} alt=${item.avg_color} />
			<p>${item.photographer}</p>
		</div>`;
		gallery.appendChild(itemDiv);
	});
}

async function getImages() {
	const fetchedData = await fetchApi(
		'https://api.pexels.com/v1/curated/?page=1&per_page=15',
	);
	createAndPasteImages(fetchedData);
}

async function searchImages(query) {
	const fetchedData = await fetchApi(
		`https://api.pexels.com/v1/search?query=${query}+query&page=1&per_page=15`,
	);

	gallery.innerHTML = ' ';
	searchInput.value = ' ';

	createAndPasteImages(fetchedData);
}

async function loadMoreImages() {
	page++;
	let fetchLink;
	console.log(searchValue, page);
	if (!searchValue) {
		fetchLink = `https://api.pexels.com/v1/curated/?page=${page}&per_page=15`;
	} else {
		fetchLink = `https://api.pexels.com/v1/search?query=${searchValue}+query&page=${page}&per_page=15`;
	}
	console.log(fetchLink);
	const fetchedData = await fetchApi(fetchLink);
	createAndPasteImages(fetchedData);
}

getImages();
