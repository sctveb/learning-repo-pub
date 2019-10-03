
public class ToyAirplane implements Toy {
	@Override
	public void walk() {
		System.out.println("airplanewalk");
	}
	@Override
	public void run() {
		System.out.println("airplanerun");
	}
	@Override
	public void alarm() {
		System.out.println("airplanealarm");
	}
	@Override
	public void light() {
		System.out.println("airplanelight");
	}
}
