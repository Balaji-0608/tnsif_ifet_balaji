//Program to define generic functional interface Palindrome

package day3.lambdaexpression;

public interface Palindrome<T> {
	boolean checkPalindrome(T data);
}
