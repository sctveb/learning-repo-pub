
public class ToyRobot implements Toy {
	@Override
	public void walk() {
		System.out.println("Robowalk");
	}
	@Override
	public void run() {
		System.out.println("Robotrun");
	}
	@Override
	public void alarm() {
		System.out.println("Robotalarm");
	}
	@Override
	public void light() {
		System.out.println("Robotlight");
	}
}