public class App {
    public static void main(String[] args) {
        String nonSb = "Teemo";
        nonSb += "trollley";
        nonSb += "moo";

        StringBuilder sb = new StringBuilder();
        sb.append("Teemo");
        sb.append("test");
        sb.append(" troll");

        // Resize internal char array from 64 to 128.
        sb.append("Lets get ready to ROCK AND ROLLL RAWRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");

        // Append char array
        char[] str = { 'b', 'o', 'o'};
        sb.append(str);

        // Resize from 128 to 256
        sb.append("Another super long ass string here we go !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

        System.out.println(sb);
    }
}
