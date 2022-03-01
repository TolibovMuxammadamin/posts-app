const postApi = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
    },
    responseType: "json"
})

export default class Post {
    static pgnOptions = {
        _limit: 5,
        _page: 0
    }

    constructor (title = "", body = "", id = null) {
        this.title = title;
        this.body = body;
        this.userId = 1;

        if (id) {
            this.id = id;
        }
    }

    static async getPosts () {
        try {
            const { data } = await postApi.get("posts", {
                params: this.pgnOptions
            });
            
            return data.map(post => new Post(post.title, post.body, post.id));
        } catch (error) {
            throw error.response;
        }
    }

    async create () {
        try {
            const { data } = await postApi.post("posts", this);

            return data;
        } catch (error) {
            throw error.response
        }
    }

    async update () {
        try {
            const { data } = await postApi.put(`posts/${this.id}`, this);

            return data;
        } catch (error) {
            throw error.response
        }
    }

    static async remove (id) {
        try {
            const {data} = await postApi.delete(`posts/${id}`);
            return data;
        } catch (error) {
            throw error.response;
        }
    }
}