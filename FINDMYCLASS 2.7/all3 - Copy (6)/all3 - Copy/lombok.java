import lombok.Getter;
import lombok.Setter;

public class TestLombok {
    @Getter @Setter
    private String name;
}
// Lombok will generate the getter and setter methods for the 'name' field
// You can use the generated methods like this: 