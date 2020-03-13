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

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import productSimple.userAddress;
import util.DBUtil;

/**
 * Servlet implementation class insertAddress
 */

public class insertAddress extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public insertAddress() {
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
		String userName =request.getParameter("name");
		String address =request.getParameter("theAddress");
		
		PrintWriter out=response.getWriter();
		JSONObject jsonObject = new JSONObject();
		String sql = "insert into address values(?,?,?)";
		try {
			pstm = conn.prepareStatement(sql);
			pstm.setString(1,userID);
			pstm.setString(2, userName);
			pstm.setString(3, address);
			pstm.execute();
			System.out.println("phone"+userID+"name"+userName+"addre"+address);
			jsonObject.put("status", "600");
			jsonObject.put("msg", "添加地址成功即将返回！");
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
