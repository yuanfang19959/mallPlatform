package Servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import net.sf.json.JSONObject;
import productSimple.userAddress;
import util.DBUtil;

/**
 * Servlet implementation class selAddress
 */

public class selAddress extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public selAddress() {
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
		Connection conn =null;
		ResultSet rs =null;
		PreparedStatement pstm = null;
		conn =DBUtil.getConnection();
		String phone =request.getParameter("phone");
		 
		JSONObject jsonobj = new JSONObject();
		PrintWriter out=response.getWriter();
		
		String sql = "select* from address where userID=?";
		try {
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, phone);
			rs = pstm.executeQuery();
			boolean a=false;
			while(rs.next()) {        
			a=true;
			userAddress gt=new userAddress();
			gt.setUserID(rs.getString("userID"));
			gt.setUsername(rs.getString("username"));
			gt.setAddress(rs.getString("address"));
			jsonobj.put("id", gt.getUserID());
			jsonobj.put("name", gt.getUsername());
			jsonobj.put("address", gt.getAddress());
			jsonobj.put("index",a);	
			
			jsonobj.put("id", gt.getUserID());
			jsonobj.put("name", gt.getUsername());
			jsonobj.put("address", gt.getAddress());
			jsonobj.put("index",a);	
			}
			jsonobj.put("index",a);
			
			out.println(jsonobj);
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		DBUtil.release(conn,rs,pstm);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
