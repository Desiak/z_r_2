window.addEventListener("load", ()=>{

    const bookForm= document.querySelector(".book-form");
    const booksContainer= document.querySelector(".books-list");
    const booksList=localStorage.getItem("booksList")?[...JSON.parse(localStorage.getItem("booksList"))]:[];
   
    function handleCorrectForm(formInputs){
        let book={};
        formInputs.forEach(input=>{
            if(input.type==="radio"){
                if(input.checked){
                    book[input.name]=input.value;
                }
            }else{
                if(input.value!==""){
                    book[input.name]=typeof input.value==="string"?input.value.trim():input.value;
                }
            }
        })
        booksList.unshift(book);
        localStorage.setItem("booksList", JSON.stringify(booksList));
        displayBooks();
        clearForm(formInputs);
    }

    function displayBooks(){
            booksContainer.innerHTML="";
            booksList.forEach(book=>addBookToList(book))
    }

    function clearForm(formInputs){
        formInputs.forEach(input=>{
            if(input.type==="radio"){
                if(input.value==="3"){
                    input.checked=true
                }
                else{
                    input.checked=false;
                }
            }else{
                if(input.value!==""){
                    input.value=""
                }
            }
        })
    }

    function addBookToList(book){
        const bookElem= document.createElement("li");
        bookElem.classList.add("book");
        bookElem.innerHTML=`
        <p class="book-title"><strong>Tytuł:</strong> ${book.title}</p>
        <p class="book-author"><strong>Autor:</strong> ${book.author}</p>
        <p class="book-priority"><strong>Priorytet:</strong> ${book.priority}</p>
        <p class="book-priority"><strong>Kategoria:</strong> ${book.category}</p>
        `
        booksContainer.appendChild(bookElem);
    }

    bookForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        handleCorrectForm([...bookForm.elements])
    })

    displayBooks();
})