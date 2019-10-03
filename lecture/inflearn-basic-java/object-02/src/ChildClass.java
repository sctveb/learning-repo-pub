
public class ChildClass {
	public String name;
	public String gender;
	public int age;
	
	public ChildClass() {
		System.out.println("--ChildClass constructor--");
	}
	
	public void setInfo(String n, String g, int a) {
		name=n;
		gender=g;
		age=a;
	}
	public void getInfo() {
		System.out.println("--getInfo start--");		
		System.out.println(name);
		System.out.println(gender);
		System.out.println(age);
	}
	
	private void mySecret() {
		System.out.println("my secret");
	}

}
