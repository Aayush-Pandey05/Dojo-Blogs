import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";




const BlogDetails = () => {
    const { id } = useParams(); // thid helps us to use the react parameters in our code
    const{data: blog, error, isPending} = useFetch('http://localhost:8000/blogs/'+ id)
    const history = useHistory();
    const handleClick =()=>{
        fetch('http://localhost:8000/blogs/'+ blog.id,{
            method: 'DELETE'
        }) .then(()=>{
            history.push('/');
        })
    }

    return (  
        <div className="blog-details">
            {isPending && <div> loading... </div>}
            {error && <div> {error} </div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <div>{blog.body}</div>
                    <button onClick={handleClick}>delete</button>
                </article>
            )}
        </div>
    );
}
 
export default BlogDetails;