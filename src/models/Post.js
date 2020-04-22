export default class Post {
    constructor(title, img) {
        this.title = title;
        this.img = img;
        this.date = Date.now().toLocaleString();
    }

    toString() {
        return JSON.stringify({ title: this.title, image: this.img, date: this.date }, null, 4);
    }

    getHTML() {
        return `
            <div class='post'>
                <p class='post-title'>${this.title}</p>

                <p class='post-date'>${this.date}</p>
            </div>
        `
    }
}