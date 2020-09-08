$(()=>{

	UI.displayLists();
 
 
    $("#sort-rating").on('click',()=>{
	    Favourite.sortListByRating();
    })
    $("#sort-title").on('click',()=>{
	    Favourite.sortListByTitle();
    })
 
 })
 
 
 let sortTitle = false;
 let sortRating = false;
 
 
 class Favourite {
    constructor(title,rating,id){
	   this.title = title;
	   this.rating = rating;
	   this.id = id;
    }
 
	 static sortListByRating(){
 
		$("tbody").empty();
	   if(sortRating){
 
		  JSON.parse(localStorage.getItem("list")).sort((a,b)=>b.rating - a.rating).forEach(item=>UI.addfavToList(item));
 
		  $(".delete-btn").on('click',(e)=> UI.deleteFavFromList($(e.target)));
	   }else{
		  JSON.parse(localStorage.getItem("list")).sort((a,b)=> a.rating - b.rating).forEach(item=>UI.addfavToList(item));
		  $(".delete-btn").on('click',(e)=> UI.deleteFavFromList($(e.target)));
	   }
 
	   sortRating = !sortRating;
    }
 
	   static sortListByTitle(){
		  $("tbody").empty();
	   if(sortTitle){
 
	   JSON.parse(localStorage.getItem("list")).sort(function(a, b) {
		  let titleA = a.title.toLowerCase(); 
		  let titleB = b.title.toLowerCase(); 
		    if (titleA > titleB) {
			return -1;
		 }
			if (titleA < titleB) {
			    return 1;
		  }
 
		 return 0;
	}).forEach(item=>UI.addfavToList(item));
 
	$(".delete-btn").on('click',(e)=> UI.deleteFavFromList($(e.target)));
	   }else{
 
	   JSON.parse(localStorage.getItem("list")).sort(function(a, b) {
	    let titleA = a.title.toLowerCase(); 
	    let titleB = b.title.toLowerCase(); 
		 if (titleA < titleB) {
		  return -1;
	   }
		  if (titleA > titleB) {
			 return 1;
	    }
 
	   return 0;
  }).forEach(item=>UI.addfavToList(item));
  $(".delete-btn").on('click',(e)=> UI.deleteFavFromList($(e.target)));
	   }
	   sortTitle = !sortTitle;
    }
 }
 
 
 class UI {
 
    static displayLists() {
	   const favList = FavListStore.getFavList();
 
	   favList.forEach(list=> UI.addfavToList(list));
	   $(".delete-btn").on('click',(e)=> UI.deleteFavFromList($(e.target)));
    }
 
    static addfavToList(list) {
	   const $favList = $("<tr>");
	   $favList.html(`
	   <td>${list.title}</td>
	   <td>${list.rating}</td>
	   <td><button type="button" class="btn btn-danger btn-sm btn-block delete-btn">Delete</button></td>
	   `);
	   $($favList).data("id", `${list.id}`);
	   $("tbody").append($favList);
    }
 
    static deleteFavFromList(element){
	   var ele = element.parent().parent();
	   FavListStore.removeFromStore(ele.data("id"));
	   ele.remove();
    }
 
    static alertMsg(msg,type){
	   $("h1").after($(
		  `<div class="alert alert-${type}" role="alert">
		  ${msg}
		</div>`
	   ))
	   setTimeout(()=>{
		  $(".alert").remove();
	   },2000)      
    }
 }
 
 
 class FavListStore {
 
    static getFavList(){
	   return localStorage.getItem("list")
	   ? JSON.parse(localStorage.getItem("list"))
		: [];
    }
 
    static addToStore(favItem){
	   const item = FavListStore.getFavList();
	   item.push(favItem);
	   localStorage.setItem("list",JSON.stringify(item));
    }
 
    static removeFromStore(id){
	    let item = FavListStore.getFavList();
	    item = item.filter(lists=> lists.id !== id);
	   localStorage.setItem("list",JSON.stringify(item))
    }
 }
 
 
 $("#add-btn").on('click',()=>{
    let $titleValue = $("#title-input");
    let $ratingValue = $("#rating-input");
 
    const id = new Date().getTime().toString();
 
    if($titleValue.val() && $ratingValue.val() <= 10 && $ratingValue.val() >= 1){
 
 
	   let movie = new Favourite($titleValue.val(),$ratingValue.val(),id);
 
 
	   UI.addfavToList(movie);
 
 
	   FavListStore.addToStore(movie);
 
	   $titleValue.val("");
	   $ratingValue.val("");
    }else{
	   UI.alertMsg("Inputs must be filled", "danger");
    }
 }) 
 