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
import productSimple.proFlex;
import util.DBUtil;

/**
 * Servlet implementation class getProFlex
 */
/*@WebServlet(description = "getProFlex", urlPatterns = { "/getProFlex" })*/
public class getProFlex extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public getProFlex() {
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
		Integer spID =Integer.parseInt(request.getParameter("spID"));
		JSONArray jsonarray = new JSONArray();  
		JSONObject jsonobj = new JSONObject();
		PrintWriter out=response.getWriter();
		
		String sql = "select * from proflex where proID=?";
		try {
			pstm = conn.prepareStatement(sql);
			pstm.setInt(1, spID);
			rs = pstm.executeQuery();
			while(rs.next()) {
				proFlex sp=new proFlex();
				sp.setProName(rs.getString("proName"));
				sp.setP1(rs.getString("pic1"));
				sp.setP2(rs.getString("pic2"));
				sp.setP3(rs.getString("pic3"));
				sp.setP4(rs.getString("pic4"));
				sp.setP5(rs.getString("pic5"));
				jsonobj.put("pName", sp.getProName());
				jsonobj.put("p1", sp.getP1());
				jsonobj.put("p2", sp.getP2());
				jsonobj.put("p3", sp.getP3());
				jsonobj.put("p4", sp.getP4());
				jsonobj.put("p5", sp.getP5());
				jsonarray.add(jsonobj);
				
			}
			out.println(jsonarray);
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
