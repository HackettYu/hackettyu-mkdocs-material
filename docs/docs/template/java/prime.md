# prime

> 判断是否是素数

```java
public static boolean isPrime(int n) {

    if(n == 1) {
        return false;
    }

    for(int i = 2; i < n/2; i++) {

        if(n % i == 0) {
            return false;
        }
    }

    return true;
}