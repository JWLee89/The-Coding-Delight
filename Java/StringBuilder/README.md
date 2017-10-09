# String Builder Class in Java

I felt like attempting to implement a basic implementation of the String Builder class in Java. Hopefully this condensed version will help some people understand the fundamentals of how the StringBuilder class works behind the scenes.

# Documentation

## `public class StringBuilder`

No operation. Initialize the character array to default size of 16.

## `public StringBuilder(char[] str)`

 * **Parameters:** `str` — a character array

     <p>

## `public StringBuilder(String str)`

 * **Parameters:** `str` — A string containing the intitial value of character buffer;

     <p>

## `public StringBuilder append(String str)`

 * **This:** `return <code>StringBuilder</code> so that we can chain methods`
 * **Parameters:** `str` — The string to append to the string builder

## `public StringBuilder append(char[] str)`

 * **This:** `return <code>StringBuilder</code> so that we can chain methods`
 * **Parameters:** `str` — The character array to append to the string builder

## `private void resizeBuffer(String newInput)`

Resize the underlying character array if the existing char array is about to overflow.

 * **Parameters:** `newInput` — The new string appended by the consumer

     <p>

## `private void resizeBuffer(char[] newInput)`

Resize the underlying character array if the existing char array is about to overflow.

 * **Parameters:** `newInput` — The new character array appended by the consumer

     <p>

## `private boolean resizeRequired(String newInput)`

 * **Parameters:** `newInput` — The new string appended by the consumer
 * **Returns:** <code>true</code> if underlying char array needs to be resized

     <p>

## `private boolean resizeRequired(char[] newInput)`

 * **Parameters:** `newInput` — The new character array appended by the consumer
 * **Returns:** <code>true</code> if underlying char array needs to be resized

     <p>
