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

    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientID}&client_secret=${secret}`, {method: 'POST',})
    .then(response => response.json())
    .then(jsonResponse => {
      accessToken = jsonResponse.access_token;
    });
  },

  search(term, location, sortBy) {
    return Yelp.getAccessToken()
    .then(response => {
      fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
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
          imgSource: business.imgSource,
          name: business.name,
          address: business.address,
          city: business.city,
          state: business.state,
          zipCode: business.zipCode,
          category: business.category,
          rating: business.rating,
          reviewCount: business.reviewCount
        }));
      }
    });
  }
}

export default Yelp;
