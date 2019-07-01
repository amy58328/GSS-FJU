
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
            { field: "BookPublisher", title: "出版社", width: "15%" },
            { command: { text: "刪除", click: deleteBook }, title: "" , width: "120px" }
        ]
        
    });
    
    $(".book-grid-search").keydown(function(){
        var search = $(".book-grid-search").val()
        $("#book_grid").data("kendoGrid").dataSource.filter({
            logic :"or",
            filters:
            [
                {
                    field:"BookName",
                    operator:"contains",
                    value: search
                },
                {
                    field:"BookAuthor",
                    operator:"contains",
                    value: search
                }
            ]
        })
    })
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
    var data = $(option.currentTarget).closest("tr");
    var dataItem = grid.dataItem(data);
    grid.dataSource.remove(dataItem); 
    // delete data
    var localData = JSON.parse(localStorage["bookData"])
    for(var i = 0 ; i < localData.length ; i++)
    {
        if(localData[i].BookId == dataItem.BookId)
        {
            localData.splice(i, 1);
            break;
        }
    }
    localStorage["bookData"] = JSON.stringify(localData);
}

var validator = $("#creat").kendoValidator().data("kendoValidator"),
    status = $(".status");
    
$("form").click(function(event) {
    event.preventDefault();
    $("#close_window").click(function(){
        if (validator.validate()) {
            status.text("Oops! There is invalid data in the form.")
            .removeClass("valid")
            .addClass("invalid");
        }
            
    });
});

$("#open_window").click(function(){
    $("#book_name").val("")
    $("#book_author").val("")
    $("#book_publish").val("")
});

$(document).ready(function() {
    var myWindow = $("#window"),
    undo = $("#open_window");
    undo.click(function() {
        myWindow.data("kendoWindow").open().center();
    });
    function onClose() {
        undo.fadeIn();
    }

    $("#close_window").click(function(){
        if (validator.validate()) 
            myWindow.data("kendoWindow").close();
            
    })

    myWindow.kendoWindow({
        width: "600px",
        title: "insert book",
        visible: false,
        actions: [
            "Pin",
            "Minimize",
            "Maximize",
            "Close"
        ],
        close: onClose
    });
});

$("#close_window").click(function(){
    
    if (validator.validate()) 
    {
        var grid = $("#book_grid").data("kendoGrid");
        var localData = JSON.parse(localStorage["bookData"])
        var new_book = {}
        new_book.BookId = JSON.parse(localStorage["bookData"]).length +1
        new_book.BookName = $("#book_name").val()
        new_book.BookAuthor = $("#book_author").val()
        new_book.BookCategory = $("#book_category").data("kendoDropDownList").text();
        new_book.BookBoughtDate = $("#bought_datepicker").val()
        new_book.BookPublisher = $("#book_publish").val()
        grid.dataSource.add(new_book)  
        localData.splice(new_book.BookId, 0,new_book);
        localStorage["bookData"] = JSON.stringify(localData);
    }
       
})
    
