import Post from "./Post.js";
import List from "./List.js";
import Form from './Form.js';


main();

async function main() { // Immediately invoked function expression
    let formPost = new Post();
    const list = new List("#posts", "#loading")
    const form = new Form("#formModal");
    /**
     * @type {Post[]}
     */
    let posts = [];


    const downEl = document.querySelector(".down");

    function downIntersected (entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                fetchPosts();    
            }
          });
    }

    const observer = new IntersectionObserver(downIntersected, {
        threshold: 1.0
    })

    observer.observe(downEl)

    async function fetchPosts () {
        try {
            Post.pgnOptions._page++;
            list.loading = true;
            const nextPosts = await Post.getPosts();
            posts.push(...nextPosts);
            list.renderList(posts);
            list.showMore = true;
        } catch (error) {
            console.log(error);
        } finally {
            list.loading = false;
        }
    }

    document.querySelector("#add-button").addEventListener("click", e => {
        formPost = new Post();
        form.initFormValues(formPost);
        form.modal.show();
    })

    form.el.onsubmit = async function (e) {
        e.preventDefault();
        form.getFormValues(formPost)

        form.overlay = true;
        if (!formPost.id) {
            const newPost = await formPost.create();
            list.addPostToList(newPost);
            posts.unshift(newPost);
        }
        else {
            const updatingPost = await formPost.update();
            const postIndex = posts.findIndex(p => p.id == updatingPost.id);
            posts.splice(postIndex, 1, updatingPost);
            list.renderList(posts);
        }
        form.overlay = false;

        form.modal.hide();
    }


    document.body.addEventListener("click", async (e) => {
        if (e.target.classList.contains("btn-info")) {
            formPost = posts.find(p => p.id == e.target.id);
            form.initFormValues(formPost);
            form.modal.show();
        }

        if (e.target.classList.contains("btn-danger")) {
            if (confirm("Are you sure delete this item ?")) {
                await Post.remove(e.target.id);
                let postIndex = posts.findIndex(p => p.id == e.target.id);
                posts.splice(postIndex, 1);
                e.target.parentElement.parentElement.parentElement.remove();
            }
        }
    })
}