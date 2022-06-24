const lang = [
    {
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
        name:"java",
        BoilerPlate:`public class Main {
    public static void main(String args[]) {
        System.out.println("Hello World!");
    }
}`
    },
    {
        name:"python",
        BoilerPlate:`print("Hello World!")`
    },
    {
        name:"javascript",
        BoilerPlate:`/* 
    Use INPUT variable to get stdin.
    Try console.log(INPUT);
*/
console.log('Hello World');`
    }
]

export default lang;