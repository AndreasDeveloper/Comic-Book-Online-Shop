// --- IMPORTING MODELS | PACKAGES --- \\
import axios from 'axios';

export default class Comicbooks {
    constructor() {}
    // Getting comicbooks data from API
    async getComicbooks() {
        try {
            const res = await axios('http://localhost:3000/comicbooks_data_api');
            const data = res.data;
            console.log(data);
        } catch (err) {
            throw new Error(err);
        }
    }
}