import java.net.ServerSocket;
import java.net.Socket;

public class C4_2 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		ServerSocket serverSocket = null;
		Socket socket = null;
		
		try {
			serverSocket = new ServerSocket(9000);
			System.out.println("�غ�Ϸ�");
			
			socket = serverSocket.accept();
			System.out.println("����");
			System.out.println(socket);
		} catch (Exception e) {
			e.printStackTrace();			
		} finally {
			try {
				if (socket != null) socket.close();
				if (serverSocket != null) serverSocket.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
			
		}

	}

}
