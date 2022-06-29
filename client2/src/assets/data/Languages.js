const lang = [
    {
        ext:"py",
        name:"python",
        BoilerPlate:`import time
time.sleep(5)
print("Hello World!")`
    },
    {
        ext:"cpp",
        name:"cpp",
        //TODO add support for bits/stdc++.h header file
        BoilerPlate:`#include<iostream>
using namespace std;

int main()
{
    return 0;
}`
    },
    {
        ext:"java",
        name:"java",
        BoilerPlate:`public class Main {
    public static void main(String args[]) {
        System.out.println("Hello World!");
    }
}`
    },
    {
        ext:"js",
        name:"javascript",
        BoilerPlate:`/* 
    Use INPUT variable to get stdin.
    Try console.log(INPUT);
*/
console.log('Hello World');`
    }
]

export default lang;