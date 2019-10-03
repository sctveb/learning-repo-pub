
public class ClassEx extends AbstractClassEx {
	public ClassEx() {
		System.out.println("ClassEx");
	}
	public ClassEx(int i, String s) {
		super(i, s);
	}
	@Override
	public void fun2() {
		System.out.println("fun2");
	}

}
