let posts = [];
const maxLimitNumber = 6
const postContainer = document.querySelector('.post-container');

// Create cards and update the UI

function generatePost(post) {
	const returnPostDate = (date) => `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
	const article = document.createElement('article');
	article.classList.add('post');
	article.innerHTML = `
	  <div class="post__meta">
		<div class="post__tag--container">
		${post.meta.tags.map((tag) => `<span class="post__tag">${tag}</span>`).join('')}
		</div>
		<p class=" post__date">${returnPostDate(new Date(post.meta.date))}</p>
	  </div>
	  <h3 class="post__header">
		<a href="${post.meta.url}">${post.title}</a>
	  </h3>
	  <div class="post__author">
		<img class=" post__author--avatar" width="55" src="${post.meta.author.avatar}" alt="${post.user.name[0].firstName} ${post.user.name[1].lastName}">
		<div>
		  <p class=" post__author--name">${post.user.name[0].firstName} ${post.user.name[1].lastName}</p>
		  <p class=" post__author--role"><small>${post.meta.author.jobTitle}</small></p>
		</div>
	  </div>
	  <div class="post__body">
		${post.summary}
	  </div>
	  <a href="${post.meta.url}" class="btn">Read Post</a>
	  `;
	return article;
}

function loadPosts() {
	let fra = document.createDocumentFragment();
	posts.slice(0, maxLimitNumber).map((post) => fra.appendChild(generatePost(post)))
	postContainer.innerHTML = '';
	postContainer.appendChild(fra);
}




// Fetch the data

async function fetchPost() {
	await fetch('./posts.json')
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response not okay')
			}
			return response.json();
		})
		.then((data) => {
			posts = data;
			loadPosts()
		})
		.catch((error) => console.error("There has been a problem with your fetch operation:", error))

}

fetchPost();



// Update number of posts with btn click


// filter for search