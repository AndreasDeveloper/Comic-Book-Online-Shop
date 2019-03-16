// --- IMPORTING MODELS | PACKAGES --- \\
import axios from 'axios';

export default class Comicbooks {
    constructor() {}
    // Getting comicbooks data from API
    async getComicbooks() {
        try {
            const res = await axios('http://localhost:3000/comicbooks_data_api');
            this.data = res.data.data; // Accessing data object array
            console.log(res);
        } catch (err) {
            throw new Error(err);
        }
    }
}