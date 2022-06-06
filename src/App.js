
import './App.css';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import Comment from './components/Comments';
import Loader from './components/Loader';
import EndMsg from './components/EndMsg';

function App() {

  const [items,setItems]=useState([]);
  
  const [noMore,setMore]=useState(true);

const [page,setpage]=useState(2);


  useEffect(()=>{
    const getComments=async () =>{

      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=20`
      );

      const data =await res.json();
       setItems (data);
    };
     getComments()
  },[]);

console.log(items);

  const fetchComments= async() =>{
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${(page)}&_limit=20`
    );

    const data =await res.json();
    return data;
    };

    const fetchData= async()=>{
      const commentsFormServer=await fetchComments();
    
    setItems([...items,...commentsFormServer]);
    
    if(commentsFormServer.length===0 || commentsFormServer.length<20){
setMore(false);
}
setpage(page + 1);
    };

  return (
    <InfiniteScroll
    dataLength={items.length} //This is important field to render the next data
    next={fetchData}
    hasMore={noMore}
    loader={<Loader/>}
    endMessage={<EndMsg/>
     
    }
  
  >
  <div className="container">
  <div className="row m-2">'
  { items.map((item)=> {
     return <Comment key={item.id} item={item}/>;
  })}
  </div>
  </div>

  </InfiniteScroll>
  );
}

export default App;
