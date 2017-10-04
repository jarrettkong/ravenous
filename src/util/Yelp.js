const clientID = 'Typ6MMpkr0gBF-lJpRXVUA';
const secret = '0pVP68NEN6mUmEkWiGfBAgjGG0rngMCF7PSSf9zrH08x66qv7FhlodFsPapLp0GZ';
let accessToken;


const Yelp = {
  getAccessToken() {
    if (accessToken) {
      return new Promise(resolve => {
        resolve(accessToken)
      });
    }

    // return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientID}&client_secret=${secret}`, {method: 'POST',}).then(response => {
    //     return response.json();
    //   }).then(jsonResponse => {accessToken = jsonResponse.access_token;});

    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientID}&client_secret=${secret}`, {method: 'POST',})
    .then(response => response.json())
    .then(jsonResponse => {
      accessToken = jsonResponse.access_token;
    });
  },

  search(term, location, sortBy) {
    return Yelp.getAccessToken()
    .then(response => {
      return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      });
    })
    .then(response => response.json())
    .then(jsonResponse => {
      if (jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => ({
          id: business.id,
          imgSource: business.image_url,
          name: business.name,
          address: business.location.address1,
          city: business.location.city,
          state: business.location.state,
          zipCode: business.location.zipCode,
          category: business.categories[0].title,
          rating: business.rating,
          reviewCount: business.review_count
        }));
      }
    });
  }
}

export default Yelp;
