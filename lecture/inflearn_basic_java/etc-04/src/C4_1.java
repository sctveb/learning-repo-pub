
public class C4_1 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int i = 10;
		int j = 0;
		int r = 0;
		
		System.out.println("exception before");
		try {
			r = i / j;
		} catch (Exception e) {
			e.printStackTrace();
			String msg = e.getMessage();
			System.out.println(msg);
		}
		System.out.println("exception after");

	}

}
