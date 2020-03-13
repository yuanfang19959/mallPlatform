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
import util.DBUtil;

/**
 * Servlet implementation class toMyDD
 */

public class toMyDD extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public toMyDD() {
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
		String userID =request.getParameter("phone");
		Integer pID =Integer.parseInt(request.getParameter("pid")); 
		
		
		PrintWriter out=response.getWriter();
		JSONObject jsonObject = new JSONObject();
		String sql = "insert into mydd(proID,userID) values(?,?)";
		try {
			pstm = conn.prepareStatement(sql);
			pstm.setInt(1,pID);
			pstm.setString(2,userID);
			
			pstm.execute();
			System.out.println("phone:"+userID+"  name:"+pID);
			jsonObject.put("status", "600");
			jsonObject.put("msg", "¹ºÂò³É¹¦£¡");
			out.print(jsonObject);
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
