package mongodbexample.model;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="m_country")
public class Country {
	private String country;
	private List<State> states;
	
	public String getCountry() {
		return country;
	}
	
	public void setCountry(String country) {
		this.country=country;
	}
	
	public List<State> getStates(){
		return states;
	}
	
	public void setState(List<State> states) {
		this.states=states;
	}
	
	public static class State{
		private String state;
		private List<String> districts;
		
		public String getState() {
			return state;
		}
		
		public void setState(String state) {
			this.state=state;
		}
		
		public List<String> getDistricts(){
			return districts;
		}
		
		public void setDistrict(List<String> districts) {
			this.districts=districts;
		}
		
	}
}
