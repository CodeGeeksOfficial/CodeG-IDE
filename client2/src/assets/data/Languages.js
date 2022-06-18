const lang = {

    cpp:{
        name:"cpp",
        //TODO add support for bits/stdc++.h header file
        BoilerPlate:`#include<bits/stdc++.h>
using namespace std;

int main()
{
    return 0;
}`
    },

    java:{
        name:"java",
        BoilerPlate:`public class Main {
    public static void main(String args[]) {
        System.out.println("Hello World!");
    }
}`
    },

    python:{
        name:"python",
        BoilerPlate:`print("Hello World!")`
    },

    javascript:{
        name:"javascript",
        BoilerPlate:`/* 
    Use INPUT variable to get stdin.
    Try console.log(INPUT);
*/
console.log('Hello World');`
    }
    
}

export default lang;