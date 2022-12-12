import axios from 'axios';

export class FindImageApi {
  url = 'https://pixabay.com/api/';
  key = '30965051-be301043694ab243532f6a4d6';
  query = '';
  image_type = 'photo';
  orientation = 'horizontal';
  safesearch = true;
  page = 1;
  per_page = 5;

  setQuery(newQuery) {
    this.query = newQuery;
    this.page = 1;
  }

  increasePage() {
    this.page += 1;
  }

  reset() {
    this.page = 1;
    this.query = '';
  }

  async makeRequest() {
    const { data } = await axios.get(this.url, {
      params: {
        key: this.key,
        q: this.query,
        image_type: this.image_type,
        orientation: this.orientation,
        safesearch: this.safesearch,
        page: this.page,
        per_page: this.per_page,
      },
    });

    return data;
  }

  search(query) {
    this.setQuery(query);
    return this.makeRequest();
  }

  loadMore() {
    this.increasePage();
    return this.makeRequest();
  }
}
