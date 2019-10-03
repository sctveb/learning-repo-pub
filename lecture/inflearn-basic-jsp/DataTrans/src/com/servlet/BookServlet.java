package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.servlet.dao.BookDAO;
import com.servlet.dto.BookDTO;

/**
 * Servlet implementation class BookServlet
 */
@WebServlet("/bs")
public class BookServlet extends HttpServlet {
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html; charset=UTF-8");
		PrintWriter out = response.getWriter();
		
//		String driver = "oracle.jdbc.driver.OracleDriver";
//		String url = "jdbc:oracle:thin:@localhost:1521:xe";
//		String id = "c##scott";
//		String pw = "tiger";
//		
//		Connection con = null;
//		Statement stmt = null;
//		ResultSet res = null;
//		
//		try {
//			Class.forName(driver);
//			con = DriverManager.getConnection(url, id, pw);
//			stmt = con.createStatement();
//			String sql = "SELECT * FROM book";
//			res = stmt.executeQuery(sql);
//			
//			while (res.next()) {
//				int bookId = res.getInt("book_id");
//				String bookName = res.getString("book_name");
//				String bookLoc = res.getString("book_loc");
//				
//				out.println("bookId : " + bookId + "<br>");
//				out.println("bookName : " + bookName + "<br>");
//				out.println("bookLoc : " + bookLoc + "<br>");
//			}
//		} catch(Exception e) {
//			e.printStackTrace();			
//		} finally {
//			try {
//				if (res != null) {
//					res.close();
//				}
//				if (stmt != null) {
//					stmt.close();
//				}
//				if (con != null) {
//					con.close();
//				}
//			} catch (Exception e2) {
//				e2.printStackTrace();		
//			}
//		}
		
		BookDAO bookDAO = new BookDAO();
		ArrayList<BookDTO> list = bookDAO.select();
		for (int i=0; i <list.size(); i++) {
			BookDTO dto = list.get(i);
			int bookId = dto.getBookId();
			String bookName = dto.getBookName();
			String bookLoc = dto.getBookLoc();
			
			out.println("bookId : " + bookId + "<br>");
			out.println("bookName : " + bookName + "<br>");
			out.println("bookLoc : " + bookLoc + "<br>");
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
