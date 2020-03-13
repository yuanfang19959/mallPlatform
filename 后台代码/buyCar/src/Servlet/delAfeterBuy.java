package Servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import util.DBUtil;

/**
 * Servlet implementation class delAfeterBuy
 */

public class delAfeterBuy extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public delAfeterBuy() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("text/html;charset=utf-8");
		Connection conn = null;
		
		PreparedStatement pstm = null;
		conn = DBUtil.getConnection();
		
		
	    String uID =request.getParameter("phone");
	    System.out.println("userID£º"+uID);
	   
	    String sql="delete from bcar where userID =?";
	    JSONObject jsonObject = new JSONObject();
	    PrintWriter out=response.getWriter();
		
		try {
	    	pstm = conn.prepareStatement(sql);
	    	pstm.setString(1, uID);
			pstm.executeUpdate();
			jsonObject.put("status", "600");
			
			out.print(jsonObject);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	    DBUtil.release(conn,pstm);
	}
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
