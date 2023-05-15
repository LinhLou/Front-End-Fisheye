
class SortData{
  constructor(data){
    this.data = data;
  }
  sortType(typeData){
    switch(typeData){
      case 'title':
        return sortTitre(this.data);
      case 'likes':
        return sortLikes(this.data);
      case 'date':
        return sortDate(this.data);
    }
  }
}

const sortTitre = (data)=>data.slice().sort((a,b)=>{
  const x = a.title.toUpperCase();
  const y = b.title.toUpperCase();
    return x == y ? 0 : x > y ? 1 : -1;
  }
);

const sortLikes = (data)=> data.slice().sort((a,b)=>b.likes-a.likes);

const sortDate = (data)=>data.slice().sort((a,b)=>new Date(a.date)-new Date(b.date));

