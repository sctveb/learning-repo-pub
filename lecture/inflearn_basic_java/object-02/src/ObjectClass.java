
public class ObjectClass {
	public int x;
	public int y;
	
	public ObjectClass(String s, int[] iArr) {
		System.out.println("ObjectClass");
		System.out.println(s);
		System.out.println(iArr);
	}
	public ObjectClass(int x, int y) {
		this.x = x;
		this.y = y;
	}
	public void getInfo() {
		System.out.println(x);
		System.out.println(y);
	}
}
