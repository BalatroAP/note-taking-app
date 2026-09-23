import axios from "axios";

export default new (class NotesDateService {
  constructor() {
    this.link = "http://localhost:3001/api/v1/note";
  }

  async getAll() {
    return await axios.get(this.link);
  }

  async create(data) {
    return await axios
      .post(this.link, data)
      .then(() => {
        console.log("Successfully Created new note");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async delete(data) {
    return await axios
      .delete(this.link, { data: data })
      .then(() => {
        console.log("Successfully deleted note");
      })
      .catch((err) => {
        console.error(err);
      });
  }
})();
