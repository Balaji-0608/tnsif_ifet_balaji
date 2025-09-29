public class Person {
	    String name;
	    Person(String name) {
	        this.name = name;
	    }

	    void display() {
	        System.out.println("Name: " + name);
	    }
	}

	
	class student extends Person {
	    int rollNo;

	    student(String name, int rollNo) {
	        super(name);          
	        this.rollNo = rollNo;
	    }

	    void showDetails() {
	        display();  
	        System.out.println("Roll Number: " + rollNo);
	    }

	    public static void main(String[] args) {
	        student s1 = new student("Arun", 101);
	        s1.showDetails();
	    }
	}


