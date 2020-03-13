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
 * Servlet implementation class insertPro
 */
/*@WebServlet(description = "insertPro", urlPatterns = { "/insertPro" })*/
public class insertPro extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public insertPro() {
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
		
		Integer pID =Integer.parseInt(request.getParameter("pID")); 
	    String uID =request.getParameter("uID");
	    System.out.println("userID："+uID+"proID:"+pID);
	   
	    String sql="insert into bcar(proID,userID) values(?,?)";
	    JSONObject jsonObject = new JSONObject();
	    PrintWriter out=response.getWriter();
		
		try {
	    	pstm = conn.prepareStatement(sql);
	    	pstm.setInt(1, pID);
	    	pstm.setString(2, uID);
	    	
			pstm.execute();
			jsonObject.put("status", "600");
			jsonObject.put("msg", "加入成功！我在购物车等你哦*-*");
			out.print(jsonObject);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			/*jsonObject.put("status", "500");
			jsonObject.put("msg", "删除失败");
			out.print(jsonObject);*/
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
