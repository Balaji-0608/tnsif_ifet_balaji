import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class jdbc_Connect {
    public static void main(String[] args) {

        String url = "jdbc:postgresql://localhost:5432/student";
        String username = "postgres"; // your username
        String password = "Balaji1812"; // your password

        try {
            Class.forName("org.postgresql.Driver");
            System.out.println("Driver Loaded Successfully!");

            Connection con = DriverManager.getConnection(url, username, password);
            System.out.println("Connection Established Successfully!");

            Statement st = con.createStatement();
            String query = "SELECT * FROM student_details";
            ResultSet rs = st.executeQuery(query);

            System.out.println("\nStudent Details:\n");
            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                int age = rs.getInt("age");
                String email = rs.getString("email");
                int marks = rs.getInt("marks");
                java.sql.Date dob = rs.getDate("dob");
                java.sql.Date joinDate = rs.getDate("join_date");

                System.out.println(id + ":" + name + ":" + age + ":" + email + ":" + marks + ":" + dob + ":" + joinDate);
            }

            rs.close();
            st.close();
            con.close();
            System.out.println("\nConnection Closed Successfully!");

        } catch (ClassNotFoundException e) {
            System.out.println("PostgreSQL JDBC Driver not found!");
            e.printStackTrace();
        } catch (SQLException e) {
            System.out.println("Database connection failed!");
            e.printStackTrace();
        }
    }
}
