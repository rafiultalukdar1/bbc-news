const categorieContainer = document.getElementById("categorieContainer");
const newsContainer = document.getElementById("news-container");
const bookmarkContainer = document.getElementById("bookmark-container");
const bookmarkCount = document.getElementById("bookmark-count");
const modalContainer = document.getElementById("modal-container");
const modalBox = document.getElementById("modal_box");


const loadCategory = () => {
    fetch("https://news-api-fs.vercel.app/api/categories")
    .then(res => res.json())
    .then(data => {
        const categories = data.categories;
        showCategory(categories)
    })
    .catch(err => {
        console.log(err);
    });
}

const showCategory = (categories) => {
    categories.forEach(category => {
        categorieContainer.innerHTML += `
            <button id="${category.id}" class="text-[#141414] text-[18px] font-semibold cursor-pointer hover:border-b-[3px] hover:border-[#141414] duration-100">${category.title}</button>`;
    });

    categorieContainer.addEventListener('click', (e) => {
        const allButton = document.querySelectorAll('button')
        allButton.forEach((button) => {
            button.classList.remove('border-b-[3px]');
        });

        if(e.target.localName === 'button'){
            console.log(e.target);
            e.target.classList.add('border-b-[3px]')
            viewCategories(e.target.id)
        }
    })
}


const viewCategories = (categoryId) => {
    fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
        .then((res) => res.json())
        .then((data) => {
            showNews(data.articles);
        })
};


const showNews = (articles) => {
    newsContainer.innerHTML = "";
    articles.forEach((artic) => {
        newsContainer.innerHTML += `
        <div class="borde border-gray-300 rounded-lg shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] overflow-hidden">
            <div>
                <img class="w-full" src="${artic.image.srcset[5].url}" />
            </div>
            <div id="${artic.id}" class="p-2">
                <h1 class="font-bold text-[18px]">${artic.title}</h1>
                <p class="text-[16px] py-1 mb-[8px]">${artic.time}</p>
                <button class="text-[14px] py-[8px] px-[10px] cursor-pointer border border-gray-300 rounded-md">Bookmark</button>
                <button class="text-[14px] py-[8px] px-[10px] cursor-pointer border border-gray-300 rounded-md">View Details</button>
            </div>
        </div>`;
    })
}

// Bookmartk

let bookmarks = [];

newsContainer.addEventListener('click', (e) => {
    if(e.target.innerText === 'Bookmark') {
        handleBookmark(e);
    }

    if(e.target.innerText === 'View Details') {
        viewModal(e);
    }
    
})

const handleBookmark = (e) => {
    const newsTitle = e.target.parentNode.children[0].innerText;
    const newsId = e.target.parentNode.id;
    bookmarks.push({
        id: newsId,
        title: newsTitle
    });
    showBookmarks(bookmarks);
}

const showBookmarks = (bookmarks) => {
    bookmarkContainer.innerHTML = ""; 
    bookmarks.forEach((bookmark) => {
        bookmarkContainer.innerHTML += `
        <div class="border border-gray-300 rounded-md my-[7px] p-[10px]">
            <h1>${bookmark.title}</h1>
            <button onclick="deleteBookmark('${bookmark.id}')" class="py-[3px] px-[8px] border border-gray-300 rounded-md text-[14px] font-[500] cursor-pointer mt-[5px] ">Delete</button>
        </div>`;
    });
    bookmarkCount.innerText = bookmarks.length;
};

const deleteBookmark = (bookmarkId) => {
    const filterBookmark = bookmarks.filter(bookmark => bookmark.id !== bookmarkId)
    bookmarks = filterBookmark
    showBookmarks(bookmarks)
}

const viewModal = (e) => {
    const newsId = e.target.parentNode.id;
    fetch(`https://news-api-fs.vercel.app/api/news/${newsId}`)
    .then(res => res.json())
    .then(data => {
        showModalData(data.article)
    })
}


const showModalData = (article) => {
    modalBox.showModal()
    modalContainer.innerHTML = `
    <div>
        <img class="w-full" src="${article.images[5].url}" />
        <h2 class="font-bold text-[18px] py-3">${article.title}</h2>
        <p>${article.content.join("")}</p>
    </div>`;
}














viewCategories('main');
loadCategory();




/*
const loadCategoryAsync = async () => {
    try {
        const res = await fetch("https://news-api-fs.vercel.app/api/categories");
        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}
*/