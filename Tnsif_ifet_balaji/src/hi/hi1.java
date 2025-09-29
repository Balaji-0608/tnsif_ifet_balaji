package hi;


	
	class Person {
	    String name;

	    // Constructor
	    Person(String name) {
	        this.name = name;
	    }

	    void display() {
	        System.out.println("Name: " + name);
	    }
	}

	// Child class (Subclass) inherits from Person
	class Student extends Person {
	    int rollNo;

	    // Constructor
	    Student(String name, int rollNo) {
	        super(name);          // call Person's constructor
	        this.rollNo = rollNo;
	    }

	    void showDetails() {
	        display();  // can use parent method
	        System.out.println("Roll Number: " + rollNo);
	    }

	    public static void main(String[] args) {
	        Student s1 = new Student("Arun", 101);
	        s1.showDetails();
	    }
	}

}
