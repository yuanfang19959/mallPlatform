package util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DBUtil {
	/**
	 *
	 * @return
	 */
	public static Connection getConnection(){
		Connection conn=null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			try {
				conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/new?serverTimezone=GMT&useUnicode-true&characterEncoding=utf-8", "root", "zzb123456");
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return conn;
	}
	
	
	/**
	 * 
	 * @param conn  
	 */
	public static void release(Connection conn){
		if(conn!=null)
			try {
				conn.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	}
	/**
	 * 
	 * @param conn
	 * @param set
	 * @param pstm
	 */
	public static void release(Connection conn,ResultSet set,PreparedStatement pstm){
		
		if(set!=null)
			try {
				set.close();
			} catch (SQLException e) {
				
				e.printStackTrace();
			}
		if(pstm!=null)
			try {
				pstm.close();
			} catch (SQLException e) {
				
				e.printStackTrace();
			}
		if(conn!=null)
			try {
				conn.close();
			} catch (SQLException e) {
				
				e.printStackTrace();
			}
		
	}
	/**
	 * 
	 * @param conn
	 * @param pstm
	 */
	public static void release(Connection conn,PreparedStatement pstm){
		if(pstm!=null)
			try {
				pstm.close();
			} catch (SQLException e) {
				
				e.printStackTrace();
			}
		if(conn!=null)
			try {
				conn.close();
			} catch (SQLException e) {
				
				e.printStackTrace();
			}
	}
	

}
