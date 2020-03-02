import axios from 'axios';
const API_URL = `https://api.discogs.com/database/search?`
const TOKEN = 'token=fwybgPEEEvXXKkWOAIahAaJiKmFhHCTrWoHzelnE'
const OAUTH_CONSUMER_KEY = 'gyoxmGUZitMraskziyIz'
const OAUTH_TOKEN = 'rfgkuDDVXxEPeiHcJUfXkBfESPIhlBScgKtIHEgJ'


export const api = () => {
    
  return {
        findMusic: (query) => {
            const endPoint = `${API_URL}title=${query}&${TOKEN}`
            return axios.get(endPoint)
            .then(response => response.data)
            .catch(err => {
                throw err;
            });
        },


        findReleaseByID: (id) => {
            const date = new Date();
            const TIMESTAMP = Math.floor(date.getTime()/1000)
            const endPoint = `https://api.discogs.com/releases/${id}?oauth_consumer_key=${OAUTH_CONSUMER_KEY}&oauth_token=${OAUTH_TOKEN}&oauth_signature_method=HMAC-SHA1&oauth_timestamp=${TIMESTAMP}&oauth_nonce=y0GOtKanIU5&oauth_version=1.0&oauth_signature=6Ky9qryj+HTx44IrvWS3OWGaWkU=`
            return axios.get(endPoint, { headers: { 
                'Content-Type':  "application/x-www-form-urlencoded"}, 
            })
            .then(response => response.data)
            .catch(err => {
                throw err;
            });
        },


        findArtistByID: (id) => {
            const date = new Date();
            const TIMESTAMP = Math.floor(date.getTime()/1000)
            const endPoint = `https://api.discogs.com/artists/${id}?oauth_consumer_key=${OAUTH_CONSUMER_KEY}&oauth_token=${OAUTH_TOKEN}&oauth_signature_method=HMAC-SHA1&oauth_timestamp=${TIMESTAMP}&oauth_nonce=y0GOtKanIU5&oauth_version=1.0&oauth_signature=6Ky9qryj+HTx44IrvWS3OWGaWkU=`
            return axios.get(endPoint, { headers: { 
                'Content-Type':  "application/x-www-form-urlencoded"},
            })
            .then(response => response.data)
            .catch(err => {
                throw err;
            });

        },

        myCollection: (id) => { 
            const endPoint = 'https://api.discogs.com/users/cerra/collection/folders/0/releases'                  
            return axios.get(endPoint)
            .then(response => response.data)
            .catch(err => {
                throw err;
            });

        },


        addToMyCollection: (id) => { 
            const endPoint = `https://api.discogs.com/users/cerra/collection/folders/1/releases/${id}?${TOKEN}`   
            console.log(endPoint)               
            return axios.post(endPoint)
            .then(response => response.data)
            .catch(err => {
                throw err;
            });

        },


    }

}
export default api;
