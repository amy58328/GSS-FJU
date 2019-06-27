
// store book data
var bookDataFromLocalStorage = [];

$(function(){
    loadBookData();
    var data = [
        {text:"資料庫",value:"database"},
        {text:"網際網路",value:"internet"},
        {text:"應用系統整合",value:"system"},
        {text:"家庭保健",value:"home"},
        {text:"語言",value:"language"},
        {text:"行銷",value:"sell"},
        {text:"管理",value:"management"}
    ]
    $("#book_category").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        index: 0,
        change: onChange
    });
    $("#bought_datepicker").kendoDatePicker({
        value:new Date(),
        format: "yyyy-MM-dd"
    });
    $("#book_grid").kendoGrid({ 
        dataSource: {
            data: bookDataFromLocalStorage,
            schema: {
                model: {
                    fields: {
                        BookId: {type:"int"},
                        BookName: { type: "string" },
                        BookCategory: { type: "string" },
                        BookAuthor: { type: "string" },
                        BookBoughtDate: { type: "string" }
                    }
                }
            },
            pageSize: 20,
        },
        toolbar: kendo.template("<div class='book-grid-toolbar'><input class='book-grid-search' placeholder='我想要找......' type='text'></input></div>"),
        height: 550,
        sortable: true,
        pageable: {
            input: true,
            numeric: false
        },
        columns: [
            { field: "BookId", title: "書籍編號",width:"10%"},
            { field: "BookName", title: "書籍名稱", width: "50%" },
            { field: "BookCategory", title: "書籍種類", width: "10%" },
            { field: "BookAuthor", title: "作者", width: "15%" },
            { field: "BookBoughtDate", title: "購買日期", width: "15%" },
            { command: { text: "刪除", click: deleteBook }, title: "" , width: "120px" }
        ]
        
    });
})
// 載入book data
function loadBookData(){
    bookDataFromLocalStorage = JSON.parse(localStorage.getItem("bookData"));
    if(bookDataFromLocalStorage == null){
        bookDataFromLocalStorage = bookData;
        localStorage.setItem("bookData",JSON.stringify(bookDataFromLocalStorage));
    }
}

function onChange(){
    var value = $("#book_category").val();
    $(".book-image").attr("src", "image/"+value+".jpg");

}
  
function deleteBook(option){
    // catch data 
    var grid = $("#book_grid").data("kendoGrid");
    var data = $(option.currentTarget).closest("tr")
    var dataItem = grid.dataItem(data);
    grid.dataSource.remove(dataItem); 
    // delete data
    var localData = JSON.parse(localStorage["bookData"])
    for(var i = 0 ; i < localData.length ; i++)
    {
        if(localData[i].BookId == dataItem.BookId)
        {
            console.log(localData[i].BookCategory)
            localData.splice(i, 1);
            break;
        }
    }
    localStorage["bookData"] = JSON.stringify(localData);
}

$(".k-button").click(function(){
    var grid = $("#book_grid").data("kendoGrid");
    var localData = JSON.parse(localStorage["bookData"])
    var new_book = {}
    new_book.BookId = JSON.parse(localStorage["bookData"]).length +1
    new_book.BookName = $("#book_name").val()
    new_book.BookAuthor = $("#book_author").val()
    new_book.BookCategory = $("#book_category").data("kendoDropDownList").text();
    new_book.BookBoughtDate = $("#bought_datepicker").val()
    // new_book.BookBoughtDate = kendo.toString(new Date($("#bought_datepicker").val()), "yyyy-MM-dd")
    grid.dataSource.add(new_book)  
    localData.splice(new_book.BookId, 0,new_book);
    localStorage["bookData"] = JSON.stringify(localData);
})
    
