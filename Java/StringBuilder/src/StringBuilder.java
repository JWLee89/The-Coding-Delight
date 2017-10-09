package blogpost.strings;
/**
 * @Author Jay Lee
 * My Personal Implementation of the string builder class in Java.
 * Did it mainly for fun. Will also be writing a blog post in the near future.
 * Hopefully this helps people understand how the String Builder works behind the scenes.
 * */
public class StringBuilder {

    private static final int BUFFER_MULTIPLIER = 2;
    private static final int DEFAULT_BUFFER_SIZE = 16;

    private char[] str;
    private int size;
    // Number of characters in the string so far
    private int charCount;

    public StringBuilder() {
        this.size = DEFAULT_BUFFER_SIZE; // Default size
        this.str = new char[DEFAULT_BUFFER_SIZE];
    }

    /**
     * @param str a character array
     * */
    public StringBuilder(char[] str) {
        this.str = str;
    }

    /**
     * @param str A string containing the intitial value of character buffer;
     * */
    public StringBuilder(String str) {
        this.str = str.toCharArray();
    }

    /**
     * @param str The string to append to the string builder
     * @return <code>this</code>. In other words, the<code>StringBuilder</code> so that we can chain methods
     */
    public StringBuilder append(String str) {
        while (resizeRequired(str)) {
            resizeBuffer(str);
        }
        addString(str);
        updateCharCount(str.length());
        return this;
    }

    /**
     * @param str The character array to append to the string builder
     * @return <code>this</code>. In other words, the<code>StringBuilder</code> so that we can chain methods
     */
    public StringBuilder append(char[] str) {
        while (resizeRequired(str)) {
            resizeBuffer(str);
        }
        addString(str);
        updateCharCount(str.length);
        return this;
    }

    @Override
    public String toString() {
        return String.valueOf(this.str);
    }

    /**
     * Private methods
     * =================
     * */

    /**
     * Resize the underlying character array if the existing char
     * array is about to overflow.
     * @param newInput The new string appended by the consumer
     * */
    private void resizeBuffer(String newInput) {
        int oldSize = this.size;
        this.size *= BUFFER_MULTIPLIER; // Update buffer size
        char[] newStr = new char[this.size];
        System.out.printf("Resizing array: Increasing size from %d to %d\n", oldSize, this.size);
        // Copy to new array
        System.arraycopy(this.str, 0, newStr, 0, oldSize);
        // Set new array
        this.str = newStr;
    }

    /**
     * Resize the underlying character array if the existing char
     * array is about to overflow.
     * @param newInput The new character array appended by the consumer
     * */
    private void resizeBuffer(char[] newInput) {
        int oldSize = this.size;
        this.size *= BUFFER_MULTIPLIER; // Update buffer size
        char[] newStr = new char[this.size];
        System.out.printf("Resizing array: Increasing size from %d to %d\n", oldSize, this.size);
        // Copy to new array
        System.arraycopy(this.str, 0, newInput, 0, oldSize);
        // Set new array
        this.str = newStr;
    }

    /**
     * @param newInput The new string appended by the consumer
     * @return <code>true</code> if underlying char array needs to be resized
     * */
    private boolean resizeRequired(String newInput) {
        return this.charCount + newInput.length() > this.size;
    }

    /**
     * @param newInput The new character array appended by the consumer
     * @return <code>true</code> if underlying char array needs to be resized
     * */
    private boolean resizeRequired(char[] newInput) {
        return this.charCount + newInput.length > this.size;
    }

    private void addString(String str) {
        // Copy elements from string to append into the underlying char array.
        System.arraycopy(str.toCharArray(), 0,
                this.str,  this.charCount , str.length());
    }

    private void addString(char[] str) {
        // Copy elements from string to append into the underlying char array.
        System.arraycopy(str, 0,
                this.str,  this.charCount , str.length);
    }

    private void updateCharCount(int charCount) {
        this.charCount += charCount;
    }
}
