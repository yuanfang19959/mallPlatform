package Servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import productSimple.product;
import util.DBUtil;

/**
 * Servlet implementation class getServlet
 */
@WebServlet("/getServlet")
public class Give extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Give() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setContentType("text/html;charset=utf-8");
		Connection conn = null;
		ResultSet rs = null;
		PreparedStatement pstm = null;
		conn = DBUtil.getConnection();
		
		
		JSONArray jsonarray = new JSONArray();  
		JSONObject jsonobj = new JSONObject();
		PrintWriter out=response.getWriter();
		
		String sql = "select * from productSimple";
		try {
			pstm = conn.prepareStatement(sql);
			rs = pstm.executeQuery();
			while (rs.next()) {
				product sp = new product();
				sp.setProID(Integer.parseInt(rs.getString("productID")));
				sp.setProName(rs.getString("productName"));
				sp.setProPic(rs.getString("productPic"));
				sp.setProPrice(Integer.parseInt(rs.getString("productPrice")));
				/*jsonArray.add(gson.toJson(sp));*/
				jsonobj.put("id", sp.getProID());  
				jsonobj.put("name", sp.getProName());  
				jsonobj.put("price", sp.getProPrice());
				jsonobj.put("pic", sp.getProPic());     
                jsonarray.add(jsonobj);             
			}
			out.println(jsonarray);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		DBUtil.release(conn, rs, pstm);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
