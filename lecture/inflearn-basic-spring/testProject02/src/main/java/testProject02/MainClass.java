package testProject02;

import org.springframework.context.support.GenericXmlApplicationContext;

public class MainClass {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
GenericXmlApplicationContext ctx = new GenericXmlApplicationContext("classpath:applicationContext.xml");
		
		TranspotationWalk transpotationWalk = ctx.getBean("tWalk", TranspotationWalk.class);
		transpotationWalk.move();
		
		ctx.close();

	}

}
