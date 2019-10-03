
public class C3_6 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String str = new String("JAVA");
		System.out.println(str);
		
		str = str + "_8";
		System.out.println(str);
		
		// StringBuffer
		StringBuffer sf = new StringBuffer("JAVA");
		System.out.println(sf);
		sf.append("World");
		System.out.println(sf);
		System.out.println(sf.length());
		
		sf.delete(4, 8);
		System.out.println(sf);

	}

}
