
class SortData{
  constructor(data){
    this.data = data;
  }
  sortType(typeData){
    switch(typeData){
      case 'title':
        return this.sortTitre(this.data);
      case 'likes':
        return this.sortLikes(this.data);
      case 'date':
        return this.sortDate(this.data);
    }
  }

  sortTitre = (data)=>data.slice().sort((a,b)=>{
    const x = a.title.toUpperCase();
    const y = b.title.toUpperCase();
      return x == y ? 0 : x > y ? 1 : -1;
    }
  );
  
  sortLikes = (data)=> data.slice().sort((a,b)=>b.likes-a.likes);
  
  sortDate = (data)=>data.slice().sort((a,b)=>new Date(a.date)-new Date(b.date));
}



