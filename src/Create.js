import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";// this will help us to redirect the user to the home page once the adding of the blog is completed


const Create = () => {
    const[title, setTitle]= useState('');
    const[body, setBody]= useState('');
    const[author, setAuthor]= useState('yoshi');
    const[isPending,setIsPending]= useState(false);// this is set to false because we are not adding the blog immediately after landing on the page so we only nead the loading effect once we are submitting the blog
    const history = useHistory();

    const handleSubmit = (e)=>{
        e.preventDefault(); // this function prevents the page to reload once the form is being submitted
        const blog = {title, body, author};
        setIsPending(true);

        fetch('http://localhost:8000/blogs',{// this is how we sen a post request to the json server 
            method: 'POST',
            headers: {"Content-Type": "application/json"},// this is to signify that the content we are trying to post is in the form of json file
            body: JSON.stringify(blog)// this is used to convert the state of 'blog' from object to json string
        }).then(()=>{// while doing this we will get a promise so we can use 'then' to signify further actions
            console.log('new blog added');
            setIsPending(false);
            //"history.go(-1)" this will help to redirect the user one page before
            history.push('/');// using this we will redirect the user back to the homepage once the blog is added 
        })
    }

    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label >Blog title:</label>
                <input 
                    type="text" 
                    required
                    value= {title}
                    onChange={(e)=>setTitle(e.target.value)}
                />
                <label >Blog body:</label>
                <textarea 
                    required
                    value={body}
                    onChange={(e)=> setBody(e.target.value)}
                ></textarea>
                <label>Blog author:</label>
                <select
                    value={author}
                    onChange={(e)=> setAuthor(e.target.value)}
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding Blog...</button>} {/* this disabls the button for the time period in which the blog is being added*/}
            </form>
        </div>
     );
}
 
export default Create;