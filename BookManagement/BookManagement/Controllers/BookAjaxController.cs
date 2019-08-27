using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BookManagement.Controllers
{
    public class BookAjaxController : Controller
    {
        readonly Models.BookService bookService = new Models.BookService();
        readonly Models.CodeService codeService = new Models.CodeService();
        // 圖書資料查詢
        public ActionResult IndexAjax()
        {
            return View();
        }

        // insert畫面
        public ActionResult InsertIndex()
        {
            return View();
        }

        [HttpPost()]
        public JsonResult InsertIndex(Models.Books data)
        {
            try
            {
                int i, j;
                i = 0;
                j = 1 / i;

                return Json(bookService.InsertBook(data));
            }
            catch (Exception)
            {

                throw;
            }
            
        }

        // 書籍類別
        [HttpPost()]
        public JsonResult GetBookClassName()
        {
            return Json(this.codeService.GetBookClassName());
        }
        //使用者名稱
        [HttpPost()]
        public JsonResult GetUserName()
        {
            return Json(this.codeService.GetUserName());
        }
        //借書狀態
        [HttpPost()]
        public JsonResult GetCodeName()
        {
            return Json(this.codeService.GetCodeName());
        }

        //搜尋
        //沒找到的話要寫沒找到
        [HttpPost()]
        public JsonResult GetBookByCondtioin(Models.BookSearchArg arg)
        {
            return Json(bookService.GetBookByCondtioin(arg));
        }

        //借閱紀錄
        public JsonResult BookLendRecord(int BookID)
        {
            return Json(bookService.GetBookLendRecord(BookID));
        }
        
        // 刪除書籍
        public JsonResult DeleteBook(int BookID)
        {
            return Json(bookService.DeleteBook(BookID));
        }
        //編輯
        [HttpGet()]
        public ActionResult Update()
        {
            return View();
        }

    }
}