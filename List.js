import Post from "./Post.js";

/**
 * @class
 */
export default class UI {

    constructor(querySelector, loadingSelector, showMoreQs) {

        /**
         * @type {HTMLDivElement}
         * @public
         */
        this.list = document.querySelector(querySelector);

        /**
         * @type {HTMLDivElement}
         * @public
         */
        this.loadingBlock = document.querySelector(loadingSelector);
    }


    /**
     * 
     * @param {Array<Post>} posts 
     */
    renderList(posts) {
        this.clearCards();
        posts.forEach(post => {
            this.list.appendChild(this.createPostCard(post));
        });
    }

    /**
     * 
     * @param {Post} post 
     */
    addPostToList (post) {
        const newPostCard = this.createPostCard(post)
        this.list.insertBefore(newPostCard, this.list.children[1])
    }

    clearCards () {
        while (this.list.firstElementChild) {
            this.list.firstElementChild.remove();
        }
    }

    /**
     * 
     * @param {Post} post 
     * \
     *
     */
    createPostCard(post) {
        const card = document.createElement("div");
        card.className = "card mb-3"

        card.innerHTML = `
        <div class="card-header d-flex align-items-center justify-content-between">
            <h3 class="card-title">${post.title}</h3>
            <div>
                <button id="${post.id}" class="btn btn-info btn-sm text-white">Edit</button>
                <button id="${post.id}" class="btn btn-danger btn-sm">Delete</button>
            </div>
        </div>
        <div class="card-body">
            ${post.body}
        </div>
        `;

        return card;
    }
    

    get loading() {
        return !this.loadingBlock.classList.contains("d-none");
    }

    set loading (val) {
        if (val) {
            this.loadingBlock.classList.remove("d-none");
        }
        else {
            this.loadingBlock.classList.add("d-none");
        }
    }
}