
public abstract class AbstractClassEx {
	int num;
	String str;
	public AbstractClassEx() {
		System.out.println("abstractclassex");
	}
	public AbstractClassEx(int i, String s) {
		System.out.println("abstractclassex");
		this.num = i;
		this.str = s;
	}
	
	public void fun1() {
		System.out.println("fun1");
	}
	public abstract void fun2();

}
