
public class Bicycle {
	public String color;
    public int price;
    // ������
    public Bicycle() {
        System.out.println("Bicycle constructor");
    }
    
    public Bicycle(String c, int p) {
        System.out.println("Bicycle constructor2");
        this.color = c;
        this.price = p;
    }
    // �޼���
    public void info() {
    	System.out.println("--info--");
        System.out.println(color);
        System.out.println(price);
    }

}
