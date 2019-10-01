
public class C3_5 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		LambdaInterface1 li1 = (String s1, String s2, String s3) -> {System.out.println(s1 + s2 + s3);};
		li1.method("hello", "java", "world");

	}

}
