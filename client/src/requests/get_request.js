
import axios from "axios";


const URI = "mongodb://mongo:27017/"
const client = axios.create({baseURL: URI });
const db = client['mydatabase']
const clients = db['mx2']


 export const Get = () => {
useEffect(() => {
    const fetchPost = async () => {
       let response = await clients.get('?_limit=10');
       setPosts(response.data);
    };
    fetchPost();
 }, []);

}