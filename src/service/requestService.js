export default class Api {
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
  }

  increasePage() {
    this.page += 1;
  }

  reset() {
    this.page = 1;
    this.query = '';
  }

  getURL() {
    return (
      `${this.url}?key=${this.key}&q=${this.query}` +
      `&image_type=${this.image_type}&orientation=${this.orientation}&safesearch=${this.safesearch}` +
      `&page=${this.page}&per_page=${this.per_page}`
    );
  }

  async makeRequest() {
    const response = await fetch(this.getURL());

    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error(
        'Sorry, there are no images matching your search query. Please try again.'
      )
    );
  }
}
